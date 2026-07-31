import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ResumeFlow AI – Ultimate AI ATS Resume Builder & Job Tracker",
    template: "%s | ResumeFlow AI"
  },
  description: "Create premium ATS-optimized resumes, write AI cover letters, track job applications with an interactive Kanban Board, and ace interviews with our AI voice simulator. ResumeFlow AI is your ultimate career co-pilot.",
  keywords: [
    "AI Resume Builder",
    "ATS Resume Checker",
    "Resume Scanner",
    "Job Tracker",
    "Job Tracker Kanban",
    "AI Cover Letter Generator",
    "Mock Interview Voice Simulator",
    "Career Roadmaps",
    "Notion style Resume",
    "Linear style Job Tracker",
    "Premium SaaS Resume Builder"
  ],
  authors: [{ name: "ResumeFlow AI Team" }],
  creator: "ResumeFlow AI",
  publisher: "ResumeFlow AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resumeflow-ai.com",
    title: "ResumeFlow AI – Ultimate AI ATS Resume Builder & Job Tracker",
    description: "Create premium ATS-optimized resumes, write AI cover letters, track job applications with an interactive Kanban Board, and ace interviews with our AI voice simulator.",
    siteName: "ResumeFlow AI"
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeFlow AI – Ultimate AI ATS Resume Builder & Job Tracker",
    description: "Create premium ATS-optimized resumes, write AI cover letters, track job applications with an interactive Kanban Board, and ace interviews with our AI voice simulator.",
    creator: "@resumeflow_ai"
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-500/20 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
