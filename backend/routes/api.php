<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Middleware\AdminMiddleware;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/

Route::get('/galleries', [GalleryController::class, 'index']);
Route::get('/videos', [VideoController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/packages', [PackageController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/contacts', [ContactController::class, 'store']);

// Auth
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Admin API Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Dashboard
    Route::get('/admin/dashboard', [DashboardController::class, 'index']);

    // Galleries CRUD
    Route::get('/admin/galleries', [GalleryController::class, 'index']);
    Route::post('/admin/galleries', [GalleryController::class, 'store']);
    Route::get('/admin/galleries/{gallery}', [GalleryController::class, 'show']);
    Route::put('/admin/galleries/{gallery}', [GalleryController::class, 'update']);
    Route::delete('/admin/galleries/{gallery}', [GalleryController::class, 'destroy']);

    // Videos CRUD
    Route::get('/admin/videos', [VideoController::class, 'index']);
    Route::post('/admin/videos', [VideoController::class, 'store']);
    Route::put('/admin/videos/{video}', [VideoController::class, 'update']);
    Route::delete('/admin/videos/{video}', [VideoController::class, 'destroy']);

    // Bookings
    Route::get('/admin/bookings', [BookingController::class, 'index']);
    Route::put('/admin/bookings/{booking}', [BookingController::class, 'update']);
    Route::delete('/admin/bookings/{booking}', [BookingController::class, 'destroy']);

    // Testimonials CRUD
    Route::get('/admin/testimonials', [TestimonialController::class, 'index']);
    Route::post('/admin/testimonials', [TestimonialController::class, 'store']);
    Route::put('/admin/testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::delete('/admin/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);

    // Packages CRUD
    Route::get('/admin/packages', [PackageController::class, 'index']);
    Route::post('/admin/packages', [PackageController::class, 'store']);
    Route::put('/admin/packages/{package}', [PackageController::class, 'update']);
    Route::delete('/admin/packages/{package}', [PackageController::class, 'destroy']);

    // Contacts
    Route::get('/admin/contacts', [ContactController::class, 'index']);
    Route::delete('/admin/contacts/{contact}', [ContactController::class, 'destroy']);
});
