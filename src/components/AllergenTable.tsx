import { Info } from "lucide-react";
// Importamos los tipos y etiquetas desde tu archivo central de datos
import {
  type Allergen,
  allergenLabels,
  type MenuCategory,
} from "../lib/menu-data";

/**
 * Tabla de matriz de alérgenos para una categoría de menú.
 * Filas = productos, columnas = alérgenos presentes en esa categoría.
 */
export function AllergenTable({ category }: { category: MenuCategory }) {
  // Recolectamos solo los alérgenos que aparecen en al menos un producto de esta categoría
  const presentAllergens = Array.from(
    new Set(category.items.flatMap((item) => item.allergens)),
  ) as Allergen[];

  // Si la categoría no tiene alérgenos declarados en ningún producto, no mostramos la tabla
  if (presentAllergens.length === 0) return null;

  return (
    <div className="mt-16 animate-in fade-in duration-700">
      <div className="mb-4 flex items-center gap-2">
        <Info className="h-4 w-4 text-muted-foreground" />
        <h4 className="text-sm font-bold uppercase tracking-tight text-foreground">
          Información de alérgenos — {category.title}
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
            {category.items.map((item, idx) => (
              <tr
                key={item.name}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
              >
                <td className="px-4 py-3 font-semibold text-foreground">
                  {item.name}
                </td>
                {presentAllergens.map((a) => (
                  <td key={a} className="px-3 py-3 text-center">
                    {item.allergens.includes(a) ? (
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] font-black text-white"
                        title={`Contiene ${allergenLabels[a]}`}
                      >
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
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong>Nota:</strong> El símbolo (<strong>!</strong>) indica la
          presencia del alérgeno. Debido a nuestros procesos artesanales, no
          podemos garantizar la ausencia total de trazas. Por favor, consulta
          con nuestro personal al realizar tu pedido por teléfono.
        </p>
      </div>
    </div>
  );
}
