<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::orderByDesc('created_at');
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        return response()->json($query->paginate($request->get('per_page', 15)));
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'event_type' => 'nullable|string|max:100',
            'event_date' => 'nullable|date',
            'package' => 'nullable|string|max:100',
            'message' => 'nullable|string',
        ]);

        $booking = Booking::create($request->only([
            'client_name', 'phone', 'email', 'event_type', 'event_date', 'package', 'message',
        ]));

        return response()->json(['message' => 'Booking request submitted successfully', 'booking' => $booking], 201);
    }

    public function update(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'sometimes|in:pending,confirmed,completed,cancelled',
        ]);

        $booking->update($request->only(['status']));
        return response()->json($booking);
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(['message' => 'Booking deleted']);
    }
}
