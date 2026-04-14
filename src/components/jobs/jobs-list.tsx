"use client";

// This client wrapper handles two interactive concerns:
// 1. Modal state — tracking which job the user clicked to show in the modal.
// 2. Pagination — navigating between pages via URL query params.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobCard, Job } from "@/components/dashboard/job-card";
import { JobDetailsModal } from "@/components/dashboard/job-details-modal";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react";

interface Pagination {
  currentPage: number;
  totalPages: number;
}

interface JobsListProps {
  jobs: Job[];
  pagination: Pagination;
}

export function JobsList({ jobs, pagination }: JobsListProps) {
  // Track which job card the user clicked — null means the modal is closed
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // useRouter lets us update the URL query param for pagination,
  // which triggers a server-side re-render with the new page of data.
  const router = useRouter();

  function goToPage(page: number) {
    router.push(`/dashboard/jobs?page=${page}`);
  }

  // ── Empty state ──────────────────────────────────────────────────
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4">
          <Briefcase className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            No Jobs Found
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            There are no job listings available at the moment. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Job cards list ──────────────────────────────────────────── */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => setSelectedJob(job)}
          />
        ))}
      </div>

      {/* ── Pagination controls ─────────────────────────────────────── */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.currentPage <= 1}
            onClick={() => goToPage(pagination.currentPage - 1)}
            className="border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-40"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={pagination.currentPage >= pagination.totalPages}
            onClick={() => goToPage(pagination.currentPage + 1)}
            className="border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-40"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* ── Job details modal ───────────────────────────────────────── */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}
