import { Info } from "lucide-react";
import { allergenLabels, type Allergen } from "@/lib/menu-data";
import type { Product } from "@/interfaces/Product";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AllergenTableProps {
  categoryTitle: string;
  products: Product[];
}

export function AllergenTable({ categoryTitle, products }: AllergenTableProps) {
  const allergens = (
    Object.entries(allergenLabels) as [Allergen, string][]
  ).map(([key, label]) => ({
    key,
    label,
  }));

  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <Button
        className="mt-16"
        variant={showTable ? "outline" : "default"}
        onClick={() => setShowTable(!showTable)}
      >
        {showTable ? "Ocultar tabla" : "Mostrar tabla de alergenos"}
      </Button>
      <div
        className={cn(
          showTable ? "block " : "hidden",
          " animate-in fade-in duration-700",
        )}
      >
        <div className="my-4 flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-bold uppercase tracking-tight text-foreground">
            Matriz de alérgenos — {categoryTitle}
          </h4>
        </div>

        <div
          id="tabla"
          className="overflow-x-auto rounded-xl border border-border shadow-sm"
        >
          <table className="w-full min-w-[500px] text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-black text-white">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">
                  Producto
                </th>
                {allergens.map((a) => (
                  <th
                    key={a.key}
                    className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider"
                  >
                    {a.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((item, idx) => (
                <tr
                  key={item.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                >
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {item.name}
                  </td>
                  {/* AQUÍ FALTABA LA KEY EN EL TD */}
                  {allergens.map((a) => (
                    <td key={a.key} className="px-3 py-3 text-center">
                      {item.allergens?.includes(a.key) ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
                          !
                        </span>
                      ) : (
                        <span className="text-muted-foreground/30 font-light">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-lg bg-gray-100 p-4">
          <p className="text-[10px] leading-relaxed text-muted-foreground uppercase font-bold tracking-tight">
            Nota: El símbolo (!) indica presencia. Consulta siempre con nuestro
            personal.
          </p>
        </div>
      </div>
    </>
  );
}
