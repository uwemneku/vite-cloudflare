import { useMutation, useQuery } from "@tanstack/react-query";
import { useTRPC } from "../../util/trpc";
import { getQueryClient } from "./ApiWrapper";

const useGetAllTodo = () => {
  const trpc = useTRPC();
  return useQuery(trpc.getTodos.queryOptions(undefined, { retry: false }));
};

export const useCreateTodo = () => {
  const client = getQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.createTodo.mutationOptions({
      onSuccess: () => {
        client.invalidateQueries({ queryKey: trpc.getTodos.queryKey() });
        // trpc.getTodos.queryKey;
      },
    })
  );
};

export const useDeleteTodo = () => {
  const client = getQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.deleteTodo.mutationOptions({
      onSuccess: () => {
        client.invalidateQueries({ queryKey: trpc.getTodos.queryKey() });
      },
    })
  );
};

export default useGetAllTodo;
