"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Sparkles } from "lucide-react";

export function ResumeBuilderSection() {
  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-16 md:py-24 overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Copy & CTA */}
          <div className="flex flex-col items-start text-left space-y-8">
            <Badge variant="outline" className="rounded-full px-3 py-1 flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300">
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-sm font-medium">AI Resume Builder</span>
            </Badge>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Craft the perfect tailored resume for every job
            </h3>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium max-w-lg">
              Use AI to tailor your resume to fit the job description, see your resume ATS score, and identify missing keywords in a few clicks.
            </p>
            
            <Button size="lg" className="rounded-full h-12 px-8 text-base font-semibold bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 border-0">
              Get a Free Resume
            </Button>
          </div>

          {/* Right Side: Visual Preview Mockup */}
          <div className="w-full max-w-[600px] mx-auto lg:max-w-none relative">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Decorative background element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-tr from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 rounded-[3rem] -z-10 blur-xl opacity-70" />
              
              <Card className="rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-sm">
                
                {/* Mock Browser Header */}
                <div className="bg-white/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center gap-2 backdrop-blur-md">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  </div>
                  <div className="mx-auto text-xs font-medium text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                    <FileText className="w-3 h-3" />
                    Tailor Resumes
                  </div>
                </div>

                {/* Mock UI Body */}
                <div className="p-6 md:p-8 grid grid-cols-2 gap-6 h-[400px]">
                  
                  {/* Mock Resume Input / Left Panel */}
                  <div className="flex flex-col gap-6">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center border border-red-100 dark:border-red-900/50">
                           <span className="text-red-500 font-bold font-serif text-xl border-l-2 border-r-2 border-t-2 border-red-500 px-1 rounded-sm leading-none h-6 flex items-center">A</span>
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">airbnb</div>
                          <div className="text-xs text-zinc-500">Software Engineer</div>
                        </div>
                     </div>

                     <div className="space-y-4 pt-4 flex-1">
                        <div className="space-y-2">
                           <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-3/4" />
                           <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full" />
                        </div>
                        <div className="space-y-2">
                           <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full" />
                           <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-5/6" />
                           <div className="h-2.5 bg-teal-100 dark:bg-teal-900/40 rounded-full w-2/3" />
                        </div>
                        <div className="space-y-2">
                           <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full" />
                           <div className="h-2.5 bg-teal-100 dark:bg-teal-900/40 rounded-full w-4/5" />
                        </div>
                     </div>
                  </div>

                  {/* Mock Optimization / Right Panel */}
                  <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm flex flex-col relative overflow-hidden">
                    
                    {/* Floating Match Badge */}
                    <div className="absolute top-4 left-4 right-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 flex items-center justify-between shadow-sm z-10">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-500" />
                        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Keyword Match</span>
                      </div>
                      <Badge className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                         Tailored
                      </Badge>
                    </div>

                    {/* Resume Document Mock */}
                    <div className="mt-16 flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-lg p-4 space-y-6 overflow-hidden">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                         <div className="space-y-1.5 flex-1">
                           <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full w-1/3" />
                           <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-1/4" />
                         </div>
                       </div>
                       
                       <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                       <div className="space-y-3">
                          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full w-1/4 mb-4" />
                          <div className="space-y-2">
                            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full" />
                            <div className="flex gap-1.5">
                              <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-1/4" />
                              <div className="h-1.5 bg-teal-400 rounded-full w-1/5" />
                              <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-1/3" />
                            </div>
                            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-2/3" />
                          </div>
                          
                          <div className="space-y-2 pt-2">
                            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full" />
                            <div className="flex gap-1.5">
                              <div className="h-1.5 bg-teal-400 rounded-full w-1/4" />
                              <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-1/2" />
                            </div>
                          </div>
                       </div>
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
