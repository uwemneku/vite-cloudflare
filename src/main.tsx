import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ApiWrapper from "./services/api/ApiWrapper.tsx";
import { RouterProvider } from "react-router";
import { routes } from "./router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiWrapper>
      <RouterProvider router={routes} />
    </ApiWrapper>
  </StrictMode>
);
