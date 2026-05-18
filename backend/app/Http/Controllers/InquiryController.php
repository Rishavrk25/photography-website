<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inquiry;
use Illuminate\Validation\Rule;

class InquiryController extends Controller
{
    /**
     * Submit a new inquiry
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'names' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'phone' => 'nullable|string|max:20',
                'event_date' => 'required|date|after:today',
                'event_type' => 'required|in:wedding,engagement,prewedding,other',
                'services' => 'required|array|min:1',
                'services.*' => 'string|in:photography,videography,cinematic,preWedding',
                'details' => 'nullable|string|max:1000',
            ]);

            $inquiry = Inquiry::create([
                'names' => $validated['names'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'event_date' => $validated['event_date'],
                'event_type' => $validated['event_type'],
                'services' => $validated['services'],
                'details' => $validated['details'],
                'status' => 'pending',
            ]);

            return response()->json([
                'message' => 'Inquiry submitted successfully',
                'inquiry' => $inquiry,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit inquiry',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all inquiries (admin only)
     */
    public function index()
    {
        try {
            $inquiries = Inquiry::orderBy('created_at', 'desc')->paginate(15);
            
            return response()->json([
                'message' => 'Inquiries retrieved successfully',
                'data' => $inquiries,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve inquiries',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get a specific inquiry
     */
    public function show($id)
    {
        try {
            $inquiry = Inquiry::findOrFail($id);
            
            return response()->json([
                'message' => 'Inquiry retrieved successfully',
                'data' => $inquiry,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Inquiry not found',
            ], 404);
        }
    }

    /**
     * Update inquiry status
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'status' => 'required|in:pending,contacted,booked,declined',
            ]);

            $inquiry = Inquiry::findOrFail($id);
            $inquiry->update(['status' => $validated['status']]);

            return response()->json([
                'message' => 'Inquiry status updated successfully',
                'data' => $inquiry,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Inquiry not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update inquiry',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete an inquiry
     */
    public function destroy($id)
    {
        try {
            $inquiry = Inquiry::findOrFail($id);
            $inquiry->delete();

            return response()->json([
                'message' => 'Inquiry deleted successfully',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Inquiry not found',
            ], 404);
        }
    }
}
