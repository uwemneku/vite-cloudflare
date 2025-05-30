import { drizzle } from "drizzle-orm/d1";
import "../../worker-configuration.d.ts";
import * as schema from "../db/schema.ts";
import { createWorkersAI } from "workers-ai-provider";
interface Args {
  request: Request<unknown, IncomingRequestCfProperties<unknown>>;
  env: Env;
  workerCtx: ExecutionContext;
}
export default function createContext(args: Args) {
  const db = drizzle(args.env.DB, { schema });
  const workersai = createWorkersAI({ binding: args.env.AI });
  const model = workersai("@cf/meta/llama-3-8b-instruct", {
    safePrompt: true,
  });
  return { ...args, db, model };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
