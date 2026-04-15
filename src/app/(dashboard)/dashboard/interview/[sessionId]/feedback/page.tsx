import { db } from "@/drizzle/db";
import { InterviewQnATable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BrainCircuit, User, CheckCircle2, AlertTriangle, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// TypeScript type for the structured feedback stored as JSON in the aiFeedback column.
// Matches the Gemini responseSchema defined in interview-grader.ts.
type StructuredFeedback = {
    score: number;
    expectedAnswer: string;
    strengths: string[];
    weaknesses: string[];
};

// Helper: safely parse the aiFeedback JSON string.
// Returns null if parsing fails (e.g., legacy plain-text feedback).
function parseFeedback(raw: string): StructuredFeedback | null {
    try {
        const parsed = JSON.parse(raw);
        // Basic shape validation — make sure it has the fields we expect
        if (typeof parsed.score === "number" && Array.isArray(parsed.strengths)) {
            return parsed as StructuredFeedback;
        }
        return null;
    } catch {
        return null;
    }
}

export default async function FeedbackPage({ params }: { params: Promise<{ sessionId: string }> }) {
    const resolvedParams = await params;
    
    const qnaResults = await db.select()
        .from(InterviewQnATable)
        .where(eq(InterviewQnATable.interviewSessionId, resolvedParams.sessionId));

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
            
            {/* Premium Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-8 rounded-3xl border shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Interview Feedback</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Review your performance and explore areas for improvement.
                    </p>
                </div>
                <Link href="/dashboard">
                    <Button variant="default" className="rounded-full px-6">
                        <ArrowLeft className="w-4 h-4 mr-2"/> Back to Dashboard
                    </Button>
                </Link>
            </div>

            {qnaResults.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
                    <p className="text-muted-foreground text-lg">No transcript data could be analyzed.</p>
                </div>
            ) : (
                <Accordion type="multiple" className="w-full space-y-6">
                    {qnaResults.map((qna, idx) => {
                        // Parse the structured JSON feedback for this question
                        const feedback = parseFeedback(qna.aiFeedback);

                        return (
                            <AccordionItem 
                                key={qna.id} 
                                value={`item-${idx}`} 
                                className="bg-card border rounded-2xl shadow-sm overflow-hidden px-2 data-[state=open]:ring-1 data-[state=open]:ring-primary/50 transition-all"
                            >
                                {/* Collapsible Question Header */}
                                <AccordionTrigger className="hover:no-underline py-6 px-6">
                                    <div className="flex flex-col text-left gap-3 w-full pr-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center justify-center bg-primary/10 text-primary w-8 h-8 rounded-full text-sm font-bold shrink-0">
                                                {idx + 1}
                                            </span>
                                            <Badge variant="secondary" className="px-3 py-1 font-medium shadow-none">
                                                {qna.questionType}
                                            </Badge>
                                            {/* Show score badge in the header for quick scanning */}
                                            {feedback && (
                                                <Badge 
                                                    variant="outline" 
                                                    className={`ml-auto px-3 py-1 font-bold text-sm ${
                                                        feedback.score >= 7 
                                                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" 
                                                            : feedback.score >= 4 
                                                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                                                            : "bg-destructive/10 text-destructive border-destructive/30"
                                                    }`}
                                                >
                                                    {feedback.score}/10
                                                </Badge>
                                            )}
                                        </div>
                                        <span className="text-lg font-semibold leading-relaxed text-foreground">
                                            {qna.question}
                                        </span>
                                    </div>
                                </AccordionTrigger>

                                {/* Hidden Content: Answer & Structured Feedback */}
                                <AccordionContent className="px-6 pb-8 pt-2 space-y-6">
                                    
                                    {/* Your Answer Block */}
                                    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 space-y-3 shadow-inner">
                                        <h4 className="flex items-center font-bold text-sm text-destructive uppercase tracking-wider">
                                            <User className="w-4 h-4 mr-2"/> Your Answer
                                        </h4>
                                        <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-base">
                                            {qna.answer && qna.answer.trim().length > 0 
                                                ? qna.answer 
                                                : <span className="italic text-muted-foreground">No answer recorded...</span>}
                                        </p>
                                    </div>

                                    {/* ── Structured Feedback Sections ──────────────── */}
                                    {feedback ? (
                                        <div className="space-y-5">
                                            
                                            {/* Score + Expected Answer Card */}
                                            <Card className="border-blue-200/50 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="flex items-center gap-2 text-base tracking-tight">
                                                        <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                        Expected Answer
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap">
                                                        {feedback.expectedAnswer}
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            {/* Two-column grid: Strengths + Weaknesses */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                                {/* Strengths */}
                                                <Card className="border-emerald-200/50 dark:border-emerald-900/50">
                                                    <CardHeader className="pb-3">
                                                        <CardTitle className="flex items-center gap-2 text-base tracking-tight text-emerald-700 dark:text-emerald-400">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Strengths
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2.5">
                                                        {feedback.strengths.length > 0 ? (
                                                            feedback.strengths.map((strength, i) => (
                                                                <div 
                                                                    key={i}
                                                                    className="flex items-start gap-2.5 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-lg p-3"
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                                    <span className="text-sm text-emerald-800 dark:text-emerald-300">
                                                                        {strength}
                                                                    </span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground italic">No specific strengths identified.</p>
                                                        )}
                                                    </CardContent>
                                                </Card>

                                                {/* Areas for Improvement */}
                                                <Card className="border-destructive/20 dark:border-destructive/30">
                                                    <CardHeader className="pb-3">
                                                        <CardTitle className="flex items-center gap-2 text-base tracking-tight text-destructive">
                                                            <AlertTriangle className="w-4 h-4" />
                                                            Areas for Improvement
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2.5">
                                                        {feedback.weaknesses.length > 0 ? (
                                                            feedback.weaknesses.map((weakness, i) => (
                                                                <div 
                                                                    key={i}
                                                                    className="flex items-start gap-2.5 bg-destructive/10 dark:bg-destructive/5 rounded-lg p-3"
                                                                >
                                                                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />
                                                                    <span className="text-sm text-destructive dark:text-red-300">
                                                                        {weakness}
                                                                    </span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground italic">No specific improvements identified.</p>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    ) : (
                                        // Fallback: if aiFeedback is legacy plain text (not JSON),
                                        // display it as-is in the old format.
                                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-3 shadow-inner">
                                            <h4 className="flex items-center font-bold text-sm text-primary uppercase tracking-wider">
                                                <BrainCircuit className="w-4 h-4 mr-2"/> Expert Feedback
                                            </h4>
                                            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-base">
                                                {qna.aiFeedback}
                                            </p>
                                        </div>
                                    )}

                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            )}
        </div>
    );
}