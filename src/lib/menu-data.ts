import {
  UtensilsCrossed,
  Pizza,
  Sandwich,
  LayoutTemplate,
  PieChart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Standard EU 14 allergens — only list those present per product. */
export type Allergen =
  | "altamuces"
  | "crustaceos"
  | "frutos-secos"
  | "gluten"
  | "huevos"
  | "leche"
  | "moluscos"
  | "mostaza"
  | "pescado"
  | "soja"
  | "sulfitos";

export const allergenLabels: Record<Allergen, string> = {
  gluten: "Gluten",
  leche: "Lácteos",
  huevos: "Huevos",
  "frutos-secos": "Frutos secos",
  soja: "Soja",
  mostaza: "Mostaza",
  sulfitos: "Sulfitos",
  moluscos: "Moluscos",
  crustaceos: "Crustáceos",
  pescado: "Pescado",
  altamuces: "Altamuces",
};

export interface MenuCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "entrantes",
    title: "Entrantes",
    icon: UtensilsCrossed,
    description: "Para abrir boca",
  },
  {
    id: "pizzas",
    title: "Pizzas",
    icon: Pizza,
    description:
      "Horno de piedra y los mejores ingredientes. +1€ si las quieres mitad y mitad y +1€ si quieres algún ingrediente extra",
  },
  {
    id: "bocadillos",
    title: "Bocadillos",
    icon: Sandwich,
    description:
      "Bocadillos XXL o Camperos. Ingredientes extra consultar precio",
  },
  {
    id: "pan_pizzas_xxl",
    title: "Pan Pizza XXL",
    icon: Pizza,
    description:
      "Pan Pizza XXL, + 50cent si los quieres mitad y mitad y +1€ si quieres algun ingrediente extra",
  },
  {
    id: "pizza_al_corte",
    title: "Pizza al Corte",
    icon: LayoutTemplate,
    description:
      "Porciones de pizza al corte, plancha completa = 30x40cm = 4 porciones",
  },
  {
    id: "empanadas",
    title: "Empanadas",
    icon: PieChart,
    description:
      "Empanadas de 30x40cm. Si quieres hacer la tuya personalizada, consúltanos.",
  },
];
