<?php

namespace App\Http\Controllers;

use App\Models\CareerConversation;
use App\Services\GeminiAiService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CareerAdvisorController extends Controller
{
    protected GeminiAiService $aiService;

    public function __construct(GeminiAiService $aiService)
    {
        $this->aiService = $aiService;
    }

    /**
     * Send prompt to AI Career Advisor and return response.
     */
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'session_id' => 'required|string',
            'message' => 'required|string',
        ]);

        $sessionId = $request->input('session_id');
        $userMessage = $request->input('message');
        $userId = auth()->id();

        $responseMessage = $this->aiService->generateAdvisorResponse($sessionId, $userMessage, $userId);

        return response()->json([
            'success' => true,
            'data' => [
                'session_id' => $sessionId,
                'role' => 'assistant',
                'message' => $responseMessage,
                'timestamp' => now()->toIso8601String(),
            ],
        ]);
    }

    /**
     * Get chat conversation history for a given session.
     */
    public function history(Request $request, string $sessionId): JsonResponse
    {
        $messages = CareerConversation::where('session_id', $sessionId)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $messages,
        ]);
    }

    /**
     * Generate dynamic mock interview question & evaluation.
     */
    public function mockInterview(Request $request): JsonResponse
    {
        $role = $request->input('role', 'Senior Engineer');
        $questionType = $request->input('type', 'behavioral');

        $questions = [
            'behavioral' => "Tell me about a time when you had to make an urgent architectural trade-off under tight deadlines. What was the impact?",
            'technical' => "How would you design a distributed rate limiter that handles 10M API requests per minute across global edge nodes?",
            'system_design' => "Walk me through how you would architect a real-time collaborative document editor like Notion or Figma.",
        ];

        $questionText = $questions[$questionType] ?? $questions['behavioral'];

        return response()->json([
            'success' => true,
            'data' => [
                'role' => $role,
                'question_type' => $questionType,
                'question' => $questionText,
                'star_framework' => [
                    'Situation' => 'Briefly state problem scale.',
                    'Task' => 'Your explicit responsibility.',
                    'Action' => 'Engineering execution steps.',
                    'Result' => 'Quantified metric improvement.',
                ]
            ]
        ]);
    }
}
