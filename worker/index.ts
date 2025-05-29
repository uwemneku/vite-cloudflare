import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./trpc";
import createContext from "./trpc/createContext";

export type Env = {
  DB: D1Database;
};

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: () => createContext({ env, request, workerCtx: ctx }),
      });
    }
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
