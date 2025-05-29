import { FaRegTrashCan, FaSpinner } from "react-icons/fa6";
import type { Task } from "../../util/types";
import { useDeleteTodo } from "../../services/api/useGetTodo";

export default function Task(props: Task) {
  const { mutate, isPending, isSuccess } = useDeleteTodo();

  return (
    <div key={props.id} className="bg-white p-3 rounded-lg flex items-center ">
      <div className="flex-1 justify-between flex items-center">
        <span>{props.title}</span>
        <span className="text-gray-500">
          {new Date(props.createdAt).toLocaleDateString()}
        </span>
      </div>
      <button
        disabled={isPending || isSuccess}
        onClick={() => mutate(props.id)}
        className="p-2 cursor-pointer"
      >
        {isPending || isSuccess ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <FaRegTrashCan />
        )}
      </button>
    </div>
  );
}
