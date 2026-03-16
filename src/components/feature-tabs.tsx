"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, FileText, Sparkles, Target } from "lucide-react";

export function FeatureTabs() {
  return (
    <section className="w-full bg-zinc-50 dark:bg-zinc-950 py-20 px-4 border-y border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        
        <div className="text-center max-w-2xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Everything you need in one place
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Stop juggling multiple tools. Career Copilot brings your resumes, applications, and preparation into a single intelligent platform.
          </p>
        </div>

        <div className="w-full max-w-5xl">
          <Tabs defaultValue="matcher" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-zinc-200 dark:border-zinc-800 p-1 bg-opacity-50 shadow-sm rounded-full h-auto">
                <TabsTrigger 
                  value="matcher" 
                  className="rounded-full px-6 py-2.5 text-zinc-600 dark:text-zinc-400 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/40 dark:data-[state=active]:text-teal-300 data-[state=active]:shadow-none transition-all"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Resume Matcher
                </TabsTrigger>
                <TabsTrigger 
                  value="tracker" 
                  className="rounded-full px-6 py-2.5 text-zinc-600 dark:text-zinc-400 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/40 dark:data-[state=active]:text-teal-300 data-[state=active]:shadow-none transition-all"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Application Tracker
                </TabsTrigger>
                <TabsTrigger 
                  value="prep" 
                  className="rounded-full px-6 py-2.5 text-zinc-600 dark:text-zinc-400 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/40 dark:data-[state=active]:text-teal-300 data-[state=active]:shadow-none transition-all"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Interview Prep
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB: Resume Matcher */}
            <TabsContent value="matcher" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                <div className="order-2 md:order-1 space-y-6">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Score and optimize your resume instantly.</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Upload your resume and paste a job description. Our AI analyzes the match, highlighting missing keywords and suggesting tailored improvements to bypass ATS filters.
                  </p>
                  <ul className="space-y-3">
                    {["Detailed keyword analysis", "Action verb suggestions", "Formatting checks"].map((item, i) => (
                      <li key={i} className="flex items-center text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Button className="rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                      Try Matcher
                    </Button>
                  </div>
                </div>
                
                <div className="order-1 md:order-2">
                  <Card className="p-6 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-inner rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">Senior React Developer</div>
                      <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800">
                        92% Match
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-zinc-600 dark:text-zinc-400">Technical Skills</span>
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">95%</span>
                        </div>
                        <Progress value={95} className="h-2 bg-zinc-200 dark:bg-zinc-800" indicatorColor="bg-teal-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-zinc-600 dark:text-zinc-400">Experience Map</span>
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">88%</span>
                        </div>
                        <Progress value={88} className="h-2 bg-zinc-200 dark:bg-zinc-800" indicatorColor="bg-teal-500" />
                      </div>
                    </div>

                    <Separator className="my-6 bg-zinc-200 dark:bg-zinc-800" />
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-zinc-900 dark:text-zinc-100">AI Suggestions</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-3 text-zinc-600 dark:text-zinc-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                          <p>Missing keyword <span className="font-medium text-zinc-900 dark:text-zinc-200">"GraphQL"</span>. Consider adding it to your Recent Experience.</p>
                        </div>
                        <div className="flex gap-3 text-zinc-600 dark:text-zinc-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                          <p>Strong match on <span className="font-medium text-zinc-900 dark:text-zinc-200">"TypeScript"</span> and <span className="font-medium text-zinc-900 dark:text-zinc-200">"Next.js"</span>.</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* TAB: Application Tracker */}
            <TabsContent value="tracker" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                <div className="order-2 md:order-1 space-y-6">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Never lose track of an application.</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Organize your job hunt with our visual Kanban board. Save jobs from anywhere, track interview stages, and keep all your notes and hiring manager contacts in one secure dashboard.
                  </p>
                  <ul className="space-y-3">
                    {["Visual pipeline management", "Automated status updates", "Integrated notes & contacts"].map((item, i) => (
                      <li key={i} className="flex items-center text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Button className="rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                      View Tracker
                    </Button>
                  </div>
                </div>
                
                <div className="order-1 md:order-2">
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Mock Kanban Column 1 */}
                    <div className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 px-1">Applied (2)</div>
                      <div className="space-y-3">
                        <Card className="p-3 shadow-sm border-zinc-200 dark:border-zinc-800">
                          <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">Stripe</div>
                          <div className="text-xs text-zinc-500 mt-1">Frontend Engineer</div>
                          <div className="mt-3 text-[10px] text-zinc-400">Applied 2 days ago</div>
                        </Card>
                        <Card className="p-3 shadow-sm border-zinc-200 dark:border-zinc-800">
                          <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">Spotify</div>
                          <div className="text-xs text-zinc-500 mt-1">Web Developer</div>
                          <div className="mt-3 text-[10px] text-zinc-400">Applied 4 days ago</div>
                        </Card>
                      </div>
                    </div>

                    {/* Mock Kanban Column 2 */}
                    <div className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 px-1">Interviewing (1)</div>
                      <div className="space-y-3">
                        <Card className="p-3 shadow-sm border-teal-200 dark:border-teal-900/50 relative overflow-hidden ring-1 ring-teal-500/20">
                          <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
                          <div className="flex justify-between items-start">
                            <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">Netflix</div>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100">HM Round</Badge>
                          </div>
                          <div className="text-xs text-zinc-500 mt-1">UI Engineer</div>
                          <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400">
                            <span>Tomorrow, 2:00 PM</span>
                          </div>
                        </Card>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB: Interview Prep */}
            <TabsContent value="prep" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                <div className="order-2 md:order-1 space-y-6">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Nail the interview with AI mock sessions.</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Practice answering questions specific to the company and role you are applying for. Receive instant, actionable feedback on your clarity, phrasing, and technical accuracy.
                  </p>
                  <ul className="space-y-3">
                    {["Role-specific question generation", "Real-time speech feedback", "STAR method validation"].map((item, i) => (
                      <li key={i} className="flex items-center text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Button className="rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                      Start Prep Session
                    </Button>
                  </div>
                </div>
                
                <div className="order-1 md:order-2">
                  <Card className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-inner rounded-2xl overflow-hidden flex flex-col h-[320px]">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">AI Interview Coach</div>
                        <div className="text-[10px] text-zinc-500">Feedback Session</div>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 space-y-4">
                      {/* User Message */}
                      <div className="flex justify-end">
                        <div className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm p-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                          "...and that's when I decided to rewrite the data fetching layer to use React Query, which solved our caching issues."
                        </div>
                      </div>
                      
                      {/* AI Response */}
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm p-3 rounded-2xl rounded-tl-sm max-w-[90%] space-y-2">
                          <p className="font-medium text-teal-600 dark:text-teal-400">Great use of the STAR method!</p>
                          <p className="text-zinc-600 dark:text-zinc-400 leading-snug">
                            You clearly defined the <span className="font-medium text-zinc-900 dark:text-zinc-200">Situation</span> (caching issues) and your <span className="font-medium text-zinc-900 dark:text-zinc-200">Action</span> (rewriting with React Query).
                          </p>
                          <div className="bg-orange-50 dark:bg-orange-950/30 text-orange-800 dark:text-orange-400 p-2 rounded-lg text-xs border border-orange-100 dark:border-orange-900/50 mt-2">
                            <span className="font-semibold block mb-0.5">Tip for improvement:</span>
                            Don't forget the Result! Try quantifying the impact: "This reduced load times by 40% and eliminated 5 support tickets."
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </section>
  );
}
