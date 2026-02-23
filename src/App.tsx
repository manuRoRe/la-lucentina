/* import { Hero } from "@/components/hero"
import { MenuSection } from "@/components/menu-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"
import { FabPhone } from "@/components/fab-phone" */
import { FabPhone } from "./components/FabPhone";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { LocationSection } from "./components/LocationSection";
import { MenuSection } from "./components/MenuSection";
import { Navbar } from "./components/Navbar";
import "./index.css";

export default function App() {
  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <LocationSection />
      </main>
      <Footer />
      <FabPhone />
    </div>
  );
}
