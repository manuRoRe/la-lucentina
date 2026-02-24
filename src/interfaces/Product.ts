export interface Product {
  id: string;
  id_slug: string;
  name: string;
  description: string;
  category: string;
  image: string | null;
  allergens: string[];
  product_number: string | null;
  // Al ser un objeto, nos permite acceder a item.prices.xxl o item.prices.normal
  prices: {
    [key: string]: number;
  };
  created_at?: string;
}
