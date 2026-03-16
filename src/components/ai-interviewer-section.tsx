"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Mic, PhoneOff, Settings, CheckCircle2, Sparkles, User, Video } from "lucide-react";

export function AIInterviewerSection() {
  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-16 md:py-24 overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Copy & CTA */}
          <div className="flex flex-col items-start text-left space-y-8">
            <Badge variant="outline" className="rounded-full px-3 py-1 flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300">
              <Mic className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-sm font-medium">AI Voice Interviewer</span>
            </Badge>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Practice real interviews with an AI interviewer
            </h3>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium max-w-lg">
              Simulate real interview conversations with our AI interviewer. Answer questions using your voice, receive instant feedback on clarity and structure, and get a detailed review of your performance after the interview.
            </p>

            <ul className="space-y-3 mt-2">
              {[
                "Real-time interview questions",
                "Instant answer feedback",
                "Post-interview performance review"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
            <Button size="lg" className="rounded-full h-12 px-8 text-base font-semibold bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 border-0 mt-4">
              Start Mock Interview
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
              
              <Card className="rounded-[2rem] bg-zinc-950 dark:bg-zinc-900 border-zinc-800 dark:border-zinc-700 shadow-2xl overflow-hidden backdrop-blur-sm relative min-h-[420px] p-4 flex flex-col">
                
                {/* Main Video Area (AI Interviewer) */}
                <div className="bg-zinc-900 dark:bg-zinc-950 rounded-xl flex-1 relative overflow-hidden border border-zinc-800 flex items-center justify-center">
                   
                   {/* Center AI Avatar */}
                   <div className="relative z-10 flex flex-col items-center">
                     <div className="w-24 h-24 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center mb-4 relative">
                        <Sparkles className="w-10 h-10 text-indigo-400" />
                        {/* Mock pulsing rings */}
                        <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute -inset-4 rounded-full border border-indigo-500/20 animate-ping opacity-10" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                     </div>
                     <span className="text-zinc-200 font-medium tracking-wide">AI Recruiter</span>
                   </div>

                   {/* AI Badge Overlay */}
                   <div className="absolute top-4 left-4 z-20">
                     <Badge className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 backdrop-blur-md gap-1.5 px-2.5 py-1">
                       <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                       </span>
                       AI Interviewer
                     </Badge>
                   </div>

                   {/* Self-View Picture in Picture */}
                   <div className="absolute bottom-4 right-4 w-32 h-44 bg-zinc-800 dark:bg-zinc-800 border-2 border-zinc-700/50 rounded-xl overflow-hidden z-20 shadow-lg flex items-center justify-center">
                      <User className="w-12 h-12 text-zinc-600 dark:text-zinc-500" />
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <span className="text-[10px] text-white font-medium bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">You</span>
                        <div className="w-5 h-5 rounded bg-black/40 flex items-center justify-center backdrop-blur-sm">
                           <Mic className="w-3 h-3 text-white" />
                        </div>
                      </div>
                   </div>

                   {/* Live Transcript & Feedback Overlay */}
                   <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     whileInView={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.5, duration: 0.5 }}
                     className="absolute bottom-4 left-4 right-40 z-20"
                   >
                      <Card className="bg-black/60 dark:bg-black/70 border-zinc-700/50 backdrop-blur-md p-4 rounded-xl shadow-2xl">
                         <div className="flex gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5" />
                            <p className="text-sm font-medium text-white leading-relaxed">
                               "Can you describe a time when you had to lead a project with tight deadlines? How did you manage the team's workload?"
                            </p>
                         </div>
                         <Separator className="bg-zinc-700/50 my-3" />
                         <div className="flex flex-col gap-2">
                           <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Live Analysis</span>
                              <span className="text-xs font-semibold text-teal-400">Pacing: Good</span>
                           </div>
                           <div className="text-xs text-zinc-300">
                              <span className="text-yellow-400 font-medium mr-1">Tip:</span> 
                              Try to format your answer using the STAR method (Situation, Task, Action, Result).
                           </div>
                         </div>
                      </Card>
                   </motion.div>
                </div>

                {/* Call Controls */}
                <div className="h-20 w-full flex items-center justify-center gap-4 mt-2">
                   <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white">
                     <Mic className="w-5 h-5" />
                   </Button>
                   <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white">
                     <Video className="w-5 h-5" />
                   </Button>
                   <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white">
                     <Settings className="w-5 h-5" />
                   </Button>
                   <Button size="icon" className="w-16 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg border-0 shadow-red-500/20 ml-2">
                     <PhoneOff className="w-5 h-5" />
                   </Button>
                </div>

              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
