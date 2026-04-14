// This is a Server Component (no "use client") — data fetching happens
// securely on the server. The user never sees raw DB queries or credentials.

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { UserTable, UserResumeTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

// TypeScript type for the reviewData JSON stored in the database.
// Matches the Zod schema defined in src/actions/analyser.ts.
type ReviewData = {
  summary: string;
  strengths: string[];
  weaknesses: string[];
};

export default async function ResumeReviewPage() {
  // ── Step 1: Authentication ─────────────────────────────────────────
  // auth() is a Clerk helper that reads the session cookie on the server.
  // If the user isn't logged in, redirect them to the sign-in page.
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  // ── Step 2: Resolve internal user ID ───────────────────────────────
  // Clerk gives us an external ID (clerkId). Our database uses its own
  // primary key, so we map clerkId → internal id.
  const userRecord = await db
    .select({ id: UserTable.id })
    .from(UserTable)
    .where(eq(UserTable.clerkId, clerkId))
    .limit(1);

  const internalUserId = userRecord[0]?.id;
  if (!internalUserId) redirect("/sign-in");

  // ── Step 3: Fetch resume review data ───────────────────────────────
  const resumeRecord = await db
    .select({ reviewData: UserResumeTable.reviewData })
    .from(UserResumeTable)
    .where(eq(UserResumeTable.userId, internalUserId))
    .limit(1);

  const reviewData = resumeRecord[0]?.reviewData as ReviewData | undefined;

  // ── Step 4: Empty state ────────────────────────────────────────────
  // If the user hasn't uploaded a resume yet, show a helpful message
  // instead of an empty or broken page.
  if (!reviewData) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-6 py-24 text-center animate-in fade-in duration-500">
        <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4">
          <FileText className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            No Resume Analysis Found
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            It looks like you haven&apos;t uploaded your resume yet. Head back to
            the dashboard and click &quot;Upload Resume&quot; to get your AI-powered
            analysis.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // ── Step 5: Render the three review sections ───────────────────────
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 w-full animate-in fade-in duration-500">
      {/* Page header */}
      <div className="space-y-1">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Resume Analysis
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          AI-powered review of your uploaded resume
        </p>
      </div>

      {/* ── Executive Summary Card ──────────────────────────────────── */}
      <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2.5 text-lg text-zinc-900 dark:text-zinc-50">
            <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-2">
              <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </div>
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {reviewData.summary}
          </p>
        </CardContent>
      </Card>

      {/* ── Two-column grid for Strengths & Improvements ────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Strengths */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 text-lg text-zinc-900 dark:text-zinc-50">
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              Core Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {reviewData.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">
                    {strength}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 text-lg text-zinc-900 dark:text-zinc-50">
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {reviewData.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-500 dark:text-amber-400" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">
                    {weakness}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}