import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Upload, Clock, Sparkles } from 'lucide-react';

export function ProfileCard() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all outline-none">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 sm:h-16 sm:w-16 border bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 shadow-sm ring-4 ring-white dark:ring-zinc-950">
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile avatar" className="object-cover" />
          <AvatarFallback className="bg-zinc-100 text-zinc-900 font-semibold text-lg dark:bg-zinc-800 dark:text-zinc-100">
            RM
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Ram Mohan</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Clock className="w-4 h-4" />
              <span>Profile last updated on Nov 13, 2025</span>
            </div>
            
            <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            
            <div className="flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-2.5 py-0.5 rounded-md border border-teal-100/50 dark:border-teal-900/50 shadow-sm">
              <Sparkles className="w-3 h-3 justify-center mr-1" />
              AI profile optimized
            </div>
          </div>
        </div>
      </div>
      
      <Button className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 rounded-lg shadow-sm transition-all sm:ml-auto group font-medium" size="lg">
        <Upload className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        Upload Resume
      </Button>
    </div>
  );
}
