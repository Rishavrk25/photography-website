<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get admin dashboard statistics
     */
    public function getDashboard()
    {
        try {
            $stats = [
                'total_clients' => User::count(),
                'total_bookings' => Booking::count(),
                'pending_bookings' => Booking::where('status', 'pending')->count(),
                'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
                'total_inquiries' => Inquiry::count(),
                'pending_inquiries' => Inquiry::where('status', 'pending')->count(),
                'total_revenue' => Booking::where('status', 'confirmed')->sum('price'),
            ];

            $recent_bookings = Booking::orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(fn($booking) => [
                    'id' => $booking->id,
                    'client_name' => $booking->names,
                    'package' => $booking->package,
                    'event_date' => $booking->event_date,
                    'status' => $booking->status,
                    'price' => $booking->price,
                    'email' => $booking->email,
                    'created_at' => $booking->created_at,
                ]);

            $recent_inquiries = Inquiry::orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(fn($inquiry) => [
                    'id' => $inquiry->id,
                    'client_name' => $inquiry->names,
                    'event_type' => $inquiry->event_type,
                    'event_date' => $inquiry->event_date,
                    'status' => $inquiry->status,
                    'email' => $inquiry->email,
                    'created_at' => $inquiry->created_at,
                ]);

            return response()->json([
                'message' => 'Dashboard data retrieved successfully',
                'stats' => $stats,
                'recent_bookings' => $recent_bookings,
                'recent_inquiries' => $recent_inquiries,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve dashboard data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
