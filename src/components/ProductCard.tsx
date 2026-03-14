import type { Product } from "@/interfaces/Product";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export function ProductCard({ item }: { item: Product }) {
  const navigate = useNavigate();

  // Lógica para obtener el precio a mostrar en el listado
  // Si hay varios precios (XXL, Campero), mostramos el más bajo con un "Desde"
  const priceValues = Object.values(item.prices);
  const minPrice = Math.min(...priceValues);
  const hasMultiplePrices = priceValues.length > 1;

  const productImage =
    item.image && item.image.length > 0
      ? item.image
      : "/images/placeholder.png";

  return (
    <>
      {/* VERSIÓN DESKTOP (Grid) */}
      <article className="group hidden md:flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div
          className="relative aspect-[4/3] overflow-hidden cursor-pointer"
          onClick={() => navigate(`/producto/${item.id_slug}`)}
        >
          <img
            src={productImage}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Número de producto (Badge circular) */}
          {item.product_number && (
            <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-md">
              Nº {item.product_number}
            </span>
          )}

          {/* Badge de Precio */}
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-black tracking-tight text-black shadow-sm backdrop-blur-sm">
            {hasMultiplePrices && (
              <span className="text-[10px] font-medium mr-1">Desde</span>
            )}
            {minPrice.toFixed(2)}€
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold tracking-tight text-card-foreground uppercase line-clamp-1">
            {item.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {item.description}
          </p>

          {/* Alérgenos con validación robusta */}
          <div className="mt-4 min-h-[32px]">
            {Array.isArray(item.allergens) && item.allergens.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 shrink-0 text-amber-500" />
                {item.allergens.map((a) => (
                  <span
                    key={a}
                    className="rounded-md border border-border bg-secondary/70 px-1.5 py-0.5 text-[11px] font-bold text-muted-foreground uppercase"
                  >
                    {a}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[10px] font-medium text-muted-foreground/50 italic">
                Sin alérgenos
              </p>
            )}
          </div>
        </div>
      </article>

      {/* VERSIÓN MÓVIL (Lista) */}
      <button
        onClick={() => navigate(`/producto/${item.id_slug}`)}
        className="md:hidden relative flex w-full items-center gap-4 bg-white p-3 border-b border-gray-100 group active:bg-gray-50 transition-colors"
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
          <img
            src={productImage}
            alt={item.description}
            className="h-full w-full object-cover"
          />
          {item.product_number && (
            <div className="absolute top-1 left-1 bg-black text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
              {item.product_number}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col pr-6 text-left">
          <h3 className="text-[15px] font-bold leading-tight text-black line-clamp-2 uppercase">
            {item.name}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-black text-black">
              {hasMultiplePrices && (
                <span className="text-[10px] font-medium mr-1">Desde</span>
              )}
              {minPrice.toFixed(2)}€
            </span>
          </div>

          {/* Alérgenos en puntos para no saturar el móvil */}
          {Array.isArray(item.allergens) && item.allergens.length > 0 && (
            <div className="mt-2 flex gap-1.5">
              {item.allergens.slice(0, 4).map((a) => (
                <div
                  key={a}
                  className="h-1.5 w-1.5 rounded-full bg-amber-400"
                  title={a}
                />
              ))}
            </div>
          )}
        </div>

        <div className="absolute right-2">
          <ChevronRight className="h-5 w-5 text-gray-300" />
        </div>
      </button>
    </>
  );
}
