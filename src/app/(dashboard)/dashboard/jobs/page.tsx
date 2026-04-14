// This is a Server Component — data fetching happens securely on the server.
// The page reads the ?page= query param, fetches from ScrapedJobsTable,
// and passes the data down to the <JobsList> client component.

import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { ScrapedJobsTable, SavedJobsTable, UserTable } from "@/drizzle/schema";
import { count, eq, inArray } from "drizzle-orm";
import { Job } from "@/components/dashboard/job-card";
import { JobsList } from "@/components/jobs/jobs-list";

const JOBS_PER_PAGE = 50;

// In Next.js 16 (App Router), Server Components receive searchParams as a prop.
// This lets us do URL-based pagination without any client-side state.
export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // ── Step 1: Parse the page number from the URL ─────────────────
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));
  const offset = (currentPage - 1) * JOBS_PER_PAGE;

  // ── Step 2: Get the user's saved job IDs (if logged in) ────────
  // This lets us show which jobs are already bookmarked.
  let savedJobIds = new Set<string>();

  const { userId: clerkId } = await auth();
  if (clerkId) {
    const userRecord = await db
      .select({ id: UserTable.id })
      .from(UserTable)
      .where(eq(UserTable.clerkId, clerkId))
      .limit(1);

    if (userRecord[0]?.id) {
      const savedRows = await db
        .select({ jobId: SavedJobsTable.jobId })
        .from(SavedJobsTable)
        .where(eq(SavedJobsTable.userId, userRecord[0].id));

      savedJobIds = new Set(savedRows.map((r) => r.jobId));
    }
  }

  // ── Step 3: Fetch jobs + total count in parallel ───────────────
  // We run both queries at the same time for better performance.
  const [rawJobs, totalCountResult] = await Promise.all([
    db
      .select()
      .from(ScrapedJobsTable)
      .limit(JOBS_PER_PAGE)
      .offset(offset),
    db
      .select({ total: count() })
      .from(ScrapedJobsTable),
  ]);

  const totalJobs = totalCountResult[0]?.total ?? 0;
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  // ── Step 4: Map DB records → Job interface ─────────────────────
  // The Job interface (from job-card.tsx) expects specific field names,
  // so we map the raw DB columns with graceful fallbacks.
  const jobs: Job[] = rawJobs.map((row) => ({
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
    // matchScore is intentionally left undefined — these are scraped jobs
    // without AI scoring. The JobCard and modal handle this gracefully.
  }));

  // ── Step 5: Render ─────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 w-full animate-in fade-in duration-500">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Jobs Directory
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Browse {totalJobs.toLocaleString()} available positions
        </p>
      </div>

      {/* Client component handles interactivity (modal + pagination) */}
      <JobsList
        jobs={jobs}
        pagination={{ currentPage, totalPages }}
      />
    </div>
  );
}
