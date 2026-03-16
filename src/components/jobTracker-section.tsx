"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Briefcase, MousePointer2 } from "lucide-react";

export function JobTrackerSection() {
  return (
    <section className="w-full bg-zinc-50/50 dark:bg-zinc-900/10 py-16 md:py-24 overflow-hidden border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Visual Preview Mockup */}
          <div className="w-full max-w-[600px] mx-auto lg:max-w-none relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Decorative background element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-tl from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 rounded-[3rem] -z-10 blur-xl opacity-70" />
              
              <Card className="rounded-[2rem] bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-sm relative">
                
                {/* Mock Browser Header */}
                <div className="bg-white/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between backdrop-blur-md">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  </div>
                  <div className="w-1/2 h-6 bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center text-[10px] text-zinc-400">
                    careercopilot.com/tracker
                  </div>
                  <div className="w-5 h-5 rounded bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-sm bg-teal-500" />
                  </div>
                </div>

                {/* Mock UI Dashboard Body */}
                <div className="p-6 h-[420px] bg-zinc-50/50 dark:bg-zinc-950/80 flex flex-col gap-6">
                  
                  {/* Dashboard Header Mock */}
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-lg text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      My Job Tracker
                      <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400 hover:bg-teal-100 border-0 rounded-full px-2 py-0 text-[10px]">9 Active</Badge>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-16 h-6 rounded-md bg-zinc-200 dark:bg-zinc-800" />
                       <div className="w-20 h-6 rounded-md bg-teal-500/20" />
                    </div>
                  </div>

                  {/* Kanban Board Mock Grid */}
                  <div className="grid grid-cols-3 gap-4 flex-1 overflow-hidden">
                    
                    {/* Column 1: Screen */}
                    <div className="flex flex-col gap-3">
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Screen (3)</div>
                      <div className="space-y-3">
                        {/* Job Card */}
                        <Card className="p-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-3 relative cursor-pointer">
                           <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 justify-center items-center shadow-sm z-10 hidden md:flex">
                             <MousePointer2 className="w-2 h-2 text-zinc-400" />
                           </div>
                           <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-[10px]">d</div>
                           <div className="space-y-1.5 flex-1 pt-0.5">
                             <div className="h-1.5 bg-zinc-800 dark:bg-zinc-200 rounded-full w-full" />
                             <div className="h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full w-2/3" />
                           </div>
                        </Card>
                        {/* Job Card */}
                        <Card className="p-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-3 opacity-80">
                           <div className="w-6 h-6 rounded bg-zinc-900 dark:bg-white flex-shrink-0 flex items-center justify-center text-white dark:text-black font-bold text-[10px]">S</div>
                           <div className="space-y-1.5 flex-1 pt-0.5">
                             <div className="h-1.5 bg-zinc-800 dark:bg-zinc-200 rounded-full w-4/5" />
                             <div className="h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full w-1/2" />
                           </div>
                        </Card>
                      </div>
                    </div>

                    {/* Column 2: Interviewing */}
                    <div className="flex flex-col gap-3">
                      <div className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-500 tracking-wider">Interviewing (4)</div>
                      <div className="space-y-3">
                        {/* Focus Job Card */}
                        <Card className="p-3 bg-white dark:bg-zinc-900 border-teal-200 dark:border-teal-800 shadow-md ring-1 ring-teal-500/10 flex items-start gap-3 relative">
                           <div className="absolute top-0 left-0 w-0.5 h-full bg-teal-500 rounded-l-md" />
                           <div className="w-6 h-6 rounded bg-teal-100 dark:bg-teal-900/50 flex-shrink-0 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-[10px]">F</div>
                           <div className="space-y-1.5 flex-1 pt-0.5">
                             <div className="h-1.5 bg-zinc-800 dark:bg-zinc-200 rounded-full w-full" />
                             <div className="h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full w-3/4" />
                             <div className="h-1.5 bg-yellow-400/80 rounded-full w-1/2 mt-1 -ml-0.5" />
                           </div>
                        </Card>
                        {/* Job Card */}
                        <Card className="p-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-3 opacity-80">
                           <div className="w-6 h-6 rounded bg-indigo-100 dark:bg-indigo-900/30 flex-shrink-0 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-[10px]">C</div>
                           <div className="space-y-1.5 flex-1 pt-0.5">
                             <div className="h-1.5 bg-zinc-800 dark:bg-zinc-200 rounded-full w-5/6" />
                             <div className="h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full w-1/3" />
                           </div>
                        </Card>
                      </div>
                    </div>

                    {/* Column 3: Offer */}
                    <div className="flex flex-col gap-3">
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Offer (1)</div>
                      <div className="space-y-3">
                        <Card className="p-3 bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800 shadow-sm flex items-start gap-3">
                           <div className="w-6 h-6 rounded bg-green-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px]">✓</div>
                           <div className="space-y-1.5 flex-1 pt-0.5">
                             <div className="h-1.5 bg-zinc-800 dark:bg-zinc-200 rounded-full w-full" />
                             <div className="h-1.5 bg-green-400 rounded-full w-2/3 mt-1" />
                           </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Analytics Card Overlay */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute bottom-6 left-6"
                >
                  <Card className="p-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-xl w-48 hidden sm:block">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Your Job Search Summarized</div>
                    
                    {/* Mock sankey/flow chart using SVG paths */}
                    <div className="h-16 w-full relative pt-2">
                       <svg viewBox="0 0 100 50" className="w-full h-full text-zinc-200 dark:text-zinc-800" preserveAspectRatio="none">
                         <path d="M0,10 C30,10 50,40 100,40" fill="none" stroke="currentColor" strokeWidth="15" strokeOpacity="0.5" strokeLinecap="round" />
                         <path d="M0,35 C40,35 60,10 100,10" fill="none" className="text-teal-500" stroke="currentColor" strokeWidth="8" strokeOpacity="0.8" strokeLinecap="round" />
                       </svg>
                       <div className="absolute bottom-0 text-[8px] font-medium text-zinc-400 w-full flex justify-between">
                         <span>Applications</span>
                         <span>Interviews</span>
                       </div>
                    </div>
                  </Card>
                </motion.div>

              </Card>
            </motion.div>
          </div>

          {/* Right Side: Copy & CTA */}
          <div className="flex flex-col items-start text-left space-y-8 order-1 lg:order-2">
            <Badge variant="outline" className="rounded-full px-3 py-1 flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300">
              <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-sm font-medium">Job Tracker</span>
            </Badge>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Bookmark jobs and track your search
            </h3>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium max-w-lg">
              Goodbye spreadsheets. Bookmark job postings from multiple job boards and manage your applications within a single organized dashboard.
            </p>
            
            <Button size="lg" className="rounded-full h-12 px-8 text-base font-semibold bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 border-0">
              Track Your Applications
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
