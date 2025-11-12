import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { ScrapedJobsTable } from "./scrapedJobs";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { InterviewQnATable } from "./interviewQnA";

export const InterviewSessionsTable = pgTable("interview_sessions", {
    id: uuid().primaryKey().defaultRandom(),
    userId: varchar().notNull().references(() => UserTable.id),
    jobId: uuid().references(() => ScrapedJobsTable.id),
    createdAt,
    updatedAt
})

export const interviewSessionsRelations = relations(InterviewSessionsTable, ({one, many}) => ({
    user: one(UserTable, {
        fields: [InterviewSessionsTable.userId],
        references: [UserTable.id]
    }),
    job: one(ScrapedJobsTable, {
        fields: [InterviewSessionsTable.jobId], 
        references: [ScrapedJobsTable.id]
    }),
    interviewQnA: many(InterviewQnATable)
}))