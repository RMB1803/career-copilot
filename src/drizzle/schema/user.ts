import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserNotificationSettingsTable } from "./userNotificationSettings";
import { UserResumeTable } from "./userResume";
import { SavedJobsTable } from "./savedJobs";
import { GeneratedCoverLettersTable } from "./generatedCoverLetter";
import { InterviewSessionsTable } from "./interviewSessions";

export const UserTable = pgTable("users", {
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    imageUrl: varchar().notNull(),
    createdAt,
    updatedAt
})

export const userRelations = relations(UserTable, ({one, many}) => ({
    notificationSettings: one(UserNotificationSettingsTable),
    resume: one(UserResumeTable),
    savedJobs: many(SavedJobsTable),
    generatedCoverLetters: many(GeneratedCoverLettersTable),
    interviewSessions: many(InterviewSessionsTable)
}))

