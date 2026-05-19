<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'user_id',
        'client_email',
        'name',
        'images',
        'zip_path',
    ];

    protected $casts = [
        'images' => 'array',
    ];
}
