<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use ZipArchive;
use App\Models\Package;

class PackageController extends Controller
{
    // Admin sends a package: provide name, client_email (or user_id), and images (array of storage paths)
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'client_email' => 'nullable|email',
            'user_id' => 'nullable|integer',
            'booking_id' => 'nullable|integer',
            'images' => 'required|array|min:1',
            'images.*' => 'string',
        ]);

        $package = Package::create([
            'booking_id' => $validated['booking_id'] ?? null,
            'user_id' => $validated['user_id'] ?? null,
            'client_email' => $validated['client_email'] ?? null,
            'name' => $validated['name'],
            'images' => $validated['images'],
        ]);

        // Generate ZIP
        $zipName = 'packages/' . now()->format('Ymd_His') . '_' . $package->id . '.zip';
        $zipFullPath = storage_path('app/public/' . $zipName);

        // Ensure directory exists
        $dir = dirname($zipFullPath);
        if (!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }

        $zip = new ZipArchive();
        if ($zip->open($zipFullPath, ZipArchive::CREATE) === true) {
            foreach ($validated['images'] as $img) {
                $relative = ltrim($img, '/');
                $sourcePath = storage_path('app/public/' . $relative);

                // If a directory is provided, add all files inside
                if (is_dir($sourcePath)) {
                    $files = scandir($sourcePath);
                    foreach ($files as $f) {
                        if (in_array($f, ['.', '..']))
                            continue;
                        $fileFull = $sourcePath . DIRECTORY_SEPARATOR . $f;
                        if (is_file($fileFull)) {
                            $zip->addFile($fileFull, $f);
                        }
                    }
                } else {
                    if (file_exists($sourcePath)) {
                        $zip->addFile($sourcePath, basename($sourcePath));
                    }
                }
            }
            $zip->close();
            // Save zip path
            $package->zip_path = $zipName;
            $package->save();
        } else {
            return response()->json(['message' => 'Failed to create ZIP'], 500);
        }

        return response()->json(['message' => 'Package sent', 'package' => $package]);
    }

    // Client lists their packages
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Package::query();
        if ($user) {
            $query->where(function ($q) use ($user) {
                $q->where('user_id', $user->id)->orWhere('client_email', $user->email);
            });
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $packages = $query->orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $packages]);
    }

    // Download ZIP by package id (ensure authorized user or admin)
    public function download(Request $request, $id)
    {
        $package = Package::findOrFail($id);
        $user = $request->user();

        // Allow if admin (sanctum user with is_admin?) or owner
        if ($user && ($user->id === $package->user_id || $user->email === $package->client_email)) {
            $zipPath = storage_path('app/public/' . $package->zip_path);
            if (file_exists($zipPath)) {
                return response()->download($zipPath, basename($zipPath));
            }
            return response()->json(['message' => 'ZIP not found'], 404);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // List files for a gallery by id (reads storage/app/public/galleries/{id})
    public function listGalleryFiles(Request $request, $id)
    {
        $dir = storage_path('app/public/galleries/' . $id);
        if (!is_dir($dir)) {
            return response()->json(['data' => []]);
        }

        $files = [];
        $entries = scandir($dir);
        foreach ($entries as $e) {
            if (in_array($e, ['.', '..']))
                continue;
            $full = $dir . DIRECTORY_SEPARATOR . $e;
            if (is_file($full)) {
                $files[] = [
                    'name' => $e,
                    'path' => 'galleries/' . $id . '/' . $e,
                    'size' => filesize($full),
                ];
            }
        }

        return response()->json(['data' => $files]);
    }

    // Admin uploads a ZIP file to extract to gallery
    public function uploadGalleryZip(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|integer',
            'file'       => 'required|file',
        ]);

        $bookingId   = $request->input('booking_id');
        $file        = $request->file('file');
        $zipRealPath = $file->getRealPath();

        $extractPath = storage_path('app/public/galleries/' . $bookingId);
        if (!file_exists($extractPath)) {
            mkdir($extractPath, 0755, true);
        }

        $extracted = false;

        // Attempt 1: ZipArchive (PHP ext-zip)
        if (class_exists('ZipArchive')) {
            $zip = new \ZipArchive();
            $opened = $zip->open($zipRealPath);
            if ($opened === true) {
                $zip->extractTo($extractPath);
                $zip->close();
                $extracted = true;
            }
        }

        // Attempt 2: PowerShell Expand-Archive (Windows fallback)
        if (!$extracted) {
            $zipWin     = str_replace('/', '\\', $zipRealPath);
            $destWin    = str_replace('/', '\\', $extractPath);
            $cmd        = "powershell -Command \"Expand-Archive -LiteralPath '$zipWin' -DestinationPath '$destWin' -Force\" 2>&1";
            shell_exec($cmd);

            // Check if files were actually extracted
            $files = glob($extractPath . '/*');
            if ($files && count($files) > 0) {
                $extracted = true;
            }
        }

        if (!$extracted) {
            return response()->json(['message' => 'Failed to extract ZIP file. Please ensure it is a valid ZIP.'], 500);
        }

        // Update booking status
        $booking = \App\Models\Booking::find($bookingId);
        if ($booking) {
            $booking->status = 'Delivered';
            $booking->save();
        }

        return response()->json(['message' => 'Gallery ZIP uploaded and extracted successfully']);
    }

    // Delete/remove gallery files and reset status
    public function deleteGallery($id)
    {
        $dir = storage_path('app/public/galleries/' . $id);
        if (is_dir($dir)) {
            $this->deleteDirRecursive($dir);
        }

        $booking = \App\Models\Booking::find($id);
        if ($booking) {
            $booking->status = 'confirmed';
            $booking->save();
        }

        return response()->json(['message' => 'Gallery removed successfully']);
    }

    private function deleteDirRecursive($dir) {
        if (!file_exists($dir)) {
            return true;
        }
        if (!is_dir($dir)) {
            return unlink($dir);
        }
        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }
            if (!$this->deleteDirRecursive($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }
        }
        return rmdir($dir);
    }
}
