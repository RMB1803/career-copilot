import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserNotificationSettingsTable } from "./userNotificationSettings";
import { UserResumeTable } from "./userResume";
import { SavedJobsTable } from "./savedJobs";
import { GeneratedCoverLettersTable } from "./generatedCoverLetter";
import { InterviewSessionsTable } from "./interviewSessions";

export const UserTable = pgTable("users", {
    id: varchar("id").primaryKey(),
    clerkId: varchar("clerk_id").notNull().unique(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull().unique(),
    imageUrl: varchar("image_url").notNull(),
    createdAt,
    updatedAt
},
(table) => ({
    clerkIdIndex: index("clerk_id_index").on(table.clerkId),
    emailIndex: index("email_index").on(table.email)
}),
)

export const userRelations = relations(UserTable, ({one, many}) => ({
    notificationSettings: one(UserNotificationSettingsTable),
    resume: one(UserResumeTable),
    savedJobs: many(SavedJobsTable),
    generatedCoverLetters: many(GeneratedCoverLettersTable),
    interviewSessions: many(InterviewSessionsTable)
}))

