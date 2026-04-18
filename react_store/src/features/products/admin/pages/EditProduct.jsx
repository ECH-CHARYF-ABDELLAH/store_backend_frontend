import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShowProduct } from "../../hooks/UseShowProuducts";
import { useEditProduct } from "../../hooks/UseEditProducts";
import { useCategories } from "../../../categories/hooks/UseCategories";
import { FaCloudUploadAlt, FaArrowLeft, FaEdit, FaBox } from "react-icons/fa";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useShowProduct(id);
  const { editProduct, loading: saving } = useEditProduct();
  const { data: categoriesData } = useCategories("");

  const categories = categoriesData?.data || [];

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        stock: data.stock || "",
        category_id: data.category_id || "",
        image: null,
      });
      setPreview(data.image_url || null);
    }
  }, [data]);

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
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    editProduct(id, formData, () => {
      navigate("/admin/products");
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        <p className="text-gray-500 font-bold animate-pulse">Fetching Product Details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-sm"
        >
          <FaArrowLeft /> Back to Products
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-900 p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <FaEdit size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Edit Product</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">ID: #{id?.slice(0, 8)}</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/10">
              Update Mode
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Product Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 px-4 outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Category</label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 outline-none transition-all font-medium"
                >
                  <option value="">Select category</option>
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
                    value={form.price}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Desc & Image */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tighter">Product Image</label>
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="hidden"
                    id="imageEdit"
                  />
                  <label 
                    htmlFor="imageEdit"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all overflow-hidden"
                  >
                    {preview ? (
                      <div className="relative w-full h-full group">
                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-xs font-bold uppercase">Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <FaCloudUploadAlt className="w-10 h-10 text-gray-300 mb-2" />
                        <p className="text-[10px] font-black text-gray-400 uppercase">Upload Image</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-200 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {saving ? "Saving Changes..." : "Update Product"}
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

export default EditProduct;