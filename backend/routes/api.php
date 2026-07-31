<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\JobApplicationController;
use Illuminate\Support\Facades\Route;

// Public Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated API routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Resumes endpoints
    Route::apiResource('resumes', ResumeController::class);
    Route::post('resumes/{resume}/optimize', [ResumeController::class, 'optimize']);
    Route::post('resumes/{resume}/analyze', [ResumeController::class, 'analyze']);

    // Job Applications endpoints
    Route::apiResource('job-applications', JobApplicationController::class);
    Route::post('job-applications/import', [JobApplicationController::class, 'importUrl']);
});
