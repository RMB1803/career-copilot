import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { SavedJobsTable } from "./savedJobs";
import { InterviewSessionsTable } from "./interviewSessions";
import { GeneratedCoverLettersTable } from "./generatedCoverLetter";

export const ScrapedJobsTable = pgTable("scraped_jobs", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar().notNull(),
    companyName: varchar().notNull(),
    description: text().notNull(),
    wage: varchar(),
    locationRequirement: varchar().notNull(),
    experienceLevel: varchar(),
    location: varchar().notNull(),
    sourceUrl: text().unique().notNull(),
    sourceSite: varchar().notNull(),
    scrapedAt: timestamp({withTimezone: true}).notNull().defaultNow(), // When did we findd it?
    postedAt: varchar() // When was it posted by the Company?
})

export const scrapedJobsRelations = relations(ScrapedJobsTable, ({one, many}) => ({
    savedJobs: many(SavedJobsTable),
    interviewSessions: many(InterviewSessionsTable),
    generatedCoverLetters: many(GeneratedCoverLettersTable),
}))