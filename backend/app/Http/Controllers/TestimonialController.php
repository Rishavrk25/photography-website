<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'desc')->paginate(15);
        return response()->json([
            'message' => 'Testimonials retrieved successfully',
            'data' => $testimonials
        ]);
    }

    public function publicIndex()
    {
        $testimonials = Testimonial::where('status', 'approved')
            ->orderBy('rating', 'desc')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        return response()->json([
            'message' => 'Approved top 5 testimonials retrieved successfully',
            'data' => $testimonials
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'content' => 'required|string',
            'image' => 'nullable|string',
        ]);

        $testimonial = Testimonial::create(array_merge($validated, ['status' => 'pending']));

        return response()->json([
            'message' => 'Testimonial created successfully',
            'data' => $testimonial
        ], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Testimonial status updated successfully',
            'data' => $testimonial
        ]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return response()->json([
            'message' => 'Testimonial deleted successfully'
        ]);
    }
}
