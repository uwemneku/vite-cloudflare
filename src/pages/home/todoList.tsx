import { useRef } from "react";
import useGetAllTodoQuery, {
  useCreateTodo,
} from "../../services/api/useGetTodo";
import Task from "../../components/todo";

function App() {
  const { data } = useGetAllTodoQuery();
  const { mutate } = useCreateTodo();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="h-[40dvh]"></div>
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          className="p-3 bg-white rounded-sm border-2 focus:border-2 focus:border-amber-300 outline text-black"
        />
        <button
          className="bg-white  text-lg font-extrabold rounded-full w-10 h-10 flex justify-center items-center ml-2"
          onClick={() => {
            if (inputRef.current?.value) {
              mutate({ title: inputRef.current.value });
              inputRef.current.value = "";
            }
          }}
        >
          +
        </button>
      </div>
      {/* =========== Todo's ============== */}
      <div className="min-w-[300px] w-[400px] mt-4 grid gap-3">
        {data?.todos.map((todo) => (
          <Task
            createdAt={todo.createdAt}
            title={todo.title}
            id={todo.id}
            key={todo.id}
            isDone={todo.isDone}
            updatedAt={todo.updatedAt}
          />
        ))}
      </div>
      {/* =========== ====== ============== */}
    </>
  );
}
export default App;
