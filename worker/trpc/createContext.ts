import { drizzle } from "drizzle-orm/d1";
import "../../worker-configuration.d.ts";
import * as schema from "../db/schema.ts";
interface Args {
  request: Request<unknown, IncomingRequestCfProperties<unknown>>;
  env: Env;
  workerCtx: ExecutionContext;
}
export default function createContext(args: Args) {
  const db = drizzle(args.env.DB, { schema });
  return { ...args, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
