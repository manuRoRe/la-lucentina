import { Info } from "lucide-react";
import { type Allergen, allergenLabels } from "@/lib/menu-data"; // Ajusta el path según tu proyecto
import type { Product } from "@/interfaces/Product";

interface AllergenTableProps {
  categoryTitle: string;
  products: Product[];
}

export function AllergenTable({ categoryTitle, products }: AllergenTableProps) {
  const presentAllergens = Array.from(
    new Set(products.flatMap((item) => item.allergens || [])),
  ).filter((a) => a in allergenLabels) as Allergen[];

  if (presentAllergens.length === 0 || products.length === 0) return null;

  return (
    <div className="mt-16 animate-in fade-in duration-700">
      <div className="mb-4 flex items-center gap-2">
        <Info className="h-4 w-4 text-muted-foreground" />
        <h4 className="text-sm font-bold uppercase tracking-tight text-foreground">
          Matriz de alérgenos — {categoryTitle}
        </h4>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
        <table className="w-full min-w-[500px] text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-black text-white">
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">
                Producto
              </th>
              {presentAllergens.map((a) => (
                <th
                  key={a}
                  className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider"
                >
                  {allergenLabels[a]}
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
                {presentAllergens.map((a) => (
                  <td key={a} className="px-3 py-3 text-center">
                    {item.allergens?.includes(a) ? (
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
  );
}
