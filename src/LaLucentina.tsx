import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import "./index.css";

export default function LaLucentina() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}
