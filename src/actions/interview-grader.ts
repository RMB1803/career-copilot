"use server"

import { db } from "@/drizzle/db";
import { InterviewQnATable } from "@/drizzle/schema";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeInterview(sessionId: string, transcript: {role: string, text: string}[]) {
    try {
        if (!transcript || transcript.length === 0) {
            throw new Error("Transcript is empty");
        }

        // 1. Format the raw WebRTC transcript into a readable script for Gemini
        const formattedTranscript = transcript.map(t => `${t.role.toUpperCase()}: ${t.text}`).join("\n\n");

        // 2. Call Gemini with a structured JSON schema.
        //    Instead of asking for a single "aiFeedback" string, we now ask for
        //    a structured object with score, expectedAnswer, strengths, and weaknesses.
        //    This makes the frontend rendering clean and predictable.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an elite Staff Software Engineer and Technical Recruiter. 
            Analyze the following mock interview transcript. 
            Extract each distinct question asked by the interviewer and the candidate's answer.
            Grade the candidate's answer strictly but constructively. 
            
            For each question, provide:
            - A score out of 10 (be fair but strict)
            - The ideal/expected answer (concise but complete)
            - A list of specific strengths in the candidate's answer
            - A list of specific areas for improvement
            
            TRANSCRIPT:
            ${formattedTranscript}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        qnaPairs: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING, description: "The exact question asked by the AI" },
                                    answer: { type: Type.STRING, description: "The candidate's exact answer" },
                                    questionType: { type: Type.STRING, description: "Must be 'Behavioral', 'Technical', or 'Situational'" },
                                    // Structured feedback — each field is explicitly typed
                                    // so Gemini returns clean, parseable data (no markdown blobs).
                                    aiFeedback: {
                                        type: Type.OBJECT,
                                        description: "Structured feedback for the candidate's answer",
                                        properties: {
                                            score: { type: Type.NUMBER, description: "Score out of 10" },
                                            expectedAnswer: { type: Type.STRING, description: "The ideal concise answer a strong candidate would give" },
                                            strengths: {
                                                type: Type.ARRAY,
                                                items: { type: Type.STRING },
                                                description: "List of specific strengths in the candidate's answer"
                                            },
                                            weaknesses: {
                                                type: Type.ARRAY,
                                                items: { type: Type.STRING },
                                                description: "List of specific areas for improvement"
                                            }
                                        },
                                        required: ["score", "expectedAnswer", "strengths", "weaknesses"]
                                    }
                                },
                                required: ["question", "answer", "questionType", "aiFeedback"]
                            }
                        }
                    },
                    required: ["qnaPairs"]
                }
            }
        });

        const jsonText = response.text;
        if (!jsonText) throw new Error("No response from Gemini");

        // Parse the strict JSON response
        const parsedResult = JSON.parse(jsonText);

        // 3. Map to Drizzle Schema.
        //    aiFeedback is a text column, so we JSON.stringify the structured object.
        //    This avoids a DB migration while keeping the data structured.
        const insertData = parsedResult.qnaPairs.map((pair: any) => ({
            interviewSessionId: sessionId,
            question: pair.question,
            answer: pair.answer,
            questionType: pair.questionType,
            aiFeedback: JSON.stringify(pair.aiFeedback)
        }));

        // 4. Batch insert all Q&A pairs into the database
        await db.insert(InterviewQnATable).values(insertData);

        return { success: true };
    } catch (error) {
        console.error("Failed to grade interview:", error);
        return { success: false, error: "Failed to grade interview" };
    }
}