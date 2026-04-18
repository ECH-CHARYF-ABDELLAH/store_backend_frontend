import { useState } from "react";
import { Link } from "react-router-dom";
import { UseFetchProducts } from "../../products/hooks/UseFetchProducts";
import { useCategories } from "../../categories/hooks/UseCategories";
import { useCart } from "../../../features/carts/hooks/useCart";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import {
  FaShoppingCart,
  FaEye,
  FaChevronRight,
  FaChevronLeft,
  FaGhost,
  FaPlus,
  FaMinus
} from "react-icons/fa";

function Products() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  
  // State l-quantity khass ikoun object fih quantity dyal kol product b-id dyalo
  const [quantities, setQuantities] = useState({});

  const params = { name: search, category_id: categoryId, page };

  const { data, loading } = UseFetchProducts(params);
  const { data: categoriesData } = useCategories("");

  const products = data?.data || [];
  const meta = data || {};
  const categories = categoriesData?.data || [];
  const { handleAddToCart } = useCart();

  // Handle local quantity change
  const updateQty = (id, val) => {
    const currentQty = quantities[id] || 1;
    const newQty = Math.max(1, currentQty + val);
    setQuantities({ ...quantities, [id]: newQty });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar search={search} setSearch={setSearch} setPage={setPage} />

      <main className="max-w-[1400px] mx-auto px-4 py-8">
        {/* --- CATEGORIES --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">New Arrivals</h1>
            <p className="text-gray-400 font-medium mt-2 text-sm uppercase tracking-widest">Premium Selection 2026</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-100 md:border-none">
            <button
              onClick={() => setCategoryId("")}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                categoryId === "" ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-400 hover:text-indigo-600 border border-gray-100"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryId(cat.id)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  categoryId === cat.id ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-400 hover:text-indigo-600 border border-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* --- PRODUCTS GRID (4 IN ROW) --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-[2rem]"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <FaGhost size={40} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 tracking-tight">No Items Found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-[2rem] border border-gray-50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 m-3 overflow-hidden rounded-[1.5rem] bg-gray-50">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.stock <= 5 && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                      <p className="text-[10px] font-black text-orange-600 uppercase tracking-tighter">Low Stock</p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[2px] mb-1">
                      {product.category?.name || "Premium"}
                    </p>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-xl font-black text-gray-900 mt-1">${product.price}</p>
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                      <button 
                        onClick={() => updateQty(product.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-500 hover:text-indigo-600 shadow-sm transition-colors"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="text-sm font-black text-gray-800">{quantities[product.id] || 1}</span>
                      <button 
                        onClick={() => updateQty(product.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-500 hover:text-indigo-600 shadow-sm transition-colors"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product.id, quantities[product.id] || 1)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                      >
                        <FaShoppingCart size={12} /> Add
                      </button>
                      <Link
                        to={`/products/${product.id}`}
                        className="w-11 h-11 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 rounded-xl transition-all"
                      >
                        <FaEye size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PAGINATION --- */}
        <div className="flex items-center justify-center gap-4 mt-20">
          <button
            disabled={!meta.prev_page_url}
            onClick={() => setPage((p) => p - 1)}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-2xl hover:border-indigo-600 hover:text-indigo-600 text-gray-400 disabled:opacity-20 transition-all shadow-sm"
          >
            <FaChevronLeft size={14} />
          </button>
          
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-xs font-black text-gray-900 tracking-widest uppercase">
              Page {meta.current_page} <span className="text-gray-200 mx-2">/</span> {meta.last_page || 1}
            </span>
          </div>

          <button
            disabled={!meta.next_page_url}
            onClick={() => setPage((p) => p + 1)}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-2xl hover:border-indigo-600 hover:text-indigo-600 text-gray-400 disabled:opacity-20 transition-all shadow-sm"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Products;