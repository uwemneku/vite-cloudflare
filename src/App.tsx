import { useRef } from "react";
import useGetAllTodoQuery, {
  useCreateTodo,
  useDeleteTodo,
} from "./services/api/useGetTodo";

function App() {
  const { data } = useGetAllTodoQuery();
  const { mutate } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <main className="bg-black w-screen h-screen flex  items-center flex-col overflow-y-auto py-20">
        <div className="h-[40dvh]"></div>
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            className="p-3 bg-white rounded-full text-black"
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
        <div>
          {data?.todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white p-3 rounded-lg mt-2 flex justify-between items-center "
              onClick={() => deleteTodo(todo.id)}
            >
              <span>{todo.title}</span>
              <span className="text-gray-500">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
        {/* =========== ====== ============== */}
      </main>
    </>
  );
}

export default App;
