'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Bookmark, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const currentPath = usePathname() || '/dashboard';
  
  const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
    { name: 'Saved Jobs', href: '/dashboard/saved', icon: Bookmark },
    { name: 'AI Interviewer', href: '/dashboard/interview', icon: Bot },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm z-10",
        className
      )}
      {...props}
    >
      <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <h1 className="font-bold text-lg flex items-center tracking-tight">
          <span className="text-teal-600 mr-1.5 text-2xl font-black">W:</span>
          Career Copilot
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5">
        {navItems.map((item) => {
          const isActive = currentPath === item.href || (item.href !== '/dashboard' && currentPath.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out relative",
                isActive 
                  ? "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 shadow-sm" 
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-r-full" />
              )}
              <Icon 
                className={cn(
                  "mr-3 h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-teal-500" : "text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-300"
                )} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/40 dark:to-teal-900/20 p-4 border border-teal-100/80 dark:border-teal-900/50 shadow-sm">
          <h4 className="text-sm font-semibold text-teal-900 dark:text-teal-100 flex items-center mb-1">
            <Bot size={16} className="mr-1.5 text-teal-600 dark:text-teal-400" />
            PRO Plan
          </h4>
          <p className="text-xs text-teal-700/80 dark:text-teal-300/80 mb-3 leading-relaxed">
            Unlock unlimited AI interviews & powerful career insights.
          </p>
          <button className="w-full text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2.5 transition-all shadow-sm hover:shadow active:scale-[0.98]">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
