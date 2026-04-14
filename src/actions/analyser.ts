"use server"

import { GoogleGenAI } from "@google/genai";
import { CanvasFactory } from "pdf-parse/worker"
import { PDFParse } from "pdf-parse";
import { db } from "@/drizzle/db";
import { UserResumeTable, UserTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

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

        const parser = new PDFParse({data:buffer, CanvasFactory});
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

        MUST RETURN STRICTLY THIS JSON FORMAT:
        {
            "userReview": {
                "strengths": ["...", "..."],
                "weaknesses": ["...", "..."],
                "summary": "..."
            },
            "matchData": {
                "coreSkills": ["...", "..."],
                "yearsOfExperience": 0,
                "primaryJobTitles": ["...", "..."]
            }
        }
        `;

        const resumeResponse = await ai.models.generateContent({
            // Let's also upgrade to 3.1-flash for better JSON adherence
            model: "gemini-3-flash-preview", 
            contents: prompt, 
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: {
                    type: "object",
                    properties: {
                        userReview: {
                            type: "object",
                            properties: {
                                strengths: { type: "array", items: { type: "string" } },
                                weaknesses: { type: "array", items: { type: "string" } },
                                summary: { type: "string" }
                            },
                            required: ["strengths", "weaknesses", "summary"]
                        },
                        matchData: {
                            type: "object",
                            properties: {
                                coreSkills: { type: "array", items: { type: "string" } },
                                yearsOfExperience: { type: "integer" },
                                primaryJobTitles: { type: "array", items: { type: "string" } }
                            },
                            required: ["coreSkills", "yearsOfExperience", "primaryJobTitles"]
                        }
                    },
                    required: ["userReview", "matchData"]
                }
            },
        });
    
        if(!resumeResponse.text) {
            throw new Error("Failed to generate response from AI");
        }

        console.log("=== RAW GEMINI JSON ===");
        console.log(resumeResponse.text);
        console.log("=======================");

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


