<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    protected \App\Services\JobAggregatorService $aggregatorService;

    public function __construct(\App\Services\JobAggregatorService $aggregatorService)
    {
        $this->aggregatorService = $aggregatorService;
    }
    /**
     * Display a listing of user's job applications.
     */
    public function index(Request $request)
    {
        $applications = $request->user()->jobApplications()->orderBy('updated_at', 'desc')->get();
        return response()->json($applications);
    }

    /**
     * Store a newly created job application in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'status' => 'required|string|in:Wishlist,Applied,Interview,Offer,Rejected',
            'salary' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'priority' => 'nullable|string|in:High,Medium,Low',
            'notes' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        $application = $request->user()->jobApplications()->create($request->all());

        return response()->json($application, 201);
    }

    /**
     * Display the specified job application.
     */
    public function show(Request $request, JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }
        return response()->json($jobApplication);
    }

    /**
     * Update the specified job application in storage.
     */
    public function update(Request $request, JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'company' => 'sometimes|required|string|max:255',
            'role' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|string|in:Wishlist,Applied,Interview,Offer,Rejected',
            'salary' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'priority' => 'nullable|string|in:High,Medium,Low',
            'notes' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        $jobApplication->update($request->all());

        return response()->json($jobApplication);
    }

    /**
     * Remove the specified job application from storage.
     */
    public function destroy(Request $request, JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        $jobApplication->delete();

        return response()->json(['message' => 'Job application deleted successfully']);
    }

    /**
     * Import and parse a job description from a URL.
     */
    public function importUrl(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $job = $this->aggregatorService->importFromUrl($request->url);

        return response()->json([
            'url' => $request->url,
            'company' => $job['company_name'] ?? 'Tech Enterprise',
            'role' => $job['title'] ?? 'Software Engineer',
            'salary' => $job['salary_max'] ?? '$150,000',
            'location' => $job['location'] ?? 'Remote',
            'skills' => $job['skills_json'] ?? ['Engineering'],
            'requirements' => 'Skills required: ' . implode(', ', $job['skills_json'] ?? []),
            'benefits' => 'Competitive salary and standard workspace options.',
            'deadline' => now()->addDays(30)->format('Y-m-d')
        ]);
    }
}
