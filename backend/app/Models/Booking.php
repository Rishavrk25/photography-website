<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['client_name', 'phone', 'email', 'event_type', 'event_date', 'package', 'message', 'status'];

    protected function casts(): array
    {
        return ['event_date' => 'date'];
    }
}
