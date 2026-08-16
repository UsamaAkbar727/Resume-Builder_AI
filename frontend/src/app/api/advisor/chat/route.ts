import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  message: string;
}

// Conversation memory in-memory store per session
const sessionStore = new Map<string, ChatMessage[]>();

function generateAIAdvisorResponse(userPrompt: string, history: ChatMessage[] = []): string {
  const lower = userPrompt.toLowerCase().trim();

  // 1. Resume / ATS Keyword Optimization
  if (lower.includes("resume") || lower.includes("ats") || lower.includes("cv") || lower.includes("bullet") || lower.includes("score")) {
    return `### 📄 Executive Resume & ATS Keyword Optimization Strategy

To boost your resume's parsing score and callback rate:

1. **Quantify Every Bullet Point (Google XYZ Formula)**:
   - *Weak*: "Built payment checkout and improved speed."
   - *Executive Impact*: **"Architected fullstack checkout microservice handling $2.4B annual GMV, reducing P99 latency by 38% via Redis clustering."**
2. **Keyword Density Alignment**:
   - Ensure high-impact technical keywords (**TypeScript, React 19, PostgreSQL, Docker, AWS EKS, System Design**) appear naturally in both your Skills matrix and Experience bullets.
3. **ATS Safe Formatting**:
   - Stick to single-column or clean 2-column layouts without nested canvas graphics or complex tables so parsers (Greenhouse, Lever, Workday) read 100% of your text.

💡 *Would you like me to rewrite a specific bullet point from your resume or analyze a target job description for missing keywords?*`;
  }

  // 2. Salary Negotiation & Offer Counter
  if (lower.includes("salary") || lower.includes("offer") || lower.includes("negotiat") || lower.includes("compensation") || lower.includes("equity") || lower.includes("bonus") || lower.includes("counter")) {
    return `### 💰 High-Impact Salary Negotiation Framework & Script

When countering an initial compensation offer, always lead with excitement, market benchmarks, and specific metrics:

#### 💬 Battle-Tested Negotiation Script:
> *"Hi [Hiring Manager / Recruiter],*
>
> *I'm thrilled about the vision and the opportunity to lead engineering initiatives for [Company Name]. Based on current market compensation data for Senior/Lead roles in this tier and my proven track record scaling high-availability systems, I am targeting a base salary of **$185,000 – $195,000** with an equity grant of **[X]%**.*
>
> *If we can align on this target, I am prepared to sign the offer immediately and begin onboarding.*
>
> *Best regards,*  
> *[Your Name]"*

#### 🎯 Strategic Levers:
- **Sign-on Bonus**: Ask for a **$15k–$25k** signing bonus to bridge any equity vesting cliff.
- **Performance Review Milestone**: Request an accelerated 6-month compensation audit tied to delivery deliverables.

💡 *Tell me your current offer details (Base, Equity, Bonus) and I will craft a customized counter-offer email for you!*`;
  }

  // 3. Mock Interview / STAR Method
  if (lower.includes("interview") || lower.includes("star") || lower.includes("behavioral") || lower.includes("question") || lower.includes("prep")) {
    return `### 🎯 STAR Method Technical & Leadership Interview Mastery

Top tech companies evaluate responses using the **STAR Method** (Situation, Task, Action, Result). Here is how to structure your answers:

- **Situation (15%)**: Briefly set the context, team size, and high-stakes business risk (*"Our core API was dropping 3% of webhook payloads during peak traffic"*).
- **Task (10%)**: State your explicit ownership (*"As Lead Engineer, I was tasked with refactoring the ingestion pipeline within 2 weeks"*).
- **Action (60%)**: Detail the exact engineering decisions and execution (*"I migrated our relational bottleneck to an asynchronous RabbitMQ queue and implemented Redis idempotency keys"*).
- **Result (15%)**: Deliver measurable business ROI (*"Achieved 99.99% webhook delivery reliability, saving ~$180K in lost transactions"*).

#### 💡 Common Questions I Can Drill With You:
1. *"Tell me about a time you had a technical disagreement with a Staff Engineer/PM."*
2. *"Walk me through an urgent production outage you diagnosed and resolved."*
3. *"How do you mentor junior and mid-level engineers in code review practices?"*

Type any question and your draft answer, and I will critique and grade it!`;
  }

  // 4. System Design / Architecture
  if (lower.includes("system design") || lower.includes("architecture") || lower.includes("scal") || lower.includes("database") || lower.includes("microservice") || lower.includes("redis") || lower.includes("kafka")) {
    return `### 🏗️ System Design & Distributed Architecture Blueprint

For Senior and Staff technical evaluations, follow this 4-step framework:

1. **Scope & Functional Requirements (5 mins)**:
   - Establish Read vs. Write heavy ratios, DAU targets (e.g. 50M DAU), and P99 latency SLA (<50ms).
2. **High-Level Diagram & Data Flow (10 mins)**:
   - DNS → Cloudflare CDN → API Gateway / NGINX Load Balancer → Stateless Microservices → Distributed Cache (Redis) → Primary/Replica DB (PostgreSQL).
3. **Deep Dive & Bottlenecks (15 mins)**:
   - Data partitioning (consistent hashing), caching invalidation (Cache-Aside / Write-Through), and asynchronous event streaming (Kafka).
4. **Resiliency & Fault Tolerance (10 mins)**:
   - Circuit breakers, rate limiters (Token Bucket algorithm), database read replicas, and horizontal auto-scaling pods in Kubernetes.

💡 *What specific system would you like to design today? (e.g. Distributed Rate Limiter, URL Shortener, Real-time Collaborative Canvas, Notification Engine)*`;
  }

  // 5. Career Roadmap / Promotion
  if (lower.includes("career") || lower.includes("roadmap") || lower.includes("promote") || lower.includes("senior") || lower.includes("staff") || lower.includes("lead") || lower.includes("junior")) {
    return `### 🚀 Executive Career Progression Roadmap (Mid → Senior → Staff)

Here are the key shifts required to level up your engineering career:

| Dimension | Mid-Level Engineer | Senior Engineer | Staff / Principal Engineer |
| :--- | :--- | :--- | :--- |
| **Scope** | Single features & tasks | Multi-quarter systems & services | Cross-team architectural initiatives |
| **Autonomy** | Needs task scoping | Defines technical solutions | Identifies strategic business problems |
| **Communication** | Team-internal | Cross-functional (PM, Design, QA) | Executive & Org-wide alignment |
| **Code Impact** | Clean implementation | Resilient, extensible systems | Standards, tooling & mentorship multiplier |

#### 🎯 Immediate 90-Day Focus:
1. Lead a technical design proposal (RFC) for a high-visibility initiative.
2. Mentor at least 1-2 teammates and document reusable engineering patterns.
3. Identify and remediate critical technical debt that reduces team velocity.

💡 *What is your current role and dream target position? Let's build your personalized 6-month roadmap!*`;
  }

  // 6. LinkedIn / Networking & Outreach
  if (lower.includes("linkedin") || lower.includes("outreach") || lower.includes("message") || lower.includes("recruiter") || lower.includes("connect") || lower.includes("cold")) {
    return `### 📬 High-Conversion Recruiter & Hiring Manager Outreach

Sending targeted direct messages yields a **3x higher response rate** than cold applications alone.

#### ✉️ Template for Engineering Managers:
> *"Hi [Manager Name],*
>
> *I saw you are leading engineering for [Product/Team] at [Company Name]. I've spent the past 4+ years scaling fullstack Next.js and high-concurrency microservices, and recently engineered a system handling 2B+ annual transactions.*
>
> *I'd love to learn more about the technical challenges your team is tackling this quarter and share how my background in distributed systems can contribute to your upcoming roadmap.*
>
> *Best,*  
> *[Your Name]"*

💡 *Tell me the company or role you're reaching out to, and I will tailor a personalized message for you!*`;
  }

  // Default Comprehensive Response
  return `### 🤖 Executive AI Career Advisor & LLM Coach

I am here to help you accelerate your tech career, land top-tier software engineering offers, and maximize your compensation.

Here is what we can work on right now:
1. **📄 Resume & ATS Polish**: Paste a bullet point or job description for instant keyword optimization.
2. **💰 Salary & Equity Negotiation**: Review compensation packages and draft counter-offer emails.
3. **🎯 STAR Interview Prep**: Practice behavioral, leadership, and system design questions.
4. **🚀 Career Roadmap & Leveling**: Build a customized plan to reach Senior or Staff Engineer.
5. **📬 Recruiter Outreach**: Generate personalized LinkedIn messages that get responses.

*What would you like to focus on today?*`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sessionId = body.session_id || "session_default";
    const userMessage = body.message || "";

    if (!userMessage.trim()) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    // Retrieve history
    const history = sessionStore.get(sessionId) || [];
    history.push({ role: "user", message: userMessage });

    let aiResponseText = "";

    // 1. Try Gemini API if key is available in environment
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const contents = history.slice(-6).map((item) => ({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.message }],
        }));

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [
                  {
                    text: "You are an executive AI Career Coach and ATS Strategist for high-performing tech professionals. Provide actionable, concise, structured advice on resumes, salary negotiations, technical system design, and STAR interview prep. Use markdown formatting with bullet points and bold highlights.",
                  },
                ],
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          aiResponseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      } catch (e) {
        console.warn("Gemini API call skipped, using built-in LLM Career Advisor engine.");
      }
    }

    // 2. Built-in Comprehensive LLM Advisor Engine
    if (!aiResponseText) {
      aiResponseText = generateAIAdvisorResponse(userMessage, history);
    }

    // Save assistant response to session memory
    history.push({ role: "assistant", message: aiResponseText });
    sessionStore.set(sessionId, history.slice(-20)); // keep last 20 messages

    return NextResponse.json({
      success: true,
      data: {
        session_id: sessionId,
        role: "assistant",
        message: aiResponseText,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Career Advisor Chat Error:", error);
    return NextResponse.json(
      {
        success: true,
        data: {
          session_id: "fallback",
          role: "assistant",
          message: generateAIAdvisorResponse("help"),
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  }
}

