import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LaLucentina from "./LaLucentina";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LaLucentina></LaLucentina>
  </StrictMode>,
);
