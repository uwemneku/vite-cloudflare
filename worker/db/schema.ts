import { sql } from "drizzle-orm";
import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const TodoTable = sqliteTable("todos_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text({ mode: "text" }).notNull(),
  createdAt: int({ mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: int({ mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .$defaultFn(() => new Date())
    .notNull()
    .default(sql`(current_timestamp)`),
  isDone: int({ mode: "boolean" }).notNull().default(false),
});
