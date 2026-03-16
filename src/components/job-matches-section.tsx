"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function JobMatchesSection() {
  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Top Centered Header Area */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            We're here for <br className="hidden sm:inline" />
            <span className="relative whitespace-nowrap inline-block mt-2">
              <span className="relative z-10">every step of your search.</span>
              {/* Hand-drawn style underline matching hero */}
              <svg 
                className="absolute w-[105%] h-4 -bottom-1 left-[-2%] text-teal-400 z-0 opacity-80" 
                viewBox="0 0 300 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path d="M2.5 9.5C40.5 4.5 150.5 -1.5 297.5 7.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-medium">
            Tell us about your career history and goals. We'll help you craft a standout profile and help you land your dream job.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Copy & CTA */}
          <div className="order-2 lg:order-1 flex flex-col items-start text-left space-y-8">
            <Badge variant="outline" className="rounded-full px-3 py-1 flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300">
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-sm font-medium">Job Matches</span>
            </Badge>
            
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Get matched to relevant jobs, personalized to you
            </h3>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Forget endlessly scrolling on job boards. Tell us your preferences and dealbreakers and we'll match you with jobs that fit.
            </p>
            
            <Button size="lg" className="rounded-full h-12 px-8 text-base font-semibold bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 border-0">
              Get Matched Now
            </Button>
          </div>

          {/* Right Side: Visual Preview Mockup */}
          <div className="order-1 lg:order-2 w-full max-w-[550px] mx-auto lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <Card className="rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-100 dark:border-zinc-800/60 overflow-hidden shadow-2xl aspect-square sm:aspect-[4/3] w-full relative">
                
                {/* Background glow specific to the card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] w-[300px] h-[300px] bg-white dark:bg-zinc-800/80 blur-3xl rounded-full point-events-none z-0" />

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  
                  {/* Top area: Floating company logos in an inverted pyramid shape (funnel) */}
                  <div className="h-[55%] relative flex justify-center pt-8">
                    {/* Define an array of mock logo bubbles to render cleanly */}
                    {[
                      // Top row (widest)
                      { x: -140, y: -20, bg: "bg-blue-600", text: "G", delay: 0 },
                      { x: -70, y: 0, bg: "bg-red-500", text: "N", delay: 0.2 },
                      { x: 0, y: -20, bg: "bg-black dark:bg-white text-white dark:text-black", text: "A", delay: 0.4 },
                      { x: 70, y: -5, bg: "bg-sky-500", text: "M", delay: 0.6 },
                      { x: 140, y: -30, bg: "bg-indigo-600", text: "S", delay: 0.8 },
                      // Middle row
                      { x: -90, y: 40, bg: "bg-green-500", text: "S", delay: 0.3 },
                      { x: -20, y: 60, bg: "bg-yellow-500", text: "A", delay: 0.5 },
                      { x: 40, y: 45, bg: "bg-orange-500", text: "H", delay: 0.7 },
                      { x: 100, y: 30, bg: "bg-rose-500", text: "T", delay: 0.9 },
                      // Bottom row (narrowest)
                      { x: -40, y: 100, bg: "bg-teal-500", text: "b", delay: 0.4 },
                      { x: 20, y: 90, bg: "bg-purple-600", text: "L", delay: 0.6 },
                    ].map((bubble, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: bubble.y, x: bubble.x, opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: bubble.delay, 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20 
                        }}
                        className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-2xl md:rounded-[1rem] flex items-center justify-center font-bold text-lg md:text-xl shadow-md border-[3px] border-white dark:border-zinc-800 ${bubble.bg.includes('text-white') ? bubble.bg : `${bubble.bg} text-white`}`}
                      >
                        {bubble.text}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Bottom area: Match Cards */}
                  <div className="space-y-4">
                    <div className="text-center w-full">
                      <span className="text-[10px] uppercase font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">
                        Personalized Job Matches
                      </span>
                    </div>
                    
                    {/* Horizontal scrollable or flex row of mini cards */}
                    <div className="flex gap-4 overflow-x-hidden p-1 -mx-2">
                       {/* Mock Card 1 */}
                       <Card className="min-w-[140px] md:min-w-[170px] bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 p-4 shadow-sm rounded-2xl flex-shrink-0 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-50 dark:bg-zinc-800 flex justify-center items-center rounded-bl-2xl">
                            <span className="text-[10px] font-bold text-zinc-400">98%</span>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 font-bold mb-3 border border-teal-200">
                            S
                          </div>
                          <div className="font-semibold text-xs md:text-sm text-zinc-800 dark:text-zinc-100 leading-tight mb-2">
                            Junior React Developer
                          </div>
                          <div className="space-y-1 mt-auto pt-2">
                             <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-full" />
                             <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-2/3" />
                          </div>
                       </Card>

                       {/* Mock Card 2 */}
                       <Card className="min-w-[140px] md:min-w-[170px] bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 p-4 shadow-sm rounded-2xl flex-shrink-0 relative overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 font-bold mb-3 border border-orange-200">
                            Y
                          </div>
                          <div className="font-semibold text-xs md:text-sm text-zinc-800 dark:text-zinc-100 leading-tight mb-2">
                            New Grad Product Management
                          </div>
                          <div className="space-y-1 mt-auto pt-2">
                             <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-4/5" />
                             <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-1/2" />
                          </div>
                       </Card>
                       
                       {/* Mock Card 3 (partially visible to imply feed) */}
                       <Card className="min-w-[140px] md:min-w-[170px] bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 p-4 shadow-sm rounded-2xl flex-shrink-0 relative overflow-hidden opacity-50">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold mb-3 border border-blue-200">
                            M
                          </div>
                          <div className="font-semibold text-xs md:text-sm text-zinc-800 dark:text-zinc-100 leading-tight mb-2">
                            Internship Frontend Engineer
                          </div>
                          <div className="space-y-1 mt-auto pt-2">
                             <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-full" />
                             <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-3/4" />
                          </div>
                       </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
