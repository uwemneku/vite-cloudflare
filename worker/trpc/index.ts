import { initTRPC, tracked } from "@trpc/server";
import type { Context } from "./createContext";
import z from "zod";
import { TodoTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { streamText, tool } from "ai";
import { v4 } from "uuid";
import { openai } from "@ai-sdk/openai";
export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getTodos: t.procedure.query(async ({ ctx }) => {
    const todos = await ctx.db.select().from(TodoTable);
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
  chat: t.procedure
    .input(z.object({ message: z.string(), id: z.string() }))
    .subscription(async function* ({ ctx, input }) {
      const res = streamText({
        model: openai("gpt-3.5-turbo"),
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that helps users create Todo lists. Do not deviate from this",
          },
          {
            role: "user",
            content: input.message,
          },
        ],
        tools: {
          createTodo: tool({
            description: "Create a Todo task",
            parameters: z.object({
              title: z.string().describe("The title to the task to be created"),
            }),
            execute: async () => {},
            type: "function",
          }),
        },
        onError(err) {
          console.log("errororor", err);
        },
      });

      for await (const text of res.textStream) {
        yield tracked(v4(), { text, id: input.id });
      }
      return;
    }),
});
export type AppRouter = typeof appRouter;
