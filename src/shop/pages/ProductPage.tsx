import { useEffect, useState } from "react";
import { ArrowLeft, AlertCircle, Phone } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/interfaces/Product";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Estado para el tamaño/precio seleccionado
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id_slug", id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProduct(data as Product);
        // Establecemos el primer tamaño disponible por defecto (ej: "normal" o "campero")
        const sizes = Object.keys(data.prices);
        if (sizes.length > 0) {
          setSelectedSize(sizes[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 px-4 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4 uppercase">
          Producto no encontrado
        </h1>
        <button
          onClick={() => navigate("/carta")}
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold"
        >
          <ArrowLeft className="h-4 w-4" /> VOLVER AL MENÚ
        </button>
      </div>
    );
  }

  const priceOptions = Object.keys(product.prices);
  const currentPrice = product.prices[selectedSize] || 0;

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/carta")}
          className="inline-flex items-center gap-2 text-black hover:opacity-60 transition-all mb-8 font-bold uppercase text-sm tracking-tight"
        >
          <ArrowLeft className="h-5 w-5" /> Volver al menú
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagen con el número de producto */}
          <div className="relative">
            <img
              src={product.image || "/placeholder-food.jpg"}
              alt={product.name}
              className="w-full aspect-square object-cover border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            />
            {product.product_number && (
              <div className="absolute -top-4 -left-4 h-12 w-12 bg-black text-white flex items-center justify-center rounded-full text-xl font-black shadow-lg">
                {product.product_number}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest mb-4">
                {product.category}
              </span>

              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                {product.name}
              </h1>

              {/* Selector de Tamaños/Precios */}
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Selecciona una opción:
                </p>
                <div className="flex flex-wrap gap-2">
                  {priceOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 text-sm font-bold uppercase border-2 transition-all ${
                        selectedSize === size
                          ? "bg-black border-black text-white shadow-md scale-105"
                          : "bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precio Dinámico */}
              <div className="mb-6">
                <span className="text-5xl font-black tracking-tighter">
                  {currentPrice.toFixed(2)}€
                </span>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Alérgenos */}
              {product.allergens && product.allergens.length > 0 && (
                <div className="border-t border-black pt-6 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <h3 className="font-black text-xs uppercase tracking-widest">
                      Alérgenos
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="px-3 py-1 bg-gray-50 border border-gray-200 text-[10px] font-bold uppercase text-gray-500"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botón de llamada */}
            <a
              href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`}
              className="flex w-full items-center justify-center gap-3 bg-black text-white py-5 text-xl font-black uppercase tracking-tighter hover:bg-neutral-800 transition-all active:scale-95 shadow-xl"
            >
              <Phone className="h-6 w-6" />
              Llamar para pedir
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
