import { Outlet } from "react-router";
import LlmChat from "./llmChat";

function HomeLayout() {
  return (
    <main className="bg-black w-screen h-screen flex  ">
      <section className="max-w-[350px] w-full border-r-2 border-white">
        <LlmChat />
      </section>
      <section className="flex flex-col flex-1 items-center">
        <Outlet />
      </section>
    </main>
  );
}
export default HomeLayout;
