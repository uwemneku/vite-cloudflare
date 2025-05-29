import { sql } from "drizzle-orm";
import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const TodoTable = sqliteTable("todos_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title", { mode: "text" }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  isDone: int("isDone", { mode: "boolean" }).notNull().default(false),
});
