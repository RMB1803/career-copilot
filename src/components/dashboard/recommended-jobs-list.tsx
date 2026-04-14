"use client";

// Thin client wrapper for the recommended jobs section.
// Its only job is to manage modal state — the parent Server Component
// handles all data fetching and scoring.

import { useState } from "react";
import { JobCard, Job } from "@/components/dashboard/job-card";
import { JobDetailsModal } from "@/components/dashboard/job-details-modal";

interface RecommendedJobsListProps {
  jobs: Job[];
}

export function RecommendedJobsList({ jobs }: RecommendedJobsListProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <>
      <div className="space-y-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => setSelectedJob(job)}
          />
        ))}
      </div>

      <JobDetailsModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </>
  );
}
