<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Contact;
use App\Models\Gallery;
use App\Models\Testimonial;
use App\Models\Video;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'stats' => [
                'total_galleries' => Gallery::count(),
                'total_videos' => Video::count(),
                'total_bookings' => Booking::count(),
                'pending_bookings' => Booking::where('status', 'pending')->count(),
                'total_testimonials' => Testimonial::count(),
                'total_inquiries' => Contact::count(),
            ],
            'recent_bookings' => Booking::orderByDesc('created_at')->take(5)->get(),
            'recent_inquiries' => Contact::orderByDesc('created_at')->take(5)->get(),
        ]);
    }
}
