import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Building, Sparkles, Wand2 } from 'lucide-react';
import { Job } from './job-card';

export interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-md md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden gap-0 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl">
        <DialogHeader className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {job.title}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <span className="flex items-center"><Building className="mr-1.5 h-4 w-4" />{job.company}</span>
            <span className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg"><MapPin className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />{job.location}</span>
            <span className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg"><Briefcase className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />{job.type}</span>
            <span className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg">{job.experience}</span>
          </div>
          <DialogDescription className="mt-5 inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-medium px-4 py-2 rounded-xl border border-teal-200/60 dark:border-teal-900/80 shadow-sm w-fit">
            <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <span>AI Match Score: <strong className="text-teal-900 dark:text-teal-100">{job.matchScore}%</strong> based on your profile alignment.</span>
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] md:max-h-[55vh] overflow-y-auto p-6 sm:p-8 text-zinc-700 dark:text-zinc-300 prose prose-zinc prose-sm sm:prose-base dark:prose-invert max-w-none">
          {job.description ? (
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2">About the Role</h4>
                <p className="leading-relaxed">We are looking for an exceptional {job.title} to join our growing team at {job.company}. You will be responsible for building scalable systems and contributing to high-impact products utilized by hundreds of thousands of users worldwide.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2">Responsibilities</h4>
                <ul className="list-disc pl-5 space-y-1.5 marker:text-zinc-400">
                  <li>Design, develop, and maintain robust software solutions.</li>
                  <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                  <li>Ensure the performance, quality, and responsiveness of applications.</li>
                  <li>Identify and correct bottlenecks and fix bugs.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2">Requirements</h4>
                <ul className="list-disc pl-5 space-y-1.5 marker:text-zinc-400">
                  <li>Proven experience working as a {job.title} or similar role in a fast-paced environment.</li>
                  <li>Strong understanding of software engineering best practices and architectural patterns.</li>
                  <li>Excellent problem-solving, debugging, and communication skills.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-4 sm:p-6 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 flex-1 order-2 sm:order-1">
            <Button variant="outline" className="w-full sm:w-auto border-teal-200 dark:border-teal-900/50 hover:bg-teal-50 dark:hover:bg-teal-950/30 text-teal-800 dark:text-teal-300 font-semibold shadow-sm transition-all whitespace-nowrap">
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Cover Letter
            </Button>
            <Button variant="outline" className="w-full sm:w-auto border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-semibold shadow-sm transition-all whitespace-nowrap">
              Suggest Resume Changes
            </Button>
          </div>
          <Button className="w-full sm:w-auto px-8 py-6 sm:py-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-bold shadow-md transition-transform active:scale-[0.98] shrink-0 order-1 sm:order-2 text-base sm:text-sm rounded-xl sm:rounded-lg" size="lg">
            Apply Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
