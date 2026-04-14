// Server Component: fetches the user's resume skills and scraped jobs,
// scores each job against the user's skills, and renders the top 5 matches.

import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { UserTable, UserResumeTable, ScrapedJobsTable, SavedJobsTable } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import { Job } from "./job-card";
import { RecommendedJobsList } from "./recommended-jobs-list";

// ── Match Data types (from the analyser's Zod schema) ──────────────
type MatchData = {
  coreSkills: string[];
  primaryJobTitles: string[];
  yearsOfExperience: number;
};

// ── Scoring Algorithm ──────────────────────────────────────────────
// Pure function: takes a job and the user's skills, returns a 0–100 score.
// No external libraries — just string matching and basic math.
function calculateMatchScore(
  job: { title: string; description: string },
  userSkills: string[],
  primaryJobTitles: string[]
): number {
  if (userSkills.length === 0) return 0;

  // Combine title + description into one searchable string
  const searchText = `${job.title} ${job.description}`.toLowerCase();

  // Count how many of the user's skills appear in the job text
  let matchCount = 0;
  for (const skill of userSkills) {
    if (searchText.includes(skill.toLowerCase())) {
      matchCount++;
    }
  }

  // Base score: percentage of user skills found in the job
  let score = Math.round((matchCount / userSkills.length) * 100);

  // Bonus: +15 points if the job title closely matches one of the
  // user's primary job titles (e.g., "Frontend Developer" in both)
  const jobTitleLower = job.title.toLowerCase();
  const hasTitleMatch = primaryJobTitles.some((title) =>
    jobTitleLower.includes(title.toLowerCase()) ||
    title.toLowerCase().includes(jobTitleLower)
  );
  if (hasTitleMatch) {
    score += 15;
  }

  // Cap at 100
  return Math.min(score, 100);
}

const TOP_N_JOBS = 5;

export async function RecommendedJobs() {
  // ── Step 1: Authenticate ─────────────────────────────────────────
  const { userId: clerkId } = await auth();
  if (!clerkId) return null; // Not logged in — don't render the section

  // ── Step 2: Get internal user ID ─────────────────────────────────
  const userRecord = await db
    .select({ id: UserTable.id })
    .from(UserTable)
    .where(eq(UserTable.clerkId, clerkId))
    .limit(1);

  const internalUserId = userRecord[0]?.id;
  if (!internalUserId) return null;

  // ── Step 3: Fetch the user's parsed resume data ──────────────────
  const resumeRecord = await db
    .select({ matchData: UserResumeTable.matchData })
    .from(UserResumeTable)
    .where(eq(UserResumeTable.userId, internalUserId))
    .limit(1);

  console.log("=== DEBUG RECOMMENDED JOBS ===");
  console.log("Internal User ID looking for resume:", internalUserId);
  console.log("Did we find a resume row?:", resumeRecord);

  const matchData = resumeRecord[0]?.matchData as MatchData | undefined;

  // If no resume exists, show a helpful empty state
  if (!matchData) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center">
              Recommended Jobs
            </h2>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
              Jobs where you&apos;re a top applicant based on your AI resume analysis.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4">
            <FileText className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Upload Your Resume
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
              Upload your resume to unlock AI-powered job recommendations
              tailored to your skills and experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 4: Fetch jobs + saved IDs in parallel ───────────────────
  const [rawJobs, savedRows] = await Promise.all([
    // Fetch the latest 100 jobs for scoring
    db
      .select()
      .from(ScrapedJobsTable)
      .orderBy(desc(ScrapedJobsTable.scrapedAt))
      .limit(100),
    // Fetch the user's saved job IDs to show filled bookmarks
    db
      .select({ jobId: SavedJobsTable.jobId })
      .from(SavedJobsTable)
      .where(eq(SavedJobsTable.userId, internalUserId)),
  ]);

  const savedJobIds = new Set(savedRows.map((r) => r.jobId));

  // ── Step 5: Score, sort, and pick the top N jobs ─────────────────
  const scoredJobs: Job[] = rawJobs
    .map((row) => ({
      id: row.id,
      title: row.title,
      company: row.companyName,
      salary: row.wage || "Salary not disclosed",
      location: row.location,
      type: row.locationRequirement,
      experience: row.experienceLevel || "Experience not specified",
      description: row.description,
      sourceUrl: row.sourceUrl,
      isSaved: savedJobIds.has(row.id),
      matchScore: calculateMatchScore(
        { title: row.title, description: row.description },
        matchData.coreSkills,
        matchData.primaryJobTitles
      ),
    }))
    // Sort by highest match score first
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
    // Take only the top results
    .slice(0, TOP_N_JOBS);

  // ── Step 6: Render ───────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center">
            Recommended Jobs
          </h2>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Jobs where you&apos;re a top applicant based on your AI resume analysis.
          </p>
        </div>
        <div className="flex items-center text-sm font-semibold text-teal-700 dark:text-teal-300 bg-teal-50/80 dark:bg-teal-950/40 px-3.5 py-1.5 rounded-full border border-teal-100 dark:border-teal-900/60 shadow-sm w-fit">
          <Sparkles className="mr-1.5 h-4 w-4" />
          Ranked by Match Score
        </div>
      </div>

      {/* Client wrapper handles modal state for the job cards */}
      <RecommendedJobsList jobs={scoredJobs} />
    </div>
  );
}
