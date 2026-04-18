import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../hooks/UseCategories";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import {
  FaEdit,
  FaTrash,
  FaSortAmountDown,
  FaSortAmountUp,
  FaPlus,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaLayerGroup
} from "react-icons/fa";

function Categories() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const query = `name=${search}&sort=products_count&direction=${sort}&page=${page}`;
  const { data, loading, error, refetch } = useCategories(query);
  const { removeCategory } = useDeleteCategory();

  const categories = data?.data || [];
  const meta = data || {};

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    removeCategory(id, () => {
      // fach t-m3el refetch blast reload katji smooth kbel
      if(refetch) refetch(); 
      else window.location.reload();
    });
  };

  return (
    <div className="space-y-6">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-100">
            <FaLayerGroup size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Categories</h2>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Manage your product grouping</p>
          </div>
        </div>
        <Link
          to="/admin/categories/create"
          className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
        >
          <FaPlus size={12} /> Add Category
        </Link>
      </div>

      {/* --- FILTERS SECTION --- */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[280px]">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search categories by name..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-sm font-medium"
          />
        </div>

        <button
          onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
          className="flex items-center gap-3 bg-white border border-gray-200 hover:border-amber-500 hover:text-amber-600 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-sm"
        >
          <span className="text-gray-500">Sort by Products:</span>
          {sort === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </button>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Loading Categories...</p>
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500 font-bold bg-red-50">Error loading data. Please try again.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">ID</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Category Name</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Items Count</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-5">
                      <span className="text-xs font-bold text-gray-400 italic">#{cat.id}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 font-bold text-xs uppercase">
                          {cat.name.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-700 group-hover:text-amber-600 transition-colors">
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-black text-gray-600">
                        {cat.products_count} Products
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/categories/${cat.id}/edit`}
                          className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
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

      {/* --- PAGINATION SECTION --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
          Page {meta.current_page || 1} <span className="text-gray-200 mx-2">/</span> {meta.last_page || 1}
        </p>
        <div className="flex gap-2">
          <button
            disabled={!meta.prev_page_url}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm"
          >
            <FaChevronLeft size={10} /> Previous
          </button>
          <button
            disabled={!meta.next_page_url}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm"
          >
            Next <FaChevronRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categories;