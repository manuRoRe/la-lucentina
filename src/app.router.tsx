import { createBrowserRouter, Navigate } from "react-router";
import { ShopPage } from "./shop/pages/ShopPage";
import { ShopLayout } from "./shop/layout/ShopLayout";
import ProductPage from "./shop/pages/ProductPage";
import { AdminLogin } from "./admin/pages/AdminLogin";
import { ProtectedRoute } from "./admin/components/ProtectedRoutes";
import { AdminLayout } from "./admin/layout/AdminLayout";
import { AdminDashboard } from "./admin/pages/AdminDashboard";
import ProductFormPage from "./admin/pages/ProductFormPage";

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
    path: "admin-login",
    element: <AdminLayout></AdminLayout>,
    children: [{ index: true, element: <AdminLogin /> }],
  },

  // --- RUTAS PRIVADAS (Panel de Control) ---
  {
    path: "admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },

          {
            path: "nuevo",
            element: <ProductFormPage />,
          },
          {
            path: "editar/:id",
            element: <ProductFormPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
