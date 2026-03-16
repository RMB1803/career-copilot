"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpForm() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white dark:bg-zinc-950">
      
      {/* Left Column - Clerk Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[400px] flex flex-col justify-center items-center">
          
          <div className="mb-6 w-full text-center lg:text-left">
            <h2 className="text-xl font-bold tracking-tight text-teal-600 dark:text-teal-400 font-serif">
              Career Copilot
            </h2>
          </div>

          <SignUp 
            fallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-xl",
                headerTitle: "text-2xl font-bold text-zinc-900 dark:text-zinc-50",
                headerSubtitle: "text-zinc-500 dark:text-zinc-400",
                socialButtonsBlockButton: "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 h-11 rounded-xl",
                dividerLine: "bg-zinc-200 dark:bg-zinc-800",
                dividerText: "text-zinc-400",
                formFieldLabel: "text-zinc-700 dark:text-zinc-300 font-semibold",
                formFieldInput: "h-11 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-teal-500 rounded-xl",
                formButtonPrimary: "h-11 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-bold rounded-xl",
                footerActionText: "text-zinc-600 dark:text-zinc-400",
                footerActionLink: "text-zinc-900 dark:text-white font-semibold hover:opacity-80"
              }
            }}
          />

        </div>
      </div>

      {/* Right Column - Marketing Illustration */}
      <div className="hidden lg:flex flex-col justify-center relative bg-white dark:bg-zinc-950 px-12 xl:px-24 border-l border-zinc-200 dark:border-zinc-800">
        <div className="relative w-full aspect-square max-w-[600px] mx-auto mb-12 flex items-center justify-center">
           <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2 opacity-80 pointer-events-none">
             <div className="col-span-2 row-span-2 bg-pink-400 rounded-tl-full rounded-r-none rounded-b-none" />
             <div className="bg-blue-600 rounded-bl-full relative"><div className="absolute inset-2 border-4 border-white dark:border-zinc-950 rounded-full" /></div>
             <div className="bg-green-600" />
             <div className="col-start-4 row-start-2 row-span-2 bg-yellow-400 rounded-l-full relative overflow-hidden flex items-center justify-center">
               <div className="w-16 h-16 bg-pink-400 rounded-full" />
             </div>
             <div className="col-start-2 row-start-3 bg-red-500 flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-yellow-400" /></div>
             <div className="col-start-3 row-start-3 bg-blue-600 rounded-tr-full" />
             <div className="col-start-1 row-start-4 bg-teal-500 rounded-tr-[40px] rounded-bl-[40px]" />
           </div>
        </div>
        
        <div className="max-w-[400px] mx-auto text-center relative z-10">
          <h2 className="text-4xl xl:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-4">
            Find the job made for you.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Discover opportunities from top companies and fast-growing startups.
          </p>
        </div>
      </div>
      
    </div>
  );
}