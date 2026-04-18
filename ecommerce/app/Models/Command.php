<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'model',
        'model_id',
        'payload',
        'status',
    ];

    protected $casts = [
        'payload' => 'array',
    ];

    // 👤 user who created command
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}