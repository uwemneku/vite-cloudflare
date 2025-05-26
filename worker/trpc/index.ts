import { initTRPC } from "@trpc/server";
import type { Context } from "./createContext";

export const t = initTRPC.context<Context>().create();
export const appRouter = t.router({
  getName: t.procedure.query(() => {
    // Simulate a database call or any async operation
    const name = "Cloudflare Worker";
    return { name };
  }),
});
export type AppRouter = typeof appRouter;
