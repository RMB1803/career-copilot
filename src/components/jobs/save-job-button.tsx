"use client";

// A small, focused Client Component just for the bookmark button.
// This keeps the parent JobCard as a Server Component-friendly piece
// while adding interactivity only where needed.

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { toggleSaveJob } from "@/actions/saved-jobs";

interface SaveJobButtonProps {
  jobId: string;
  initialIsSaved?: boolean;
}

export function SaveJobButton({ jobId, initialIsSaved = false }: SaveJobButtonProps) {
  // Local state for optimistic UI — immediately reflects the toggle
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  // useTransition tracks the async server action without blocking the UI
  const [isPending, startTransition] = useTransition();

  function handleClick(e: React.MouseEvent) {
    // Prevent the card's onClick from firing when clicking the bookmark
    e.stopPropagation();

    // Optimistic update: flip the icon immediately for snappy UX
    setIsSaved((prev) => !prev);

    startTransition(async () => {
      const result = await toggleSaveJob(jobId);

      // If the server action failed, revert the optimistic update
      if (!result.success) {
        setIsSaved((prev) => !prev);
        console.error("Failed to toggle save:", result.error);
      }
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={handleClick}
      className="text-zinc-400 hover:text-teal-600 dark:text-zinc-500 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/50"
    >
      <Bookmark
        className={`h-5 w-5 transition-colors ${
          isSaved ? "fill-teal-500 text-teal-500 dark:fill-teal-400 dark:text-teal-400" : ""
        }`}
      />
      <span className="sr-only">{isSaved ? "Unsave Job" : "Save Job"}</span>
    </Button>
  );
}
