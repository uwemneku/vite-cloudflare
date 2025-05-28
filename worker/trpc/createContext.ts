import "../../worker-configuration.d.ts";
interface Args {
  request: Request<unknown, IncomingRequestCfProperties<unknown>>;
  env: Env;
  workerCtx: ExecutionContext;
}
export default function createContext(args: Args) {
  return args;
}

export type Context = Awaited<ReturnType<typeof createContext>>;
