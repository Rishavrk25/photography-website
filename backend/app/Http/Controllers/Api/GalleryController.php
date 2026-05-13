<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Gallery::orderBy('sort_order')->orderByDesc('created_at');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        return response()->json($query->paginate($request->get('per_page', 20)));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'image' => 'required|image|max:10240',
            'description' => 'nullable|string',
        ]);

        $result = Cloudinary::upload($request->file('image')->getRealPath(), [
            'folder' => 'shubham-photography/gallery',
            'transformation' => [
                'quality' => 'auto',
                'fetch_format' => 'auto',
            ],
        ]);

        $gallery = Gallery::create([
            'title' => $request->title,
            'category' => $request->category,
            'image_url' => $result->getSecurePath(),
            'description' => $request->description,
            'sort_order' => $request->get('sort_order', 0),
        ]);

        return response()->json($gallery, 201);
    }

    public function show(Gallery $gallery)
    {
        return response()->json($gallery);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
            'description' => 'nullable|string',
        ]);

        $gallery->update($request->only(['title', 'category', 'description', 'sort_order']));

        return response()->json($gallery);
    }

    public function destroy(Gallery $gallery)
    {
        $gallery->delete();
        return response()->json(['message' => 'Gallery item deleted']);
    }
}
