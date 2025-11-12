import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { ScrapedJobsTable } from "./scrapedJobs";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const GeneratedCoverLettersTable = pgTable("generated_cover_letters", {
    id: uuid().primaryKey().defaultRandom(),
    userId: varchar().notNull().references(() => UserTable.id),
    jobId: uuid().notNull().references(() => ScrapedJobsTable.id),
    coverLetter: text(),
    createdAt,
    updatedAt
})

export const generatedCoverLetterRelations = relations(GeneratedCoverLettersTable, ({one}) => ({
    user: one(UserTable, {
        fields: [GeneratedCoverLettersTable.userId],
        references: [UserTable.id]
    }),
    job: one(ScrapedJobsTable, {
        fields: [GeneratedCoverLettersTable.jobId], 
        references: [ScrapedJobsTable.id]
    })
}))