<?php

namespace App\Http\Controllers;

use App\Models\ImportedJob;
use App\Services\JobAggregatorService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobAggregatorController extends Controller
{
    protected JobAggregatorService $aggregatorService;

    public function __construct(JobAggregatorService $aggregatorService)
    {
        $this->aggregatorService = $aggregatorService;
    }

    /**
     * Get paginated & searchable live job listings.
     */
    public function feed(Request $request): JsonResponse
    {
        // Auto-seed if database is empty
        if (ImportedJob::count() === 0) {
            $this->aggregatorService->syncLiveJobs();
        }

        $query = ImportedJob::query();

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('remote') && $request->remote === 'true') {
            $query->where('is_remote', true);
        }

        $jobs = $query->orderBy('created_at', 'desc')->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $jobs->items(),
            'total' => $jobs->total(),
            'current_page' => $jobs->currentPage(),
            'last_page' => $jobs->lastPage(),
        ]);
    }

    /**
     * Synchronize live jobs from external APIs manually.
     */
    public function sync(): JsonResponse
    {
        $count = $this->aggregatorService->syncLiveJobs();

        return response()->json([
            'success' => true,
            'message' => "Successfully synchronized {$count} live jobs.",
            'imported_count' => $count,
        ]);
    }

    /**
     * Import a single job posting by URL.
     */
    public function importUrl(Request $request): JsonResponse
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $importedJob = $this->aggregatorService->importFromUrl($request->url);

        return response()->json([
            'success' => true,
            'message' => 'Job imported successfully!',
            'data' => $importedJob,
        ]);
    }
}
