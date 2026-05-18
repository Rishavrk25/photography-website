<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    /**
     * Submit a new booking
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'package' => 'required|in:silver,gold,platinum',
                'names' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'phone' => 'nullable|string|max:20',
                'event_date' => 'nullable|date|after:today',
                'notes' => 'nullable|string|max:1000',
            ]);

            // Package pricing mapping
            $prices = [
                'silver' => 50000,
                'gold' => 85000,
                'platinum' => 150000,
            ];

            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'package' => $validated['package'],
                'names' => $validated['names'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'event_date' => $validated['event_date'],
                'price' => $prices[$validated['package']] ?? null,
                'notes' => $validated['notes'],
                'status' => 'pending',
            ]);

            return response()->json([
                'message' => 'Booking submitted successfully! We will contact you within 24 hours.',
                'booking' => $booking,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit booking',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all bookings (admin only)
     */
    public function index()
    {
        try {
            $bookings = Booking::orderBy('created_at', 'desc')->paginate(15);
            
            return response()->json([
                'message' => 'Bookings retrieved successfully',
                'data' => $bookings,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve bookings',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get a specific booking
     */
    public function show($id)
    {
        try {
            $booking = Booking::findOrFail($id);
            
            return response()->json([
                'message' => 'Booking retrieved successfully',
                'data' => $booking,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Booking not found',
            ], 404);
        }
    }

    /**
     * Update booking status
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'status' => 'required|in:pending,confirmed,cancelled',
            ]);

            $booking = Booking::findOrFail($id);
            $booking->update(['status' => $validated['status']]);

            return response()->json([
                'message' => 'Booking status updated successfully',
                'data' => $booking,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Booking not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update booking',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a booking
     */
    public function destroy($id)
    {
        try {
            $booking = Booking::findOrFail($id);
            $booking->delete();

            return response()->json([
                'message' => 'Booking deleted successfully',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Booking not found',
            ], 404);
        }
    }
}
