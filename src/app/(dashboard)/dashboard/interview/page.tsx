import { AIInterviewerClient } from "@/components/dashboard/ai-interviewer-client";

export default async function AIInterviewerPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ jobId?: string }> 
}) {
    // Next.js 15+ searchParams is a Promise, so we await it
    const resolvedSearchParams = await searchParams;
    const jobId = resolvedSearchParams.jobId;
    
    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto py-10 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Interviewer</h1>
                <p className="text-muted-foreground">
                    Practice your interview skills in real-time with our AI recruiter. Ensure your microphone is enabled.
                </p>
            </div>
            
            <div className="mt-8">
                <AIInterviewerClient jobId={jobId} />
            </div>
        </div>
    );
}