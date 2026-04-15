"use client";

import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi";
import { Button } from "@/components/ui/button";
import { startInterviewSession } from "@/actions/interview";
import { analyzeInterview } from "@/actions/interview-grader";
import { Mic, Square, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function AIInterviewerClient({ jobId }: { jobId?: string }) {
    const router = useRouter();
    const [callStatus, setCallStatus] = useState<"inactive" | "loading" | "active" | "grading">("inactive");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [transcript, setTranscript] = useState<{role: string, text: string}[]>([]);

    useEffect(() => {
        vapi.on("call-start", () => setCallStatus("active"));

        vapi.on("speech-start", () => setIsSpeaking(true));
        vapi.on("speech-end", () => setIsSpeaking(false));

        vapi.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [...prev, { role: message.role, text: message.transcript }]);
            }
        });

        vapi.on("error", (e) => {
            console.error("Vapi Error:", e);
            setCallStatus("inactive");
        });

        // Cleanup
        return () => {
            vapi.removeAllListeners();
        };
    }, []);

    // We handle call-end in a separate effect so it has the latest transcript and sessionId state
    useEffect(() => {
        const handleCallEnd = async () => {
            setIsSpeaking(false);
            if (sessionId && transcript.length > 0) {
                setCallStatus("grading");
                // Send to Gemini
                await analyzeInterview(sessionId, transcript);
                // Route to the beautiful feedback page
                router.push(`/dashboard/interview/${sessionId}/feedback`);
            } else {
                setCallStatus("inactive");
            }
        };

        vapi.on("call-end", handleCallEnd);
        return () => { vapi.off("call-end", handleCallEnd); };
    }, [sessionId, transcript, router]);

    const toggleCall = async () => {
        if (callStatus === "active") {
            vapi.stop(); 
        } else {
            setCallStatus("loading");
            try {
                // 1. Generate DB Session
                const res = await startInterviewSession(jobId);
                if (!res.success) throw new Error(res.error);
                
                setSessionId(res.sessionId ?? null);
                setTranscript([]);

                // 2. Start Vapi
                await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
            } catch (error) {
                console.error("Failed to start:", error);
                setCallStatus("inactive");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8 p-10 border rounded-2xl bg-card shadow-sm">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSpeaking ? "bg-primary/20 animate-pulse shadow-[0_0_40px_rgba(var(--primary),0.6)]" : "bg-muted"
            }`}>
                <Mic className={`w-12 h-12 ${isSpeaking ? "text-primary" : "text-muted-foreground"}`} />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">
                    {callStatus === "active" ? "Interview in Progress" : callStatus === "grading" ? "Analyzing Performance..." : "Mock Interview"}
                </h3>
                <p className="text-muted-foreground">
                    {callStatus === "active" 
                        ? (isSpeaking ? "AI is speaking..." : "Listening to you...") 
                        : callStatus === "grading" 
                        ? "Gemini is grading your responses. Please wait." 
                        : "Click below to start your AI-powered technical interview."}
                </p>
            </div>

            <Button 
                onClick={toggleCall} 
                disabled={callStatus === "loading" || callStatus === "grading"}
                variant={callStatus === "active" ? "destructive" : "default"}
                size="lg"
                className="w-56 rounded-full font-semibold text-md h-12"
            >
                {callStatus === "loading" || callStatus === "grading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : callStatus === "active" ? (
                    <><Square className="w-5 h-5 mr-2 fill-current" /> End Interview</>
                ) : (
                    <><Mic className="w-5 h-5 mr-2" /> Start Interview</>
                )}
            </Button>
        </div>
    );
}