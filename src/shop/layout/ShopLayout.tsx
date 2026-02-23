import { FabPhone } from "@/components/FabPhone";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";

export const ShopLayout = () => {
  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
      <FabPhone />
    </div>
  );
};
