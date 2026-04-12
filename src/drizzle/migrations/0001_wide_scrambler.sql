ALTER TABLE "user_resumes" ALTER COLUMN "resumeFileUrl" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_resumes" ALTER COLUMN "resumeFileKey" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_resumes" ADD COLUMN "reviewData" jsonb;--> statement-breakpoint
ALTER TABLE "user_resumes" ADD COLUMN "matchData" jsonb;