import { useEffect, useState } from "react";
import { ArrowLeft, AlertCircle, Phone, Info } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/interfaces/Product";
import ContactAlert from "@/components/ContactAlert";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  // Estado para el tamaño/precio seleccionado
  const [selectedSize, setSelectedSize] = useState<string>("");

  // 1. SOLUCIÓN AL PROBLEMA DEL SCROLL
  // Esto fuerza al navegador a empezar arriba del todo al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        const sizes = Object.keys(data.prices);
        // Ordenamos los tamaños si es necesario, o cogemos el primero
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

  // 2. SKELETON LOADER (Mejor que un spinner simple)
  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 px-4 pb-12 animate-pulse">
        <div className="max-w-4xl mx-auto">
          <div className="h-6 w-32 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="flex flex-col gap-4">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              <div className="h-12 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
              <div className="h-24 w-full bg-gray-200 rounded mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-32 px-4 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
          <Info className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2 uppercase tracking-tight">
          Producto no encontrado
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Lo sentimos, parece que este producto no existe o ha sido retirado de
          nuestra carta.
        </p>
        <button
          onClick={() => navigate("/carta")}
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 font-bold hover:bg-neutral-800 transition-colors rounded-full"
        >
          <ArrowLeft className="h-4 w-4" /> VOLVER A LA CARTA
        </button>
      </div>
    );
  }

  const priceOptions = Object.keys(product.prices);
  const currentPrice = product.prices[selectedSize] || 0;
  const productImage =
    product.image && product.image.length > 0
      ? product.image
      : "/images/placeholder.png";

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Botón Volver */}
        <button
          onClick={() => navigate(`/?category=${product.category}`)}
          className="group inline-flex items-center gap-2 text-muted-foreground hover:text-black transition-colors mb-8 font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver al menú
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {/* COLUMNA IZQUIERDA: IMAGEN */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-sm border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gray-100">
              <img
                src={productImage}
                alt={product.name}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Badge de número de producto */}
            {product.product_number && (
              <div className="absolute -top-3 -left-3 h-18 w-18 bg-black text-white flex items-center justify-center rounded-full text-xl font-black shadow-xl border-4 border-white transform -rotate-12 z-10">
                Nº {product.product_number}
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: INFO */}
          <div className="flex flex-col">
            <div className="flex-1">
              <span className="inline-flex px-3 py-1 bg-neutral-100 text-black/60 text-[12px] font-black uppercase tracking-widest mb-4 rounded-full border border-neutral-200">
                {product.category}
              </span>

              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                {product.product_number && `${product.product_number} - `}
                {product.name}
              </h1>

              {/* Selector de Tamaños (Con efecto de iluminación) */}
              {priceOptions.length > 0 && (
                <div className="mb-8">
                  <p className="text-[12px] font-bold uppercase tracking-widest text-black/60 mb-3">
                    Tamaño / Opción
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {priceOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2.5 text-xs font-bold uppercase border transition-all duration-300 rounded-sm ${
                          selectedSize === size
                            ? "bg-black text-white border-black shadow-[0_0_15px_rgba(0,0,0,0.3)] scale-105"
                            : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Precio */}
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tighter">
                  {currentPrice.toFixed(2)}
                </span>
                <span className="text-2xl font-bold text-gray-400">€</span>
              </div>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-gray-200 pl-4">
                {product.description}
              </p>

              {/* Alérgenos */}
              {product.allergens && product.allergens.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <h2 className="font-bold text-xs uppercase tracking-widest text-gray-600">
                      Alérgenos e Intolerancias
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-100 rounded-full text-[12px] font-bold uppercase tracking-wide"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Fijo en Móvil (opcional) o normal */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              <ContactAlert>
                <button className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-black text-white py-4 rounded-lg text-lg font-black uppercase tracking-tight shadow-xl transition-all hover:bg-neutral-800 hover:shadow-2xl active:scale-[0.98]">
                  {/* Efecto de brillo en el botón al hacer hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

                  <Phone className="h-5 w-5 fill-current" />
                  <span>Pedir ahora</span>
                </button>
              </ContactAlert>

              <p className="text-center text-[12px] text-gray-600 mt-3 uppercase tracking-wider">
                Llama para encargar tu pedido
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Definición de animación personalizada en Tailwind (añadir a tailwind.config.js si no funciona) */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
