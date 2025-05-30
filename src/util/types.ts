import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../worker/trpc";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type Task = RouterOutput["getTodos"]["todos"][number];
export type ChatResponse = Awaited<RouterOutput["chat"]>;
