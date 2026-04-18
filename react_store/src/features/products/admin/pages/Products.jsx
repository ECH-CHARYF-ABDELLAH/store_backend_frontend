import { useState } from "react";
import { Link } from "react-router-dom";
import { UseFetchProducts } from "../../hooks/UseFetchProducts";
import { useDeleteProducts } from "../../hooks/useDeleteProducts";
import { useCategories } from "../../../categories/hooks/UseCategories";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Products() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);

  const params = {
    name: search, min_price: minPrice, max_price: maxPrice,
    in_stock: inStock, category_id: categoryId, page,
  };

  const { data, loading, error, refetch } = UseFetchProducts(params);
  const { removeProduct } = useDeleteProducts();
  const { data: categoriesData } = useCategories("");

  const products = data?.data || [];
  const meta = data || {};
  const categories = categoriesData?.data || [];

  const handleDelete = (id) => {
    if (!window.confirm("Bghiti t-msa7 had l-product s7i7?")) return;
    removeProduct(id, refetch);
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Products Management</h2>
          <p className="text-gray-500 text-sm font-medium">Manage, edit and track your inventory.</p>
        </div>
        <Link
          to="/admin/products/create"
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md shadow-indigo-100"
        >
          <FaPlus size={14} /> Add Product
        </Link>
      </div>

      {/* FILTERS SECTION */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
          />
        </div>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium text-gray-600"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium text-gray-600"
        >
          <option value="">Stock Status</option>
          <option value="1">In Stock</option>
          <option value="0">Out of Stock</option>
        </select>

        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-2">
           <input
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 bg-transparent border-none py-2 text-sm outline-none"
          />
          <span className="text-gray-300">|</span>
          <input
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 bg-transparent border-none py-2 text-sm outline-none pl-2"
          />
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-gray-400 font-medium">Loading products data...</div>
        ) : error ? (
          <div className="p-10 text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Price</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image_url}
                          className="w-14 h-14 object-cover rounded-xl shadow-sm border border-gray-100"
                          alt=""
                        />
                        <span className="font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500 font-medium">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs italic">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="p-4 text-center font-black text-gray-800">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                        product.stock > 0 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaTrash size={14} />
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

      {/* PAGINATION SECTION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Showing Page {meta.current_page || 1} of {meta.last_page || 1}
        </p>
        <div className="flex gap-2">
          <button
            disabled={!meta.prev_page_url}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm"
          >
            <FaChevronLeft size={10} /> Prev
          </button>
          <button
            disabled={!meta.next_page_url}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm"
          >
            Next <FaChevronRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;