import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";
import type { AppRouter } from "../../../worker/trpc";
import {
  createTRPCClient,
  httpBatchLink,
  httpSubscriptionLink,
  loggerLink,
  splitLink,
} from "@trpc/client";
import { TRPCProvider } from "../../util/trpc";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
export default function ApiWrapper(props: PropsWithChildren) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink(),
        splitLink({
          condition: (op) => op.type === "subscription",
          true: httpSubscriptionLink({
            url: "/api/trpc",
          }),
          false: httpBatchLink({
            url: "/api/trpc",
          }),
        }),
      ],
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
