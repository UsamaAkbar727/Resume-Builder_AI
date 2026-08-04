<?php

namespace App\Http\Controllers;

use App\Services\AiMatchingService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AiMatchingController extends Controller
{
    protected AiMatchingService $matchingService;

    public function __construct(AiMatchingService $matchingService)
    {
        $this->matchingService = $matchingService;
    }

    /**
     * Compute real-time AI Match score between candidate resume and job description.
     */
    public function analyze(Request $request): JsonResponse
    {
        $request->validate([
            'resume' => 'nullable|array',
            'job_title' => 'nullable|string',
            'job_description' => 'required|string',
        ]);

        $resumeData = $request->input('resume', [
            'title' => 'Senior Full-Stack Engineer',
            'summary' => 'Senior Software Engineer with 7+ years of experience building scalable cloud applications.',
            'skills' => 'React, TypeScript, Next.js, Node.js, PostgreSQL, System Architecture, AWS, Docker',
            'experience' => [
                [
                  'role' => 'Senior Software Engineer',
                  'company' => 'Stripe',
                  'description' => 'Architected microservices handling 15M+ daily requests.'
                ]
            ]
        ]);

        $jobTitle = $request->input('job_title', 'Staff Engineer');
        $jobDescription = $request->input('job_description');

        $analysis = $this->matchingService->analyzeMatch($resumeData, $jobTitle, $jobDescription);

        return response()->json([
            'success' => true,
            'data' => $analysis,
        ]);
    }
}
