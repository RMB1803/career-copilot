import type { Metadata } from 'next';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Dashboard | Career Copilot',
  description: 'AI-powered career dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
          <div className="font-bold text-lg flex items-center tracking-tight">
            <span className="text-teal-600 mr-1.5 text-2xl font-black">W:</span> Career Copilot
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r-zinc-200 dark:border-r-zinc-800">
              <Sidebar className="flex w-full h-full border-r-0" />
            </SheetContent>
          </Sheet>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8 lg:py-8 bg-zinc-50/50 dark:bg-zinc-950/50 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
