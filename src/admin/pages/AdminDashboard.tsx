import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, LogOut } from "lucide-react";
import { getProductsAction } from "@/actions/get-all-products";
import type { Product } from "@/interfaces/Product";
import { menuCategories } from "@/lib/menu-data";
import { useNavigate } from "react-router";

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await getProductsAction();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = filter
    ? products.filter((p) => p.category === filter)
    : products;

  async function deleteProduct(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">LA LUCENTINA - Admin</h1>
            </div>
            <button
              onClick={() => cerrarSesion()}
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Gestión de Productos</h2>
          <button
            onClick={() => navigate("/admin/nuevo")}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Nuevo Producto
          </button>
        </div>

        <div className="bg-white border border-black p-6">
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filter === ""
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              Todos ({products.length})
            </button>
            {menuCategories.map((cat) => {
              const count = products.filter(
                (p) => p.category === cat.id,
              ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    filter === cat.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {cat.title} ({count})
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center py-8 text-gray-600">No hay productos</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 px-4 font-bold">Imagen</th>
                    <th className="text-left py-3 px-4 font-bold">Nombre</th>
                    <th className="text-left py-3 px-4 font-bold">Categoría</th>
                    <th className="text-left py-3 px-4 font-bold">Precio</th>
                    <th className="text-center py-3 px-4 font-bold">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <img
                          className="size-16"
                          src={`${product.image}`}
                          alt="product image"
                        />
                      </td>
                      <td className="py-4 px-4">{product.name}</td>
                      <td className="py-4 px-4">{product.category}</td>
                      <td className="py-4 px-4">
                        {Object.values(product.prices).join(" - ")}€
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/editar/${product.id}`)
                            }
                            className="p-2 hover:bg-blue-100 transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="h-5 w-5 text-blue-600" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 hover:bg-red-100 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
