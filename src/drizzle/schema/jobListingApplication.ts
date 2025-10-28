import { integer, pgEnum, pgTable, primaryKey, text, uuid, varchar } from "drizzle-orm/pg-core";
import { JobListingTable } from "./jobListing";
import { UserTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";

export const applicationStages = ["denied", "applied", "interested", "interviewed", "hired"] as const
export type applicationStage = (typeof applicationStages)[number]
export const applicationStageEnum = pgEnum("application_stage", applicationStages)

export const JobListingApplicationTable = pgTable("job_listing_applications", {
    jobListingId: uuid().references(() => JobListingTable.id, {onDelete: "cascade"}).notNull(),     
    userId: varchar().references(() => UserTable.id, {onDelete: "cascade"}).notNull(),
    coverLetter: text(),
    rating: integer(),
    stage: applicationStageEnum().notNull(),
    createdAt,
    updatedAt
},
table => [primaryKey({columns: [table.jobListingId, table.userId]})]
)