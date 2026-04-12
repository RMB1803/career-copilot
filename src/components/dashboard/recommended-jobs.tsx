'use client';

import { useState } from 'react';
import { JobCard, Job } from './job-card';
import { JobDetailsModal } from './job-details-modal';
import { Sparkles } from 'lucide-react';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'Linear',
    salary: '$140,000 - $180,000',
    location: 'San Francisco, CA',
    type: 'Remote',
    experience: '4+ years',
    matchScore: 98,
  },
  {
    id: '2',
    title: 'Full Stack Web Developer',
    company: 'Vercel',
    salary: '$130,000 - $160,000',
    location: 'New York, NY',
    type: 'Hybrid',
    experience: '3+ years',
    matchScore: 94,
  },
  {
    id: '3',
    title: 'React Native Developer',
    company: 'Notion',
    salary: '$120,000 - $150,000',
    location: 'Austin, TX',
    type: 'Remote',
    experience: '2+ years',
    matchScore: 89,
  },
  {
    id: '4',
    title: 'Software Engineer, Internal Tools',
    company: 'Stripe',
    salary: '$150,000 - $190,000',
    location: 'Seattle, WA',
    type: 'On-site',
    experience: '5+ years',
    matchScore: 85,
  }
];

export function RecommendedJobs() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center">
            Recommended Jobs
          </h2>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Jobs where you're a top applicant based on your AI resume analysis.
          </p>
        </div>
        <div className="flex items-center text-sm font-semibold text-teal-700 dark:text-teal-300 bg-teal-50/80 dark:bg-teal-950/40 px-3.5 py-1.5 rounded-full border border-teal-100 dark:border-teal-900/60 shadow-sm w-fit">
          <Sparkles className="mr-1.5 h-4 w-4" />
          Ranked by Match Score
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_JOBS.map((job) => (
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
    </div>
  );
}
