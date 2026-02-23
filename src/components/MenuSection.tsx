import { CONTACT_INFO } from "@/config/Constants";
import { AllergenTable } from "./AllergenTable";
import { ProductCard } from "./ProductCard";
import { Phone } from "lucide-react";
import { menuCategories } from "@/lib/menu-data";
import { useRef, useState } from "react";
import { useStickyTabs } from "@/hooks/useStickyTabs";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const sectionRef = useRef<HTMLElement>(null);

  // Usamos nuestro nuevo hook 🚀
  const { isSticky, containerRef, sentinelRef } = useStickyTabs(activeCategory);

  const activeCat = menuCategories.find((cat) => cat.id === activeCategory)!;

  function handleTabClick(id: string) {
    setActiveCategory(id);
    if (sectionRef.current) {
      const y =
        sectionRef.current.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <section
      ref={sectionRef}
      id="carta"
      className="bg-background py-20 md:py-28"
    >
      {/* Títulos... */}

      <div ref={sentinelRef} className="h-0" aria-hidden="true" />

      <div
        className={`sticky top-[72px] z-30 transition-shadow ${
          isSticky
            ? "bg-background/95 shadow-md backdrop-blur-md"
            : "bg-background"
        }`}
      >
        <div className="mx-auto flex max-w-7xl px-4 md:px-6">
          <div
            ref={containerRef}
            className="scrollbar-hide flex flex-1 gap-1 overflow-x-auto py-3 md:justify-center"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                data-tab-id={cat.id}
                onClick={() => handleTabClick(cat.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-black text-white"
                    : "text-muted-foreground hover:bg-gray-100"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de productos... */}

      <div className="mx-auto max-w-7xl px-6 mt-10">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold md:text-3xl">{activeCat.title}</h3>
          <p className="mt-2 text-muted-foreground">{activeCat.description}</p>
        </div>

        <div
          key={activeCategory}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {activeCat.items.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </div>

        <AllergenTable category={activeCat} />

        <div className="mt-14 flex justify-center">
          <a
            href={CONTACT_INFO.phone}
            className="flex items-center gap-2 rounded-full border border-black px-8 py-3 text-sm font-bold hover:bg-black hover:text-white transition-colors"
          >
            <Phone className="h-4 w-4" />
            Pide tus {activeCat.title.toLowerCase()}
          </a>
        </div>
      </div>
    </section>
  );
}
