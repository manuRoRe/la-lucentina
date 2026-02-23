import { useState, useRef, useEffect, useCallback } from "react";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react";
// Cambia estas rutas según tu estructura real

import { menuCategories } from "../lib/menu-data";
import { ProductCard } from "./ProductCard";
import { AllergenTable } from "./AllergenTable";
import { CONTACT_INFO } from "../config/Constants";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [isTabBarSticky, setIsTabBarSticky] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const tabBarSentinelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeCat = menuCategories.find((cat) => cat.id === activeCategory)!;

  // 1. Detección de Sticky (Intersection Observer)
  useEffect(() => {
    const sentinel = tabBarSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTabBarSticky(!entry.isIntersecting);
      },
      // Ajustamos el margen según la altura de tu Navbar (aprox 72px)
      { threshold: 0, rootMargin: "-73px 0px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // 2. Control de flechas de scroll horizontal
  const checkScrollOverflow = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    checkScrollOverflow();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollOverflow, { passive: true });
    window.addEventListener("resize", checkScrollOverflow);
    return () => {
      el.removeEventListener("scroll", checkScrollOverflow);
      window.removeEventListener("resize", checkScrollOverflow);
    };
  }, [checkScrollOverflow]);

  // 3. Auto-scroll de la pestaña activa
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(
      `[data-tab-id="${activeCategory}"]`,
    ) as HTMLButtonElement | null;

    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    setTimeout(checkScrollOverflow, 350);
  }, [activeCategory, checkScrollOverflow]);

  function handleTabClick(id: string) {
    setActiveCategory(id);
    const section = sectionRef.current;
    if (section) {
      // Ajuste de scroll para que no tape la cabecera
      const y = section.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  function scrollTabs(direction: "left" | "right") {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -160 : 160,
      behavior: "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="carta"
      className="bg-background pb-20 pt-20 md:pb-28 md:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Nuestra Carta
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Lo mejor de La Lucentina
          </h2>
        </div>
      </div>

      <div ref={tabBarSentinelRef} className="h-0" aria-hidden="true" />

      {/* Barra de Categorías Sticky */}
      <div
        className={`sticky top-[72px] z-30 transition-shadow duration-300 ${
          isTabBarSticky
            ? "bg-background/95 shadow-md backdrop-blur-md"
            : "bg-background"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center px-2 md:px-6">
          <button
            onClick={() => scrollTabs("left")}
            className={`hidden shrink-0 p-1.5 text-muted-foreground md:flex ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex flex-1 gap-1 overflow-x-auto px-2 py-3 md:justify-center md:gap-2"
          >
            {menuCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  data-tab-id={cat.id}
                  onClick={() => handleTabClick(cat.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-transparent text-muted-foreground hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollTabs("right")}
            className={`hidden shrink-0 p-1.5 text-muted-foreground md:flex ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Contenido de la Categoría */}
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
