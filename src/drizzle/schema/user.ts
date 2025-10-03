import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

const createdAt = timestamp({withTimezone: true}).notNull().defaultNow()
const updatedAt = timestamp({withTimezone: true}).notNull().defaultNow().$onUpdate(() => new Date())

export const UserTable = pgTable("users", {
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    imageUrl: varchar().notNull(),
    createdAt,
    updatedAt
})

