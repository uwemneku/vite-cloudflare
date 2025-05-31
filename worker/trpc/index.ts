import { initTRPC, tracked } from "@trpc/server";
import type { Context } from "./createContext";
import z from "zod";
import { TodoTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { streamText, tool } from "ai";
import { v4 } from "uuid";
// import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
export const t = initTRPC.context<Context>().create();
const openAi = new OpenAI({});

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
    .input(
      z.object({
        message: z.string(),
        prevMessageId: z.string().optional(),
      })
    )
    .subscription(async function* ({ input }) {
      const stream = await openAi.responses.create({
        model: "chatgpt-4o-latest",
        input: [
          {
            role: "user",
            content: input.message,
          },
        ],
        stream: true,
      });

      for await (const data of stream) {
        switch (data.type) {
          case "response.output_text.delta":
            {
              yield tracked(v4(), {
                text: data.delta,
                type: "message",
              } as const);
            }
            break;
          case "response.completed": {
            yield tracked(v4(), {
              responseId: data.response.id,
              type: "end",
            } as const);
          }
        }
        yield { data, type: "dd" } as const;
      }

      // return;
    }),
});
export type AppRouter = typeof appRouter;
