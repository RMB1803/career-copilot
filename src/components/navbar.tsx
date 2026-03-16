"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function Navbar() {

  const {setTheme, theme} = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            {/* Minimal Logo Graphic */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-teal-500"
            >
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
              <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Career Copilot
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-10 w-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="outline" className="rounded-full px-7 font-medium border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                Log In
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="rounded-full px-7 bg-teal-500 hover:bg-teal-600 text-white font-medium border-0 shadow-sm shadow-teal-500/20">
                Join Now
              </Button>
            </Link>
          </div>
          <div className="sm:hidden flex items-center gap-2">
            <Button size="sm" className="rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium border-0">
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
