"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-zinc-900 min-h-[calc(100vh-5rem)] flex items-center pt-12 pb-24">
      <div className="mx-auto max-w-7xl w-full px-4 relative flex flex-col items-center text-center">
        
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-500/5 dark:bg-teal-500/10 blur-[100px] rounded-full point-events-none -z-10" />

        {/* Floating Card: Left Top */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block absolute left-4 xl:left-12 top-10 z-10"
        >
          <Card className="w-64 p-4 shadow-xl border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-2xl">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-3 text-left">Resume Matching</div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-[3px] border-teal-500/20 border-t-teal-500 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-sm">
                92%
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full w-full" />
                <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full w-2/3" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Floating Card: Left Bottom */}
        <motion.div
          initial={{ opacity: 0, x: -40, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block absolute left-12 xl:left-24 top-60 z-10"
        >
          <Card className="w-72 p-5 shadow-lg border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-2xl">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-3 text-left">Company Perks</div>
            <div className="space-y-3">
              <div className="h-2 bg-teal-100 dark:bg-teal-900/50 rounded-full w-3/4" />
              <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full w-full" />
              <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full w-5/6" />
            </div>
          </Card>
        </motion.div>

        {/* Floating Card: Right */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block absolute right-4 xl:right-12 top-24 z-10"
        >
          <Card className="w-[340px] shadow-2xl border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-2xl overflow-hidden text-left">
            <div className="h-10 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-4 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="p-6 flex items-center gap-4">
               <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-800 dark:text-zinc-200 font-bold text-xl border border-zinc-200 dark:border-zinc-700">
                 a
               </div>
               <div>
                 <div className="font-semibold text-zinc-900 dark:text-zinc-100">amazon</div>
                 <div className="text-sm text-zinc-500 dark:text-zinc-400">Product Manager</div>
               </div>
               <div className="ml-auto">
                 <div className="bg-teal-50/80 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 text-[10px] uppercase font-bold px-2 py-1 rounded border border-teal-200 dark:border-teal-800 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Applied
                 </div>
               </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl relative z-20 mt-10 md:mt-24"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            Your entire job search. <br className="hidden sm:inline" />
            <span className="relative whitespace-nowrap mt-2 inline-block">
              <span className="relative z-10">Powered by one profile.</span>
              {/* Hand-drawn style underline */}
              <svg 
                className="absolute w-[105%] h-5 -bottom-2 left-[-2%] text-teal-400 z-0" 
                viewBox="0 0 300 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path d="M2.5 9.5C40.5 4.5 150.5 -1.5 297.5 7.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Get personalized job recommendations, craft tailored resumes, and prepare for interviews with AI assistance.
          </p>
          
          <div className="mt-10 flex justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25 border-0">
                Join Now - It's Free
              </Button>
            </Link>
          </div>
          
        </motion.div>
        
        {/* Mobile visual preview (shown only on small screens where floating cards are hidden) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:hidden mt-16 w-full max-w-sm mx-auto z-10"
        >
          <Card className="w-full shadow-2xl border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-2xl overflow-hidden text-left">
             <div className="h-10 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-4 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="p-6 flex items-center gap-4">
               <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-800 dark:text-zinc-200 font-bold text-xl border border-zinc-200 dark:border-zinc-700">
                 a
               </div>
               <div>
                 <div className="font-semibold text-zinc-900 dark:text-zinc-100">amazon</div>
                 <div className="text-sm text-zinc-500 dark:text-zinc-400">Product Manager</div>
               </div>
               <div className="ml-auto">
                 <div className="bg-teal-50/80 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 text-[10px] uppercase font-bold px-2 py-1 rounded border border-teal-200 dark:border-teal-800 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Applied
                 </div>
               </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
