import { useParams, useNavigate } from "react-router-dom";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useEditCategoryForm } from "../hooks/useEditCategoryForm";
import { FaEdit, FaArrowLeft, FaLayerGroup, FaSave, FaHashtag } from "react-icons/fa";
import LoadingScreen from "../../../layout/LoadingScreen";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { editCategory, loading: saving } = useUpdateCategory();
  const { form, handleChange, loading } = useEditCategoryForm(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    editCategory(id, form, () => {
      navigate("/admin/categories");
    });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Navigation */}
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
        <div className="bg-gray-900 p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 text-white">
              <FaEdit size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Edit Category</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-widest flex items-center gap-1">
                <FaHashtag size={10} /> ID: {id?.slice(0, 8)}
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="bg-amber-500/10 text-amber-500 px-4 py-2 rounded-xl text-xs font-black uppercase border border-amber-500/20">
              Editing Mode
            </span>
          </div>
        </div>

        {/* --- FORM BODY --- */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-700 uppercase tracking-tighter flex items-center gap-2">
                <FaLayerGroup className="text-amber-500" /> Category Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Category name"
                className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl py-4 px-5 outline-none transition-all font-bold text-gray-700 shadow-sm"
                autoFocus
              />
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide px-1 italic">
                Changing the name will update it across all linked products.
              </p>
            </div>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-50">
            <button
              type="submit"
              disabled={saving || !form.name.trim()}
              className="w-full sm:flex-1 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-amber-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              <FaSave size={14} />
              {saving ? "Updating..." : "Update Category"}
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

      {/* --- WARNING NOTICE --- */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
        <div className="text-blue-500 pt-1">
          <FaEdit size={18} />
        </div>
        <div>
          <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight">Quick Tip</h4>
          <p className="text-sm text-blue-800 font-medium leading-relaxed opacity-80">
            Make sure the new name reflects the products correctly. Consistent naming helps in better SEO and user experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;