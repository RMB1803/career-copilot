import { boolean, index, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { OrganizationTable } from "./organizations";
import { createdAt, updatedAt } from "../schemaHelpers";

export const wageIntervals = ["hourly", "yearly"] as const
export type wageInterval = (typeof wageIntervals)[number]
export const wageIntervalEnum = pgEnum("job_listings_wage_interval", wageIntervals)

export const locationRequirements = ["In-Office", "Remote", "Hybrid"] as const
export type locationRequirement = (typeof locationRequirements)[number]
export const locationRequirementsEnum = pgEnum("job_listings_location_req", locationRequirements)

export const experienceLevels = ["Junior", "Mid-level", "Senior"] as const
export type experienceLevel = (typeof experienceLevels)[number]
export const experienceLevelsEnum = pgEnum("job_listings_exp_level", experienceLevels)

export const jobListingStatus = ["Draft", "De-listed", "Published"] as const
export type jobListingStatusType = (typeof jobListingStatus)[number]
export const jobListingStatusEnum = pgEnum("job_listings_status", jobListingStatus)

export const jobListingTypes = ["Full-time", "Part-time", "Internship"] as const
export type jobListingType = (typeof jobListingTypes)[number]
export const jobListingTypeEnum = pgEnum("job_listings_type", jobListingTypes)

export const JobListingTable = pgTable("job_listings", {
    id: uuid().primaryKey().defaultRandom(),
    organizationId: varchar().references(() => OrganizationTable.id, {onDelete: "cascade"}).notNull(),
    title: varchar().notNull(),
    description: text().notNull(),
    wage: integer(),
    wageInterval: wageIntervalEnum(),
    stateAbbreviation: varchar(),
    city: varchar(),
    isFeatured: boolean().notNull().default(false),
    locationRequirement: locationRequirementsEnum().notNull(),
    experienceLevel: experienceLevelsEnum().notNull(),
    status: jobListingStatusEnum().notNull().default("Draft"),
    type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({withTimezone: true}),
    createdAt,
    updatedAt
},
table => [index().on(table.stateAbbreviation)]
)