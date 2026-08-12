<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VerificationCode extends Model
{
    protected $fillable = [
        'email',
        'code',
        'type',
        'attempts',
        'expires_at',
        'used_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
    ];

    /**
     * Scope to only include active/valid codes.
     */
    public function scopeActive($query)
    {
        return $query->whereNull('used_at')
            ->where('expires_at', '>', now())
            ->where('attempts', '<', 3);
    }
}
