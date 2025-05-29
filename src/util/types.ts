import type { trpc } from "./trpc";

export type Task = Awaited<
  ReturnType<typeof trpc.getTodos.query>
>["todos"][number];
