import { CONTACT_INFO } from "@/config/Constants";
import { ProductCard } from "./ProductCard";
import { Phone } from "lucide-react";
import { menuCategories } from "@/lib/menu-data"; // Mantenemos esto para los iconos y títulos
import { useRef, useState, useEffect } from "react";
import { useStickyTabs } from "@/hooks/useStickyTabs"; // Importamos tu cliente y tipo
import { supabase } from "@/lib/supabase";
import type { Product } from "@/interfaces/Product";

export function MenuSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const sectionRef = useRef<HTMLElement>(null);

  // Hook para el comportamiento de la barra de pestañas
  const { isSticky, containerRef, sentinelRef } = useStickyTabs(activeCategory);

  // Carga de datos desde Supabase
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error cargando productos:", error);
      } else if (data) {
        setProducts(data);
      }
      setLoading(false);
    }

    getProducts();
    // Debug: Ver qué productos se han cargado
  }, []);

  // Buscamos la info de la categoría actual (iconos, descripciones fijas)
  const categoryInfo = menuCategories.find((cat) => cat.id === activeCategory)!;

  // Filtramos los productos de Supabase que pertenecen a la categoría activa
  const displayedProducts = products.filter(
    (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
  );

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
      <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Nuestra Carta
        </p>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Lo mejor de La Lucentina
        </h2>
      </div>

      <div ref={sentinelRef} className="h-0" aria-hidden="true" />

      {/* Sticky Tabs */}
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

      <div className="mx-auto max-w-7xl px-6 mt-10">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold md:text-3xl">
            {categoryInfo.title}
          </h3>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {categoryInfo.description}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
          </div>
        ) : (
          <div
            key={activeCategory}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {displayedProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Adaptamos la tabla de alérgenos para que use los productos filtrados de la BD */}
        {/* {!loading && displayedProducts.length > 0 && (
          <AllergenTable 
            category={{ 
              ...categoryInfo, 
              items: displayedProducts as any // Cast temporal para compatibilidad
            }} 
          />
        )} */}

        <div className="mt-14 flex justify-center">
          <a
            href={CONTACT_INFO.phone}
            className="flex items-center gap-2 rounded-full border border-black px-8 py-3 text-sm font-bold hover:bg-black hover:text-white transition-colors"
          >
            <Phone className="h-4 w-4" />
            Pide tus {categoryInfo.title.toLowerCase()}
          </a>
        </div>
      </div>
    </section>
  );
}
