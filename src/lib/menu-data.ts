import {
  UtensilsCrossed,
  Pizza,
  Sandwich,
  Croissant,
  IceCreamCone,
  Wine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Standard EU 14 allergens — only list those present per product. */
export type Allergen =
  | "gluten"
  | "lacteos"
  | "huevos"
  | "frutos-secos"
  | "soja"
  | "apio"
  | "mostaza"
  | "sesamo"
  | "sulfitos"
  | "moluscos"
  | "crustaceos"
  | "pescado"
  | "cacahuetes"
  | "altramuces";

export const allergenLabels: Record<Allergen, string> = {
  gluten: "Gluten",
  lacteos: "Lácteos",
  huevos: "Huevos",
  "frutos-secos": "Frutos secos",
  soja: "Soja",
  apio: "Apio",
  mostaza: "Mostaza",
  sesamo: "Sésamo",
  sulfitos: "Sulfitos",
  moluscos: "Moluscos",
  crustaceos: "Crustáceos",
  pescado: "Pescado",
  cacahuetes: "Cacahuetes",
  altramuces: "Altramuces",
};

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  allergens: Allergen[];
}

export interface MenuCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "entrantes",
    title: "Entrantes",
    icon: UtensilsCrossed,
    description: "Para abrir boca: tapas y entrantes con raíces mediterráneas",
    items: [
      {
        name: "Bruschetta Clásica",
        description:
          "Pan cristal tostado con tomate concassé, albahaca fresca, ajo confitado y AOVE.",
        price: 5.5,
        image: "/images/bruschetta.jpg",
        allergens: ["gluten"],
      },
      {
        name: "Ensalada Caprese",
        description:
          "Mozzarella di bufala, tomate corazón de buey, albahaca y reducción de balsámico de Módena.",
        price: 8.5,
        image: "/images/caprese.jpg",
        allergens: ["lacteos"],
      },
      {
        name: "Croquetas de Jamón Ibérico",
        description:
          "Cremosas por dentro, crujientes por fuera. Elaboradas con jamón ibérico de bellota.",
        price: 7.0,
        image: "/images/croquetas.jpg",
        allergens: ["gluten", "lacteos", "huevos"],
      },
      {
        name: "Patatas Bravas Artesanas",
        description:
          "Patatas en dados crujientes con salsa brava casera y alioli de ajo asado.",
        price: 6.0,
        image: "/images/patatas-bravas.jpg",
        allergens: ["huevos", "mostaza"],
      },
      {
        name: "Focaccia de Romero",
        description:
          "Pan focaccia esponjoso con romero fresco, tomate cherry, aceitunas negras y flor de sal.",
        price: 5.0,
        image: "/images/focaccia.jpg",
        allergens: ["gluten"],
      },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    icon: Pizza,
    description:
      "Masa madre de 72h de fermentación, horno de leña y los mejores ingredientes artesanales",
    items: [
      {
        name: "Margherita",
        description:
          "Tomate San Marzano, mozzarella fior di latte, albahaca fresca y aceite de oliva virgen extra.",
        price: 9.5,
        image: "/images/pizza-margherita.jpg",
        allergens: ["gluten", "lacteos"],
      },
      {
        name: "Diavola",
        description:
          "Salami picante, tomate, mozzarella fundida y un toque de guindilla calabresa.",
        price: 11.0,
        image: "/images/pizza-diavola.jpg",
        allergens: ["gluten", "lacteos"],
      },
      {
        name: "Cuatro Quesos",
        description:
          "Gorgonzola, mozzarella, parmesano y fontina sobre base de crema de leche.",
        price: 12.0,
        image: "/images/pizza-cuatro-quesos.jpg",
        allergens: ["gluten", "lacteos"],
      },
      {
        name: "Vegetal de la Huerta",
        description:
          "Pimientos asados, calabacín, berenjena, tomate cherry y rúcula fresca.",
        price: 10.5,
        image: "/images/pizza-vegetal.jpg",
        allergens: ["gluten"],
      },
      {
        name: "Prosciutto e Rúcula",
        description:
          "Base de mozzarella con prosciutto crudo, rúcula salvaje, parmesano en lascas y AOVE.",
        price: 13.0,
        image: "/images/pizza-prosciutto.jpg",
        allergens: ["gluten", "lacteos"],
      },
      {
        name: "Tartufo e Funghi",
        description:
          "Crema de trufa negra, setas variadas de temporada, mozzarella y aceite de trufa.",
        price: 14.5,
        image: "/images/pizza-trufa.jpg",
        allergens: ["gluten", "lacteos"],
      },
      {
        name: "BBQ Chicken",
        description:
          "Pollo marinado, salsa BBQ ahumada, cebolla caramelizada, mozzarella y cilantro fresco.",
        price: 12.5,
        image: "/images/pizza-bbq.jpg",
        allergens: ["gluten", "lacteos", "mostaza", "sulfitos"],
      },
    ],
  },
  {
    id: "bocadillos",
    title: "Bocadillos",
    icon: Sandwich,
    description:
      "Pan artesanal de nuestro horno con rellenos de primera calidad",
    items: [
      {
        name: "Jamón Ibérico con Tomate",
        description:
          "Jamón ibérico de bellota cortado a cuchillo sobre pan de cristal con tomate rallado y AOVE.",
        price: 9.5,
        image: "/images/bocadillo-jamon.jpg",
        allergens: ["gluten"],
      },
      {
        name: "Lomo con Pimientos",
        description:
          "Lomo de cerdo a la plancha con pimientos del piquillo asados y queso manchego curado.",
        price: 8.0,
        image: "/images/bocadillo-lomo.jpg",
        allergens: ["gluten", "lacteos"],
      },
      {
        name: "Vegetal Gourmet",
        description:
          "Calabacín y berenjena a la plancha, pimiento asado, queso de cabra y rúcula en pan de semillas.",
        price: 7.5,
        image: "/images/bocadillo-vegetal.jpg",
        allergens: ["gluten", "lacteos", "sesamo"],
      },
      {
        name: "Pollo Pesto",
        description:
          "Pechuga de pollo a la plancha con pesto genovés, tomate seco, mozzarella fresca en chapata.",
        price: 8.5,
        image: "/images/bocadillo-pollo.jpg",
        allergens: ["gluten", "lacteos", "frutos-secos"],
      },
    ],
  },
  {
    id: "reposteria",
    title: "Repostería",
    icon: Croissant,
    description:
      "Bollería y dulces elaborados cada mañana en nuestro obrador artesano",
    items: [
      {
        name: "Croissant de Mantequilla",
        description:
          "Hojaldrado artesanal con mantequilla francesa. Crujiente por fuera, tierno por dentro.",
        price: 2.8,
        image: "/images/croissant.jpg",
        allergens: ["gluten", "lacteos", "huevos"],
      },
      {
        name: "Tarta de Chocolate Belga",
        description:
          "Ganache de chocolate 70% cacao, base crujiente de galleta y cacao puro espolvoreado.",
        price: 4.5,
        image: "/images/tarta-chocolate.jpg",
        allergens: ["gluten", "lacteos", "huevos", "soja"],
      },
      {
        name: "Napolitanas de Chocolate",
        description:
          "Hojaldre relleno de chocolate negro fundido. Recién salidas del horno cada mañana.",
        price: 2.5,
        image: "/images/napolitanas.jpg",
        allergens: ["gluten", "lacteos", "huevos", "soja"],
      },
      {
        name: "Tarta de Queso Vasca",
        description:
          "Nuestra tarta de queso al estilo San Sebastián, cremosa por dentro con exterior caramelizado.",
        price: 5.0,
        image: "/images/tarta-queso.jpg",
        allergens: ["lacteos", "huevos", "gluten"],
      },
      {
        name: "Palmeras de Hojaldre",
        description:
          "Hojaldradas y caramelizadas, crujientes y adictivas. Elaboración artesanal diaria.",
        price: 2.2,
        image: "/images/palmeras.jpg",
        allergens: ["gluten", "lacteos"],
      },
    ],
  },
  {
    id: "postres",
    title: "Postres",
    icon: IceCreamCone,
    description: "Recetas italianas clásicas con un toque de autor",
    items: [
      {
        name: "Tiramisú Clásico",
        description:
          "Capas de mascarpone, bizcocho empapado en café espresso y cacao amargo.",
        price: 5.5,
        image: "/images/tiramisu.jpg",
        allergens: ["gluten", "lacteos", "huevos"],
      },
      {
        name: "Panna Cotta",
        description:
          "Cremosa panna cotta de vainilla con coulis de frutos rojos de temporada.",
        price: 5.0,
        image: "/images/panna-cotta.jpg",
        allergens: ["lacteos"],
      },
      {
        name: "Cannoli Siciliani",
        description:
          "Tubo crujiente relleno de ricotta dulce con pistachos y virutas de chocolate.",
        price: 4.5,
        image: "/images/cannoli.jpg",
        allergens: ["gluten", "lacteos", "huevos", "frutos-secos"],
      },
    ],
  },
  {
    id: "gourmet",
    title: "Gourmet",
    icon: Wine,
    description:
      "Selección de productos locales y de importación para los paladares más exigentes",
    items: [
      {
        name: "Tabla de Quesos Artesanos",
        description:
          "Selección de 5 quesos de la región con membrillo, nueces e higos secos.",
        price: 14.0,
        image: "/images/tabla-quesos.jpg",
        allergens: ["lacteos", "frutos-secos"],
      },
      {
        name: "Aceite de Oliva Virgen Extra",
        description:
          "Cosecha temprana, variedad arbequina. Botella de 500ml con D.O. protegida.",
        price: 12.5,
        image: "/images/aceite-oliva.jpg",
        allergens: [],
      },
      {
        name: "Conservas Gourmet",
        description:
          "Selección de conservas artesanales: anchoas del Cantábrico, pimientos de piquillo y más.",
        price: 8.0,
        image: "/images/conservas.jpg",
        allergens: ["pescado", "sulfitos"],
      },
      {
        name: "Tabla de Embutidos Ibéricos",
        description:
          "Jamón ibérico de bellota, lomo, chorizo y salchichón curados artesanalmente.",
        price: 16.0,
        image: "/images/embutidos.jpg",
        allergens: ["sulfitos"],
      },
    ],
  },
];
