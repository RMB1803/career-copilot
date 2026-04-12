import { MapPin, Briefcase, Building, Sparkles, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  type: string; // Remote / On-site
  experience: string;
  matchScore: number;
  description?: string;
}

export interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col sm:flex-row gap-4 sm:items-start justify-between bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md hover:border-teal-200 dark:hover:border-teal-900 transition-all duration-200 ease-in-out cursor-pointer"
    >
      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Building className="mr-1.5 h-4 w-4" />
            {job.company}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800">
            <MapPin className="mr-1 h-3 w-3" />
            {job.location}
          </span>
          <span className="flex items-center px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800">
            <Briefcase className="mr-1 h-3 w-3" />
            {job.type}
          </span>
          <span className="flex items-center px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800">
            {job.experience}
          </span>
          <span className="px-2 py-1 flex items-center font-semibold text-zinc-700 dark:text-zinc-300">
            {job.salary}
          </span>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 flex items-center pt-2 border-t border-zinc-100 dark:border-zinc-800 w-fit pr-4">
          <Sparkles className="mr-1.5 h-4 w-4 text-teal-500 flex-shrink-0" />
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Strong match</span>
          <span className="ml-1 opacity-80">based on your resume</span>
        </p>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 shrink-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800 pt-4 sm:pt-0 w-full sm:w-auto">
        <Badge variant="outline" className="px-3 py-1 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900 text-teal-700 dark:text-teal-400 font-bold text-sm inline-flex items-center shadow-sm">
          {job.matchScore}% Match
        </Badge>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-zinc-400 hover:text-teal-600 dark:text-zinc-500 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/50"
          onClick={(e) => {
            e.stopPropagation();
            // Handle save action
          }}
        >
          <Bookmark className="h-5 w-5" />
          <span className="sr-only">Save Job</span>
        </Button>
      </div>
    </div>
  );
}
