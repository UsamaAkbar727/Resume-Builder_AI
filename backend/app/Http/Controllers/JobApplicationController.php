<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
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

        $url = $request->url;

        // Mock scraping and extraction latency
        return response()->json([
            'url' => $url,
            'company' => 'Stripe',
            'role' => 'Senior Frontend Engineer',
            'salary' => '$195,000',
            'location' => 'San Francisco, CA (Hybrid)',
            'skills' => ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Playwright'],
            'requirements' => '5+ years of experience, expertise in client performance, responsive UI structures.',
            'benefits' => 'Medical insurance, stock options, remote workspace setup budget, unlimited PTO.',
            'deadline' => '2026-08-30'
        ]);
    }
}
