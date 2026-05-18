<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\BookingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public inquiry endpoint
Route::post('/inquiries', [InquiryController::class, 'store']);

// Public booking endpoint
// (Moved inside auth middleware)

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Protected booking endpoint
    Route::post('/bookings', [BookingController::class, 'store']);

    // Admin inquiry endpoints
    Route::get('/inquiries', [InquiryController::class, 'index']);
    Route::get('/inquiries/{id}', [InquiryController::class, 'show']);
    Route::patch('/inquiries/{id}/status', [InquiryController::class, 'updateStatus']);
    Route::delete('/inquiries/{id}', [InquiryController::class, 'destroy']);

    // Admin booking endpoints
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::patch('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
});
