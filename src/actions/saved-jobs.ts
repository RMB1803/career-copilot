"use server";

// Server Action: toggles a job's saved state for the current user.
// If the job is already saved → delete it (unsave).
// If not saved → insert a new row (save).

import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { UserTable, SavedJobsTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function toggleSaveJob(jobId: string) {
  try {
    // ── Step 1: Authenticate ───────────────────────────────────────
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { success: false, error: "Unauthorized" };
    }

    // ── Step 2: Map Clerk ID → internal user ID ────────────────────
    const userRecord = await db
      .select({ id: UserTable.id })
      .from(UserTable)
      .where(eq(UserTable.clerkId, clerkId))
      .limit(1);

    const internalUserId = userRecord[0]?.id;
    if (!internalUserId) {
      return { success: false, error: "User not found" };
    }

    // ── Step 3: Check if the job is already saved ──────────────────
    const existing = await db
      .select({ id: SavedJobsTable.id })
      .from(SavedJobsTable)
      .where(
        and(
          eq(SavedJobsTable.userId, internalUserId),
          eq(SavedJobsTable.jobId, jobId)
        )
      )
      .limit(1);

    // ── Step 4: Toggle ─────────────────────────────────────────────
    if (existing.length > 0) {
      // Already saved → unsave it
      await db
        .delete(SavedJobsTable)
        .where(eq(SavedJobsTable.id, existing[0].id));
      return { success: true, saved: false };
    } else {
      // Not saved → save it (aiMatchScore is nullable, so we omit it)
      await db.insert(SavedJobsTable).values({
        userId: internalUserId,
        jobId,
      });
      return { success: true, saved: true };
    }
  } catch (error) {
    console.error("Toggle save job error:", error);
    return { success: false, error: "Failed to toggle saved job" };
  }
}
