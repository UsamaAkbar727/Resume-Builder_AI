<?php

namespace App\Services;

use App\Models\CareerConversation;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiAiService
{
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY', '');
    }

    /**
     * Generate dynamic AI Career Advisor response given user prompt & session history.
     */
    public function generateAdvisorResponse(string $sessionId, string $userPrompt, ?int $userId = null): string
    {
        // Store user message
        CareerConversation::create([
            'user_id' => $userId,
            'session_id' => $sessionId,
            'role' => 'user',
            'message' => $userPrompt,
        ]);

        // Retrieve past session history for context
        $history = CareerConversation::where('session_id', $sessionId)
            ->orderBy('id', 'asc')
            ->take(10)
            ->get();

        $aiResponse = '';

        if (!empty($this->apiKey)) {
            try {
                $contents = [];
                foreach ($history as $item) {
                    $contents[] = [
                        'role' => $item->role === 'user' ? 'user' : 'model',
                        'parts' => [['text' => $item->message]]
                    ];
                }

                $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$this->apiKey}";
                $response = Http::timeout(15)->post($endpoint, [
                    'contents' => $contents,
                    'systemInstruction' => [
                        'parts' => [
                            ['text' => 'You are an executive AI Career Coach & ATS Consultant for high performers. Provide tailored, actionable career guidance, salary negotiation tactics, STAR method interview frameworks, and resume metric optimizations. Keep advice punchy, confident, and professional.']
                        ]
                    ]
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $aiResponse = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
                }
            } catch (\Exception $e) {
                Log::error('Gemini API call failed: ' . $e->getMessage());
            }
        }

        // Fallback intelligent response generator if API key is not set or network fails
        if (empty($aiResponse)) {
            $aiResponse = $this->generateFallbackResponse($userPrompt);
        }

        // Store model response
        CareerConversation::create([
            'user_id' => $userId,
            'session_id' => $sessionId,
            'role' => 'assistant',
            'message' => $aiResponse,
        ]);

        return $aiResponse;
    }

    /**
     * Context-aware fallback response generator for career coaching.
     */
    protected function generateFallbackResponse(string $prompt): string
    {
        $lower = strtolower($prompt);

        if (str_contains($lower, 'resume') || str_contains($lower, 'ats')) {
            return "### 📄 Executive Resume & ATS Audit Strategy\n\nTo maximize your interview callback rates:\n\n1. **Lead with Metrics**: Replace general statements with quantifiable outcomes (e.g. *\"Reduced P99 API latency by 48% across 12M daily requests\"*).\n2. **Target Keyword Density**: Ensure technical keywords match job descriptions (e.g. *TypeScript, PostgreSQL, Distributed Caching*).\n3. **Formatting Integrity**: Use clean single-column or 2-column layouts without nested tables or images so Applicant Tracking Systems (Workday, Greenhouse) parse 100% clean.";
        }

        if (str_contains($lower, 'interview') || str_contains($lower, 'star')) {
            return "### 🎯 STAR Method Technical Interview Preparation\n\nFor senior engineering & product leadership interviews:\n\n- **Situation**: Define the high-stakes problem ($2M ARR at risk or 500ms latency spike).\n- **Task**: Explain your explicit architectural ownership.\n- **Action**: Outline technical decisions (e.g. migrating from monolith to Redis caching microservices).\n- **Result**: Quantify final metric gains (+34% conversion rate).";
        }

        if (str_contains($lower, 'salary') || str_contains($lower, 'offer') || str_contains($lower, 'negotiat')) {
            return "### 💰 Salary Negotiation Script & Strategy\n\nWhen countering an initial compensation offer:\n\n*\"I am thrilled about the vision and joining the team as Senior Engineer. Based on industry benchmark data for this role and my track record scaling high-availability microservices, I am looking for $185,000 base salary with equity parity. If we can align on this, I am ready to sign immediately.\"*";
        }

        return "### 🚀 Career Advancement Action Blueprint\n\nTo position yourself for top 2% engineering and product roles:\n\n1. **Highlight Scalable Impact**: Showcase systems handling multi-million user scale.\n2. **Proactive Portfolio**: Link public GitHub repositories or technical architecture docs.\n3. **Interview Preparation**: Practice mock STAR responses focused on leadership and trade-off decisions.";
    }
}
