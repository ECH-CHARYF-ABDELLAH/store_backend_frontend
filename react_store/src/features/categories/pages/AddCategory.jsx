import { useState } from "react";
import { useCreateCategory } from "../hooks/useCraeteCategory";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaArrowLeft, FaLayerGroup, FaExclamationCircle } from "react-icons/fa";

function AddCategory() {
  const [name, setName] = useState("");
  const { addCategory, loading, error } = useCreateCategory();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({ name }, () => {
      navigate("/admin/categories");
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-colors font-bold text-sm"
        >
          <FaArrowLeft size={12} /> Back to Categories
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* --- DARK HEADER --- */}
        <div className="bg-gray-900 p-8 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <FaPlus size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">New Category</h2>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Organize your inventory</p>
          </div>
        </div>

        {/* --- FORM BODY --- */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-tighter flex items-center gap-2">
                <FaLayerGroup className="text-amber-500" /> Category Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Electronics, Home Decor, Shoes..."
                className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl py-4 px-5 outline-none transition-all font-bold text-gray-700 placeholder:font-normal placeholder:text-gray-400"
                autoFocus
              />
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide px-1">
                Use a unique and descriptive name for better organization.
              </p>
            </div>
          </div>

          {/* --- ERROR MESSAGE --- */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3 animate-shake">
              <FaExclamationCircle />
              <span>{typeof error === 'string' ? error : "An error occurred while saving."}</span>
            </div>
          )}

          {/* --- ACTION BUTTONS --- */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full sm:flex-1 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-amber-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Save Category"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="w-full sm:w-auto px-10 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl font-black text-sm uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* --- INFO CARD --- */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4">
        <div className="text-amber-500 pt-1">
          <FaExclamationCircle size={18} />
        </div>
        <p className="text-sm text-amber-800 font-medium leading-relaxed">
          Adding a category allows you to group products together, making it easier for customers to find what they are looking for in your store.
        </p>
      </div>
    </div>
  );
}

export default AddCategory;