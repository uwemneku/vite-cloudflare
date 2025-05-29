import { createBrowserRouter } from "react-router";
import App from "../pages/home/todoList";
import HomeLayout from "../pages/home/layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);
