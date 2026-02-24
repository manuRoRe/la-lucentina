import { supabase } from "@/lib/supabase";
import type { Product } from "@/interfaces/Product";

export async function getProductsAction(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("product_number", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("Error en getProductsAction:", error);
    throw new Error("No se pudieron cargar los productos");
  }

  return data as Product[];
}
