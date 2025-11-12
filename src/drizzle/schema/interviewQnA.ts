import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { InterviewSessionsTable } from "./interviewSessions";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const questionTypes = ["Behavioral", "Technical", "Situational"] as const
export type questionType = (typeof questionTypes)[number]
export const questionTypesEnum = pgEnum("question_types", questionTypes)

export const InterviewQnATable = pgTable("interview_qna", {
    id: uuid().primaryKey().defaultRandom(),
    interviewSessionId: uuid().notNull().references(() => InterviewSessionsTable.id, {onDelete: "cascade"}),
    question: text().notNull(),
    answer: text(),
    questionType: questionTypesEnum().notNull(),
    aiFeedback: text().notNull(),
    createdAt,
    updatedAt
})

export const interviewQnARelations = relations(InterviewQnATable, ({one}) => ({
    interviewSession: one(InterviewSessionsTable, {
        fields: [InterviewQnATable.interviewSessionId],
        references: [InterviewSessionsTable.id]
    })
}))