import { createBrowserRouter, Navigate } from "react-router";
import { ShopPage } from "./shop/pages/ShopPage";
import { ShopLayout } from "./shop/layout/ShopLayout";
import ProductPage from "./shop/pages/ProductPage";

/* const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout")); */

export const appRouter = createBrowserRouter([
  //Public routes
  {
    path: "/",
    element: <ShopLayout></ShopLayout>,
    children: [
      {
        index: true,
        element: <ShopPage />,
      },
      {
        path: "producto/:id",
        element: <ProductPage></ProductPage>,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
