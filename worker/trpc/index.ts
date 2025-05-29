import { initTRPC } from "@trpc/server";
import type { Context } from "./createContext";
import z from "zod";
import { TodoTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const t = initTRPC.context<Context>().create();
export const appRouter = t.router({
  getTodos: t.procedure.query(async ({ ctx }) => {
    const todos = await ctx.db.query.TodoTable.findMany();
    return { todos };
  }),
  createTodo: t.procedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newTodo = await ctx.db
        .insert(TodoTable)
        .values({ title: input.title })
        .returning();

      return { newTodo };
    }),
  deleteTodo: t.procedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const deletedTodo = await ctx.db
      .delete(TodoTable)
      .where(eq(TodoTable.id, input));

    return { deletedTodo };
  }),
});
export type AppRouter = typeof appRouter;
