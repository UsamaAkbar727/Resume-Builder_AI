<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ResumeController extends Controller
{
    /**
     * Display a listing of user's resumes.
     */
    public function index(Request $request)
    {
        $resumes = $request->user()->resumes()->orderBy('updated_at', 'desc')->get();
        return response()->json($resumes);
    }

    /**
     * Store a newly created resume in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'skills' => 'nullable|string',
            'experience' => 'nullable|array',
            'projects' => 'nullable|array',
            'template' => 'nullable|string',
            'primary_color' => 'nullable|string',
            'font' => 'nullable|string',
        ]);

        $resume = $request->user()->resumes()->create($request->all());

        return response()->json($resume, 201);
    }

    /**
     * Display the specified resume.
     */
    public function show(Request $request, Resume $resume)
    {
        if ($resume->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }
        return response()->json($resume);
    }

    /**
     * Update the specified resume in storage.
     */
    public function update(Request $request, Resume $resume)
    {
        if ($resume->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'title' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'skills' => 'nullable|string',
            'experience' => 'nullable|array',
            'projects' => 'nullable|array',
            'template' => 'nullable|string',
            'primary_color' => 'nullable|string',
            'font' => 'nullable|string',
            'ats_score' => 'nullable|integer',
        ]);

        $resume->update($request->all());

        return response()->json($resume);
    }

    /**
     * Remove the specified resume from storage.
     */
    public function destroy(Request $request, Resume $resume)
    {
        if ($resume->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        $resume->delete();

        return response()->json(['message' => 'Resume deleted successfully']);
    }

    /**
     * Optimize resume bullets using simulated Gemini AI.
     */
    public function optimize(Request $request, Resume $resume)
    {
        if ($resume->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'bullet' => 'required|string',
            'tone' => 'required|string|in:Professional,Executive,Technical,Entry',
        ]);

        $bullet = $request->bullet;
        $tone = $request->tone;

        // Realistic delay simulation & output generation
        $optimized = "";
        $verbs = [];
        $metrics = [];

        if ($tone === "Executive") {
            $optimized = "Spearheaded checkout pipeline re-architectures, increasing transaction capacity by 45% ($90M ARR impact) while leading the orchestration of core services to AWS EKS.";
            $verbs = ["Spearheaded", "Led", "Orchestrated"];
            $metrics = ["Increase processing capacity by 45%", "$90M ARR impact handled"];
        } elseif ($tone === "Technical") {
            $optimized = "Optimized React transaction paths and refactored Node microservices to AWS EKS container nodes, reducing processing latencies by 40%.";
            $verbs = ["Optimized", "Refactored", "Migrated"];
            $metrics = ["Reduce latency by 40%", "Migrate 15 microservices"];
        } else {
            $optimized = "Architected and scaled global checkout systems, reducing API response times by 30% and leading container migrations to Kubernetes.";
            $verbs = ["Architected", "Scaled", "Migrated"];
            $metrics = ["Reduce response times by 30%", "Migrated stripe checkout layers"];
        }

        return response()->json([
            'original_bullet' => $bullet,
            'tone' => $tone,
            'optimized_bullet' => $optimized,
            'action_verbs' => $verbs,
            'suggested_metrics' => $metrics
        ]);
    }

    /**
     * Analyze resume ATS compliance.
     */
    public function analyze(Request $request, Resume $resume)
    {
        if ($resume->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        // Simulating parser checks
        return response()->json([
            'score' => 85,
            'readability' => [
                'reading_ease' => '68.2 (Standard)',
                'avg_sentence_length' => '14.5 words',
                'word_count' => 412
            ],
            'gaps' => [
                'missing_keywords' => ['Kubernetes', 'GraphQL', 'Playwright'],
                'present_keywords' => ['React', 'TypeScript', 'Tailwind CSS', 'Node.js']
            ],
            'improvements' => [
                [
                    'category' => 'Keywords',
                    'issue' => "Missing core skill match: 'Kubernetes'",
                    'severity' => 'High',
                    'fix' => 'Add Kubernetes under Skills and mention container cluster deployments.'
                ],
                [
                    'category' => 'Action Verbs',
                    'issue' => "Passive phrasing: 'Was responsible for scaling checkout'",
                    'severity' => 'Medium',
                    'fix' => 'Change to: Architected checkout pipeline migrations.'
                ]
              ]
        ]);
    }
}
