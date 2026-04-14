// Server Component: displays all jobs the user has saved.
// Fetches saved jobs by INNER JOINing SavedJobsTable with ScrapedJobsTable.

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { UserTable, SavedJobsTable, ScrapedJobsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Job } from "@/components/dashboard/job-card";
import { JobsList } from "@/components/jobs/jobs-list";
import { Bookmark } from "lucide-react";

export default async function SavedJobsPage() {
  // ── Step 1: Authentication ─────────────────────────────────────
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  // ── Step 2: Resolve internal user ID ───────────────────────────
  const userRecord = await db
    .select({ id: UserTable.id })
    .from(UserTable)
    .where(eq(UserTable.clerkId, clerkId))
    .limit(1);

  const internalUserId = userRecord[0]?.id;
  if (!internalUserId) redirect("/sign-in");

  // ── Step 3: Fetch saved jobs via INNER JOIN ────────────────────
  // Join SavedJobsTable with ScrapedJobsTable to get full job details
  // for only the jobs this user has saved.
  const savedRows = await db
    .select({
      // Pull all job fields from ScrapedJobsTable
      id: ScrapedJobsTable.id,
      title: ScrapedJobsTable.title,
      companyName: ScrapedJobsTable.companyName,
      wage: ScrapedJobsTable.wage,
      location: ScrapedJobsTable.location,
      locationRequirement: ScrapedJobsTable.locationRequirement,
      experienceLevel: ScrapedJobsTable.experienceLevel,
      description: ScrapedJobsTable.description,
      sourceUrl: ScrapedJobsTable.sourceUrl,
    })
    .from(SavedJobsTable)
    .innerJoin(ScrapedJobsTable, eq(SavedJobsTable.jobId, ScrapedJobsTable.id))
    .where(eq(SavedJobsTable.userId, internalUserId));

  // ── Step 4: Map DB rows → Job interface ────────────────────────
  const jobs: Job[] = savedRows.map((row) => ({
    id: row.id,
    title: row.title,
    company: row.companyName,
    salary: row.wage || "Salary not disclosed",
    location: row.location,
    type: row.locationRequirement,
    experience: row.experienceLevel || "Experience not specified",
    description: row.description,
    sourceUrl: row.sourceUrl,
    isSaved: true, // All jobs on this page are saved by definition
  }));

  // ── Step 5: Empty state ────────────────────────────────────────
  if (jobs.length === 0) {
    return (
      <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
        <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
          <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4">
            <Bookmark className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              No Saved Jobs Yet
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
              You haven&apos;t saved any jobs yet. Browse the directory and click
              the bookmark icon on jobs you&apos;re interested in.
            </p>
          </div>
          <Link
            href="/dashboard/jobs"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            Browse Jobs Directory
          </Link>
        </div>
      </div>
    );
  }

  // ── Step 6: Render ─────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 w-full animate-in fade-in duration-500">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Saved Jobs
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {jobs.length} {jobs.length === 1 ? "job" : "jobs"} saved
        </p>
      </div>

      {/* Reuse the same JobsList client component — no pagination needed */}
      <JobsList
        jobs={jobs}
        pagination={{ currentPage: 1, totalPages: 1 }}
      />
    </div>
  );
}