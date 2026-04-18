import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../../hooks/UseCreateProducts";
import { useCategories } from "../../../categories/hooks/UseCategories";
import { FaCloudUploadAlt, FaArrowLeft, FaBoxOpen } from "react-icons/fa";

function AddProduct() {
  const navigate = useNavigate();
  const { addProduct, loading, error } = useCreateProduct();
  const { data } = useCategories("");
  const categories = data?.data || [];

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setForm({ ...form, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    addProduct(formData, () => {
      navigate("/admin/products");
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button & Title */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-sm"
        >
          <FaArrowLeft /> Back to list
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-900 p-8 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FaBoxOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Create New Product</h2>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">General Information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Text Inputs */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Product Name</label>
                <input
                  name="name"
                  placeholder="e.g. Nike Air Max"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl py-3 px-4 outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Category</label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl py-3 px-4 outline-none transition-all font-medium appearance-none"
                >
                  <option value="">Choose a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 rounded-xl py-3 px-4 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Stock Units</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="0"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 rounded-xl py-3 px-4 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Description & Image */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Description</label>
                <textarea
                  name="description"
                  placeholder="Write something about this product..."
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 rounded-xl py-3 px-4 outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Product Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label 
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all overflow-hidden"
                  >
                    {preview ? (
                      <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaCloudUploadAlt className="w-10 h-10 text-indigo-400 mb-2" />
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Click to upload</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold animate-shake">
              ⚠️ {typeof error === 'string' ? error : "Please check your inputs."}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Create Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl font-black text-sm uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;