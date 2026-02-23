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
      {/*  Versión móvil simplificada para mejor rendimiento y usabilidad en
      dispositivos pequeños */}
      <button
        onClick={() => navigate(`/producto/${item.id}`)}
        className="md:hidden relative flex w-full items-center gap-4 bg-white p-3 border-b border-gray-100 group active:bg-gray-50 transition-colors"
      >
        {/* Contenedor de Imagen: Redondeado suave y sombra sutil */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
          <img
            src={item.image || "/placeholder-pizza.jpg"}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Información del Producto */}
        <div className="flex flex-1 flex-col pr-6">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-2xl font-bold leading-tight text-black line-clamp-2 uppercase tracking-tight">
              {item.name}
            </h3>
          </div>

          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="text-sm font-black text-black">
              {item.price.toFixed(2)}€
            </span>
          </div>

          {/* Etiquetas de alérgenos simplificadas para móvil */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="mt-2 flex gap-1">
              {item.allergens.slice(0, 3).map((a) => (
                <div
                  key={a}
                  className="h-1.5 w-1.5 rounded-full bg-gray-200"
                  title={a}
                />
              ))}
            </div>
          )}
        </div>

        {/* Indicador de navegación más elegante */}
        <div className="absolute right-2">
          <ChevronRight className="h-5 w-5 text-gray-300 group-active:text-black transition-colors" />
        </div>
      </button>
    </>
  );
}
