<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobAggregatorController;
use App\Http\Controllers\AiMatchingController;
use App\Http\Controllers\CareerAdvisorController;
use Illuminate\Support\Facades\Route;

// Public Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/resend-verification', [AuthController::class, 'resendVerification']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-2fa', [AuthController::class, 'verify2fa']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Public / Hybrid Job Feed & Matching API Endpoints
Route::get('/jobs/feed', [JobAggregatorController::class, 'feed']);
Route::post('/jobs/sync', [JobAggregatorController::class, 'sync']);
Route::post('/jobs/import-url', [JobAggregatorController::class, 'importUrl']);
Route::post('/matching/analyze', [AiMatchingController::class, 'analyze']);
Route::post('/advisor/chat', [CareerAdvisorController::class, 'chat']);
Route::get('/advisor/history/{sessionId}', [CareerAdvisorController::class, 'history']);
Route::get('/advisor/mock-interview', [CareerAdvisorController::class, 'mockInterview']);

// Authenticated API routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Authenticated 2FA management endpoints
    Route::post('/2fa/setup', [AuthController::class, 'setup2fa']);
    Route::post('/2fa/enable', [AuthController::class, 'enable2fa']);
    Route::post('/2fa/disable', [AuthController::class, 'disable2fa']);

    // Resumes endpoints
    Route::apiResource('resumes', ResumeController::class);
    Route::post('resumes/{resume}/optimize', [ResumeController::class, 'optimize']);
    Route::post('resumes/{resume}/analyze', [ResumeController::class, 'analyze']);

    // Job Applications endpoints
    Route::apiResource('job-applications', JobApplicationController::class);
    Route::post('job-applications/import', [JobApplicationController::class, 'importUrl']);
});
