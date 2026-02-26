import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { AlertCircle, Plus, Trash2, Upload, Loader2 } from "lucide-react";
import type { Product } from "@/interfaces/Product";
import { allergenLabels } from "@/lib/menu-data";

interface ProductFormProps {
  product: Product | null;
  onSave: () => void;
  onCancel: () => void;
}

const categories = [
  "pizzas",
  "pan_pizzas_xxl",
  "pizza_al_corte",
  "empanadas",
  "bocadillos",
  "entrantes",
];

export default function ProductForm({
  product,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    id_slug: "",
    description: "",
    category: "pizzas",
    image: "",
    product_number: "",
  });

  const [priceEntries, setPriceEntries] = useState<
    { label: string; value: string }[]
  >([{ label: "unico", value: "" }]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        id_slug: product.id_slug,
        description: product.description || "",
        category: product.category,
        image: product.image || "",
        product_number: product.product_number?.toString() || "",
      });
      const prices = Object.entries(product.prices).map(([label, value]) => ({
        label,
        value: value.toString(),
      }));
      setPriceEntries(
        prices.length > 0 ? prices : [{ label: "unico", value: "" }],
      );
      setSelectedAllergens(product.allergens || []);
    }
  }, [product]);

  // --- LÓGICA PARA SUBIR IMAGEN AL STORAGE ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError("");

      // Creamos un nombre único para el archivo
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      // 1. Subir al bucket 'images' (asegúrate de que el bucket sea público en Supabase)
      const { error: uploadError } = await supabase.storage
        .from("product_images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obtener la URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from("product_images").getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image: publicUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };
  const toggleAllergen = (id: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const pricesObj: Record<string, number> = {};
      priceEntries.forEach((entry) => {
        if (entry.label && entry.value)
          pricesObj[entry.label.toLowerCase()] = parseFloat(entry.value);
      });

      const payload = {
        name: formData.name,
        id_slug: `${formData.category}_${formData.name}`
          .toLowerCase()
          .normalize("NFD") // Separa las letras de sus tildes (ej: "é" -> "e" + "´")
          .replace(/[\u0300-\u036f]/g, "") // Elimina las tildes sueltas
          .replace(/[^a-z0-9\s_]/g, "")
          .trim()
          .replace(/\s+/g, "_") // Sustituye los espacios por guiones bajos
          .replace(/_+/g, "_"), // Evita que se junten dos guiones bajos seguidos
        description: formData.description,
        category: formData.category,
        image: formData.image,
        // Solo enviamos el número si la categoría es bocadillos
        product_number:
          formData.category === "bocadillos"
            ? parseInt(formData.product_number) || null
            : null,
        prices: pricesObj,
        allergens: selectedAllergens,
      };

      if (product?.id) {
        const { error: err } = await supabase
          .from("products")
          .update(payload)
          .eq("id", product.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase
          .from("products")
          .insert([payload]);
        if (err) throw err;
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold uppercase">
          <AlertCircle className="h-5 w-5" /> {error}
        </div>
      )}

      {/* Nombre y Categoría */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase">Nombre *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-2 border-black p-2 outline-none focus:bg-gray-50"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase">Categoría *</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full border-2 border-black p-2 outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/_/g, " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* INPUT CONDICIONAL: Solo aparece si es bocadillos */}
      {formData.category === "bocadillos" && (
        <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
          <label className="text-xs font-black uppercase text-amber-600">
            Número de Bocadillo (Campo único)
          </label>
          <input
            type="number"
            value={formData.product_number}
            onChange={(e) =>
              setFormData({ ...formData, product_number: e.target.value })
            }
            placeholder="Ej: 1, 2, 3..."
            className="w-full border-2 border-amber-500 p-2 outline-none bg-amber-50"
          />
        </div>
      )}

      {/* Descripción */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase">Descripción *</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border-2 border-black p-2 outline-none h-24 resize-none"
          placeholder="Ingredientes, preparación..."
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black uppercase">Alérgenos</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(allergenLabels).map(([id, label]) => (
            <button
              type="button"
              key={id}
              onClick={() => toggleAllergen(id)}
              className={`p-2 text-[10px] font-bold border-2 transition-all ${
                selectedAllergens.includes(id)
                  ? "bg-black text-white border-black"
                  : "border-gray-100 text-gray-400"
              }`}
            >
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Gestión de Imagen con Storage */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase">
          Imagen del Producto
        </label>
        <div className="flex gap-4 items-start">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 border-2 border-dashed border-black flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white overflow-hidden relative"
          >
            {formData.image ? (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Upload className="h-6 w-6" />
                )}
                <span className="text-[10px] font-bold uppercase mt-2">
                  Subir
                </span>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="URL de la imagen"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full border-2 border-black p-2 text-xs outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold italic">
              Puedes subir un archivo o pegar una URL directa.
            </p>
          </div>
        </div>
      </div>

      {/* Precios y Alérgenos (Mantengo la lógica anterior) */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase">
          Precios y Tamaños *
        </label>
        {priceEntries.map((entry, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              placeholder="Ej: normal, xxl..."
              value={entry.label}
              onChange={(e) => {
                const newEntries = [...priceEntries];
                newEntries[index].label = e.target.value;
                setPriceEntries(newEntries);
              }}
              className="flex-1 border-2 border-black p-2 text-sm"
              required
            />
            <input
              type="number"
              step="0.01"
              value={entry.value}
              onChange={(e) => {
                const newEntries = [...priceEntries];
                newEntries[index].value = e.target.value;
                setPriceEntries(newEntries);
              }}
              className="w-24 border-2 border-black p-2 text-sm"
              required
            />
            {priceEntries.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setPriceEntries(priceEntries.filter((_, i) => i !== index))
                }
                className="p-2 text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setPriceEntries([...priceEntries, { label: "", value: "" }])
          }
          className="flex items-center gap-2 text-[10px] font-black uppercase border-2 border-dashed border-gray-300 w-full justify-center py-2"
        >
          <Plus className="h-3 w-3" /> Añadir tamaño
        </button>
      </div>

      <div className="flex gap-4 pt-4 border-t-2 border-black">
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 bg-black text-white font-black uppercase py-4 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {product ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 border-2 border-black font-black uppercase"
        >
          X
        </button>
      </div>
    </form>
  );
}
