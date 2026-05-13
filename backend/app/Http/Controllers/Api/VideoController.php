<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        $query = Video::orderByDesc('created_at');
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        return response()->json($query->paginate($request->get('per_page', 12)));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'required|string',
            'category' => 'sometimes|string|max:100',
            'thumbnail' => 'nullable|image|max:5120',
        ]);

        $thumbnailUrl = null;
        if ($request->hasFile('thumbnail')) {
            $result = Cloudinary::upload($request->file('thumbnail')->getRealPath(), [
                'folder' => 'shubham-photography/thumbnails',
            ]);
            $thumbnailUrl = $result->getSecurePath();
        }

        $video = Video::create([
            'title' => $request->title,
            'video_url' => $request->video_url,
            'category' => $request->get('category', 'wedding'),
            'thumbnail' => $thumbnailUrl,
        ]);

        return response()->json($video, 201);
    }

    public function update(Request $request, Video $video)
    {
        $video->update($request->only(['title', 'video_url', 'category']));
        return response()->json($video);
    }

    public function destroy(Video $video)
    {
        $video->delete();
        return response()->json(['message' => 'Video deleted']);
    }
}
