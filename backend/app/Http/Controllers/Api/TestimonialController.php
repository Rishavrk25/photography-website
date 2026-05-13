<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::orderByDesc('created_at')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_name' => 'required|string|max:255',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|max:5120',
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $result = Cloudinary::upload($request->file('image')->getRealPath(), [
                'folder' => 'shubham-photography/testimonials',
            ]);
            $imageUrl = $result->getSecurePath();
        }

        $testimonial = Testimonial::create([
            'client_name' => $request->client_name,
            'review' => $request->review,
            'rating' => $request->rating,
            'image' => $imageUrl,
        ]);

        return response()->json($testimonial, 201);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $testimonial->update($request->only(['client_name', 'review', 'rating']));
        return response()->json($testimonial);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return response()->json(['message' => 'Testimonial deleted']);
    }
}
