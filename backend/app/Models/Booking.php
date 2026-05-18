<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'package',
        'names',
        'email',
        'phone',
        'event_date',
        'status',
        'price',
        'notes',
    ];

    protected $casts = [
        'event_date' => 'date',
        'price' => 'decimal:2',
    ];
}
