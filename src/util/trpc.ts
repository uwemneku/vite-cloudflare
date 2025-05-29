import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../worker/trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc", // Adjust the URL to match your worker's endpoint
    }),
  ],
});
