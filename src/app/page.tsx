import { AIInterviewerSection } from "@/components/ai-interviewer-section";
import { FeatureTabs } from "@/components/feature-tabs";
import { Hero } from "@/components/hero";
import { JobMatchesSection } from "@/components/job-matches-section";
import { JobTrackerSection } from "@/components/jobTracker-section";
import { Navbar } from "@/components/navbar";
import { ResumeBuilderSection } from "@/components/resumeBuilder-section";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      <FeatureTabs />
      <JobMatchesSection />
      <ResumeBuilderSection />
      <JobTrackerSection />
      <AIInterviewerSection />
    </main>
  );
}

