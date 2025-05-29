import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ApiWrapper from "./services/api/ApiWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiWrapper>
      <App />
    </ApiWrapper>
  </StrictMode>
);
