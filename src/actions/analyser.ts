"use server"

import { GoogleGenAI } from "@google/genai";
import {PDFParse} from "pdf-parse";
import { db } from "@/drizzle/db";
import { UserResumeTable, UserTable } from "@/drizzle/schema";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const resumeSchema = z.object({
    userReview: z.object({
        strengths: z.array(z.string()).describe("Strengths of the resume of the user"),
        weaknesses: z.array(z.string()).describe("Weaknesses/Areas of improvement in the user's resume."),
        summary: z.string().describe("Summary of the user's resume."),
    }),
    matchData: z.object({
        coreSkills: z.array(z.string()).describe("Core skills of the user"),
        yearsOfExperience: z.number().describe("Total years of experience of the user"),
        primaryJobTitles: z.array(z.string()).describe("Primary job titles of the user"),
    })
});

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function analyseResume(formData: FormData) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            throw new Error("Unauthorized: You must be logged in to upload a resume.");
        }

        const userRecord = await db.select({id: UserTable.id})
            .from(UserTable)
            .where(eq(UserTable.clerkId, clerkId))
            .limit(1);

        const internalUserId = userRecord[0].id;
        if (!internalUserId) {
            throw new Error("User record not found in database.");
        }
    

        const file = formData.get("resume") as File;
        if(!file) {
            throw new Error("No file provided");
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const parser = new PDFParse({data:buffer});
        const rawText = await parser.getText();

        await parser.destroy();

        const result = rawText.text

        const prompt: string = `
        You are an elite Technical Recruiter and Senior Engineering Manager evaluating a candidate's resume for an automated ATS (Applicant Tracking System).
        Your objective is to conduct a deep, constructive analysis of the provided resume text and extract precise data for our backend matching algorithm.

        CRITICAL INSTRUCTIONS FOR DATA EXTRACTION:
        1. Years of Experience: Calculate the total 'yearsOfExperience' strictly based on professional work history dates. If the resume is purely academic or lacks dates, default to 0. Do not inflate experience.
        2. Core Skills: Extract ONLY tangible, hard technical skills (e.g., Python, React, AWS, Docker). Completely ignore soft skills like "leadership", "teamwork", or "communication".
        3. Job Titles: Extract and standardize the candidate's primary roles (e.g., map "SDE Intern" to "Software Engineering Intern", or "Front End Web Dev" to "Frontend Developer").
        
        CRITICAL INSTRUCTIONS FOR USER REVIEW:
        1. Strengths: Highlight specific impressive achievements, quantified metrics (e.g., "Increased speed by 20%"), or advanced technologies utilized.
        2. Weaknesses/Improvements: Identify missing industry standards (like lack of testing frameworks), missing quantifiable impact, or poor clarity. Be highly constructive but brutally honest.
        3. Summary: Provide a highly professional, 2-sentence summary of the candidate's market readiness and overall profile.

        RESUME TEXT TO ANALYZE:
        ${result}
        `;

        const resumeResponse = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt, 
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(resumeSchema as any) as any,
            },
        });
    
        if(!resumeResponse.text) {
            throw new Error("Failed to generate response from AI");
        }

        const response = JSON.parse(resumeResponse.text);
    
        await db.insert(UserResumeTable).values({
            userId: internalUserId, 
            aiSummary: response.userReview.summary, 
            reviewData: response.userReview, 
            matchData: response.matchData,   
        }).onConflictDoUpdate({
            target: UserResumeTable.userId, 
            set: {
                aiSummary: response.userReview.summary,
                reviewData: response.userReview,
                matchData: response.matchData,
                updatedAt: new Date(), 
            }
        });

        return {success: true, data: response.userReview};
    } catch (error) {
        console.log("Resume Processing error: ", error);
        return{
            success: false,
            error: "Failed to process resume. Please try again."
        }
    }
}


