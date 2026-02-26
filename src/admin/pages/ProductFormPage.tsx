import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "@/lib/supabase";
import ProductForm from "@/admin/components/ProductForm";
import type { Product } from "@/interfaces/Product";
import { ArrowLeft } from "lucide-react";

export default function ProductFormPage() {
  const { id } = useParams<{ id: string }>(); // Captura el ID de la URL
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      // Si hay ID, es una edición: buscamos el producto
      supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading)
    return <div className="p-10 font-black uppercase">Cargando datos...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 mb-8 font-black uppercase text-xs hover:opacity-50"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al Panel
      </button>

      <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 italic">
        {id ? "Editar Producto" : "Nuevo Producto"}
      </h2>

      <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <ProductForm
          product={product}
          onSave={() => navigate("/admin/dashboard")}
          onCancel={() => navigate("/admin/dashboard")}
        />
      </div>
    </div>
  );
}
