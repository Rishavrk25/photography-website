<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'names',
        'email',
        'phone',
        'event_date',
        'event_type',
        'services',
        'details',
        'status',
    ];

    protected $casts = [
        'services' => 'array',
        'event_date' => 'date',
    ];
}
