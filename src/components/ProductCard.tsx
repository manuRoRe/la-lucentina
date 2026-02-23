import type { Product } from "@/interfaces/Product";
import { Phone, AlertTriangle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export function ProductCard({ item }: { item: Product }) {
  const navigate = useNavigate();
  return (
    <>
      <article className="group md:flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hidden">
        {/* Imagen del producto */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay sutil para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Badge de Precio con el estilo blanco/negro de la tienda */}
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold tracking-tight text-black shadow-sm backdrop-blur-sm">
            {item.price} €
          </span>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold tracking-tight text-card-foreground uppercase">
            {item.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {item.description}
          </p>

          {/* Alérgenos */}
          <div className="mt-4 min-h-[40px]">
            {item.allergens && item.allergens.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 shrink-0 text-muted-foreground" />
                {item.allergens.map((a) => (
                  <span
                    key={a}
                    className="rounded-md border border-border bg-secondary/70 px-1.5 py-0.5 text-[10px] font-medium leading-tight text-muted-foreground uppercase"
                  >
                    {a}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[10px] font-medium text-muted-foreground/60 italic">
                Sin alérgenos declarados
              </p>
            )}
          </div>

          {/* Botón de acción (Llamar) */}
          <div className="mt-4 border-t border-border pt-4">
            <a
              href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-neutral-800 active:scale-95"
            >
              <Phone className="h-3.5 w-3.5" />
              PEDIR AHORA
            </a>
          </div>
        </div>
      </article>
      // Versión móvil simplificada para mejor rendimiento y usabilidad en
      dispositivos pequeños
      <button
        onClick={() => navigate(`/producto/${item.id}`)}
        className="md:hidden flex w-full bg-white border border-black overflow-hidden group hover:shadow-lg transition-all duration-300 active:bg-gray-50"
      >
        <div className="w-24 h-24 shrink-0 overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold line-clamp-2 mb-1">{item.name}</h3>
            <p className="text-xs text-gray-600">{item.price.toFixed(2)}€</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </button>
    </>
  );
}
