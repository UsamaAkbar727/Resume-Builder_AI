<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportedJob extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'source',
        'company_name',
        'company_logo',
        'title',
        'location',
        'salary_min',
        'salary_max',
        'employment_type',
        'is_remote',
        'skills_json',
        'experience_level',
        'application_url',
        'description',
        'dedup_hash',
        'posted_at',
        'expires_at',
    ];

    protected $casts = [
        'skills_json' => 'array',
        'is_remote' => 'boolean',
        'posted_at' => 'datetime',
        'expires_at' => 'datetime',
    ];
}
