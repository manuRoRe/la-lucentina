import { useEffect, useState } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/interfaces/Product";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <button
            onClick={() => navigate("/carta")}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  const allergenList = product.allergens ? product.allergens : [];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/carta")}
          className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver al menú
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover border border-black"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex-1">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <span className="text-3xl font-bold">
                  {product.price.toFixed(2)}€
                </span>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {product.description}
              </p>

              {allergenList.length > 0 && (
                <div className="bg-gray-50 border border-black p-6 mb-8">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <h3 className="font-bold text-sm">Alérgenos</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allergenList.map((allergen, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white border border-black text-sm font-medium"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="tel:+34123456789"
              className="block w-full text-center bg-black text-white py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Llamar para pedir
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
