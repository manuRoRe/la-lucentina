import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};
