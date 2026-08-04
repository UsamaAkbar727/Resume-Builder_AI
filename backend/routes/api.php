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
Route::post('/login', [AuthController::class, 'login']);

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

    // Resumes endpoints
    Route::apiResource('resumes', ResumeController::class);
    Route::post('resumes/{resume}/optimize', [ResumeController::class, 'optimize']);
    Route::post('resumes/{resume}/analyze', [ResumeController::class, 'analyze']);

    // Job Applications endpoints
    Route::apiResource('job-applications', JobApplicationController::class);
    Route::post('job-applications/import', [JobApplicationController::class, 'importUrl']);
});
