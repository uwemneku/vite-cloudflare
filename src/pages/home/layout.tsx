import { Outlet } from "react-router";
import LlmChat from "./llmChat";

function HomeLayout() {
  return (
    <main className="bg-black w-screen h-screen flex overflow-y-auto ">
      <section className="w-[300px] border-r-2 border-white">
        <LlmChat />
      </section>
      <section className="flex flex-col flex-1 items-center">
        <Outlet />
      </section>
    </main>
  );
}
export default HomeLayout;
