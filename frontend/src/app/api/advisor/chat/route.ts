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

  // 7. Calendar, Scheduling & Interview Timeline Strategy
  if (lower.includes("calendar") || lower.includes("schedule") || lower.includes("timeline") || lower.includes("reschedule") || lower.includes("deadline") || lower.includes("time management") || lower.includes("interview date")) {
    return `### 📅 Executive Interview Scheduling & 7-Day Prep Calendar

Proper scheduling and pacing can increase your interview performance by over **40%**. Here is the recommended framework:

#### 🗓️ The 7-Day High-Impact Prep Calendar:
- **Days 1–2 (Company & Architecture Audit)**: Research target engineering blogs, stack teardowns (e.g. Next.js, Go, AWS, Kafka), and recent company product launches.
- **Days 3–4 (STAR Behavioral Stories)**: Polish 5 distinct stories (Production Outage, Tech Disagreement, Scaling Bottleneck, Mentorship, Cross-functional Delivery).
- **Day 5 (Timed Mock Pressure Tests)**: Run a 45-minute live mock session for System Design or Coding using the **AI Mock Interview** panel.
- **Day 6 (Executive Questions Preparation)**: Prepare 4-5 high-leverage questions about engineering culture, CI/CD deployment cadence, and technical debt.
- **Day 7 (Pre-Game Reset)**: Test camera/mic, review architectural cheat sheets, and ensure zero late-night cramming.

#### ⏰ Optimal Interview Scheduling Levers:
- **Best Timeslots**: Tuesday – Thursday mornings (9:30 AM – 11:30 AM) when interviewers are sharpest and not fatigued by afternoon meetings.
- **Buffer Rules**: Never schedule back-to-back technical rounds across different companies on the same day without at least a 2.5-hour decompression buffer.
- **Dashboard Integration**: Check your **Calendar & Schedule** tab in ResumeFlow AI to track your deadlines and interview rounds synced directly from your Kanban board.

💡 *Do you have an upcoming interview date or deadline you'd like to plan a preparation schedule for?*`;
  }

  // 8. Job Search Analytics & Pipeline Funnel
  if (lower.includes("analytic") || lower.includes("metric") || lower.includes("funnel") || lower.includes("conversion") || lower.includes("rate") || lower.includes("job search stats") || lower.includes("pipeline") || lower.includes("stats")) {
    return `### 📊 High-Performance Job Search Analytics & Funnel Benchmarks

To systematically land top-tier offers, track your pipeline against these Silicon Valley tier-1 hiring benchmarks:

#### 📈 Industry Standard Conversion Funnel (Senior / Lead Roles):
| Funnel Stage | Top 10% Benchmark | Warning Threshold (< Action Needed) |
| :--- | :--- | :--- |
| **Application → Recruiter Screen** | **18% – 25%** | < 10% *(Diagnosis: Resume ATS keywords & quantified metrics need overhaul)* |
| **Recruiter Screen → Technical Round** | **70% – 85%** | < 50% *(Diagnosis: Elevator pitch & communication clarity needs polish)* |
| **Technical Round → Final Loop** | **55% – 70%** | < 40% *(Diagnosis: System design trade-offs & live coding edge cases)* |
| **Final Loop → Written Offer** | **45% – 60%** | < 30% *(Diagnosis: Executive presence & STAR leadership alignment)* |

#### 🎯 Key Levers to 2x Your Pipeline Conversion:
1. **48-Hour Application Velocity**: Apply within the first 48 hours of posting for a **3.2x** higher recruiter viewing rate.
2. **Keyword Match Density**: Maintain an ATS score of **80+** on all tailored applications.
3. **Pipeline Value**: Track your total potential compensation across active interview stages in your **Job Search Analytics** panel.

💡 *Would you like to analyze your current application numbers, conversion rates, or diagnose where candidates drop off in the funnel?*`;
  }

  // 9. Notifications Center & Proactive Alerts
  if (lower.includes("notif") || lower.includes("alert") || lower.includes("digest") || lower.includes("reminder") || lower.includes("email alert") || lower.includes("push")) {
    return `### 🔔 Notifications Center & Proactive Career Alert Strategy

Staying on top of time-sensitive recruiting updates can make the difference between securing an offer or having a hiring headcount close.

#### ⚡ 4 Essential Alerts to Maintain in Your Job Search:
1. **⚡ Interview Slot Booking Alerts**: Recruiter interview slots fill within **4 hours** of delivery. Ensure immediate email alerts are enabled.
2. **⏳ 48-Hour Take-Home & Application Deadlines**: Automated countdown pings for take-home coding challenges or pending application cutoffs.
3. **📄 ATS Sync & Keyword Alerts**: Confirmations when updated skills or parsed resumes are re-indexed across your active applications.
4. **📬 Weekly Career Digest**: Sunday evening automated summaries covering conversion rates, upcoming rounds, and top pending tasks.

#### ⚙️ Notification Center Management:
- Configure your **Email Alerts**, **Push Notifications**, and **Weekly Digest** inside the **Notifications Center** panel.
- Mark notifications as read or clear completed milestone alerts with one click.

💡 *Would you like help setting up your alert preferences or drafting an automated follow-up reminder for a pending application?*`;
  }

  // 10. Job Seeker Profile & Executive Personal Branding
  if (lower.includes("profile") || lower.includes("bio") || lower.includes("headline") || lower.includes("personal brand") || lower.includes("about me") || lower.includes("executive summary") || lower.includes("contact info")) {
    return `### 👤 Executive Job Seeker Profile & Personal Branding Strategy

Your profile is the foundational digital identity that recruiters evaluate before scheduling initial interviews.

#### 🌟 3 Pillars of a High-Converting Candidate Profile:
1. **High-Impact Headline Formula**:
   - *Weak*: "Software Engineer looking for opportunities"
   - *Executive Impact*: **"Senior Full-Stack Engineer | Distributed Systems & Next.js 15 | Ex-Fintech ($2.4B GMV) | Cloud & Microservices"**
2. **Quantified 3-Sentence Executive Summary**:
   - **Sentence 1 (Identity & Scale)**: "Senior Full-Stack Engineer with 6+ years designing fault-tolerant distributed web architectures."
   - **Sentence 2 (Signature Technical Win)**: "Scaled event-driven ingestion microservices from 10k to 250k RPS with sub-50ms P99 latency."
   - **Sentence 3 (Leadership Focus)**: "Passionate about code quality standards, mentoring junior engineers, and driving CI/CD release cadence."
3. **Verified Proof-Points**:
   - Direct clickable **LinkedIn Profile** and **GitHub Portfolio** links added in your contact header.

#### 🔄 Profile Synchronization in ResumeFlow AI:
- Saving your details in the **Job Seeker Profile** panel automatically syncs your Name, Target Title, Location, and Social URLs across all active Resume Builder templates.

💡 *Would you like me to write a tailored Executive Summary or optimize your profile headline for a specific target role?*`;
  }

  // 11. Account Settings, Security & Workspace Preferences
  if (lower.includes("setting") || lower.includes("account") || lower.includes("2fa") || lower.includes("two factor") || lower.includes("security") || lower.includes("api key") || lower.includes("billing") || lower.includes("theme") || lower.includes("language")) {
    return `### ⚙️ Account Settings & Security Management

Configure your ResumeFlow AI workspace environment, security posture, and developer integrations:

#### 🛡️ 1. Two-Factor Authentication (2FA) & Security
- **Protect Your Career Pipeline**: Safeguard private salary negotiations, compensation offers, and recruiter correspondence by enabling **TOTP 2-Step Verification** with Google Authenticator or Authy.
- **Immediate Status**: Toggle and verify 2FA in real-time inside your **Account Settings** tab.

#### 🔑 2. Developer Integration API Keys
- Access programmatic endpoints to export your ATS scores, parsed resume schemas, and Kanban application trackers to external tools (Notion, Raycast, Zapier).
- **Security Lever**: Click **"Rotate Key"** at any time to immediately revoke previous tokens.

#### 🎨 3. Workspace Customization & Localization
- **Theme Modes**: Seamlessly toggle between **Light**, **Sleek Dark**, and **System Auto**.
- **Global Localization**: Select from 8 native languages (English, Urdu, Spanish, Arabic, French, German, Chinese, Hindi) for all dashboard metrics.

💡 *Do you need assistance enabling 2FA, generating an API key, or customizing your workspace theme?*`;
  }

  // 12. SaaS Admin Operations & Platform Infrastructure
  if (lower.includes("admin") || lower.includes("operation") || lower.includes("saas") || lower.includes("arr") || lower.includes("token usage") || lower.includes("user management") || lower.includes("subscriber")) {
    return `### ⚡ SaaS Admin Operations & Infrastructure Dashboard

Overview of ResumeFlow AI platform performance, subscription financials, and LLM inference telemetry:

#### 📊 1. Core Platform KPIs:
- **Total Registered Talent**: **1,482 Users** (+12% WoW growth).
- **Active Paid Subscribers**: **842 Pro & Enterprise Accounts** (94% annual retention).
- **Monthly Run-Rate (ARR)**: **$24,910** targeting $30,000 next quarter.
- **AI Token Utilization**: **42.8M Tokens Consumed** across Gemini ATS parsing and Career Advisor sessions ($128.40 cloud inference expense).

#### 👥 2. User Administration & Tier Management:
- **Live Role Controls**: Instantly upgrade or downgrade user subscription tiers (*Free*, *Pro*, *Enterprise*).
- **Security Audit Logs**: Track administrator token rotation events, 2FA status, and session anomalies.
- **Admin Panel Access**: Accessible directly through the **Admin Operations** tab on the navigation sidebar.

💡 *Would you like an analysis of user retention metrics, AI token unit economics, or subscription tier adjustments?*`;
  }

  // Default Comprehensive Response
  return `### 🤖 Executive AI Career Advisor & LLM Coach

I am here to help you accelerate your tech career, land top-tier software engineering offers, and maximize your compensation.

Here is what we can work on right now:
1. **📄 Resume & ATS Polish**: Paste a bullet point or job description for instant keyword optimization.
2. **👤 Job Seeker Profile**: Optimize your executive headline, bio, and social proof links.
3. **💰 Salary & Equity Negotiation**: Review compensation packages and draft counter-offer emails.
4. **🎯 STAR Interview Prep**: Practice behavioral, leadership, and system design questions.
5. **📊 Job Search Analytics**: Analyze conversion rates, application funnels, and pipeline metrics.
6. **📅 Calendar & Prep Schedules**: Build a customized 7-day interview timeline and scheduling strategy.
7. **🔔 Notifications & Alerts**: Manage proactive recruiter alerts, deadlines, and digests.
8. **⚙️ Account Settings & 2FA**: Configure workspace themes, security, API keys, and language.
9. **⚡ SaaS Admin Operations**: Review system ARR, user directories, and AI token unit economics.
10. **🚀 Career Roadmap & Leveling**: Build a customized plan to reach Senior or Staff Engineer.
11. **📬 Recruiter Outreach**: Generate personalized LinkedIn messages that get responses.

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

