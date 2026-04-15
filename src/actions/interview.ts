"use server"

import { db } from "@/drizzle/db";
import { InterviewSessionsTable } from "@/drizzle/schema";
import { UserTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function startInterviewSession(jobId?: string) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) throw new Error("Unauthorized");

        const userRecord = await db.select({ id: UserTable.id })
            .from(UserTable)
            .where(eq(UserTable.clerkId, clerkId))
            .limit(1);

        const internalUserId = userRecord[0]?.id;
        if (!internalUserId) throw new Error("User record not found.");

        // Insert the blank session to generate our UUID
        const [session] = await db.insert(InterviewSessionsTable).values({
            userId: internalUserId,
            // If they are practicing for a specific saved/scraped job, pass it. Otherwise null.
            jobId: jobId || null, 
        }).returning({ id: InterviewSessionsTable.id });

        return { success: true, sessionId: session.id };
    } catch (error) {
        console.error("Error starting interview session:", error);
        return { success: false, error: "Failed to initialize interview session." };
    }
}