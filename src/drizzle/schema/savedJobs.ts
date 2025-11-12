import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { ScrapedJobsTable } from "./scrapedJobs";
import { UserTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const SavedJobsTable = pgTable("saved_jobs", {
    id: uuid().primaryKey().defaultRandom(),
    userId: varchar().notNull().references(() => UserTable.id),
    jobId: uuid().notNull().references(() => ScrapedJobsTable.id),
    aiMatchScore: integer().notNull(),
    createdAt,
    updatedAt
})

export const savedJobsRelations = relations(SavedJobsTable, ({one}) => ({
    user: one(UserTable, {
        fields: [SavedJobsTable.userId],
        references: [UserTable.id]
    }),
    job: one(ScrapedJobsTable, {
        fields: [SavedJobsTable.jobId],
        references: [ScrapedJobsTable.id]
    })
}))