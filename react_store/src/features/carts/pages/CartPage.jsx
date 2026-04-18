import { useState, useEffect } from "react";
import { useGetCart } from "../hooks/useGetCart";
import Navbar from "../../../components/Navbar";
import { useCartActions } from "../hooks/useCartActions";
import { useCheckout } from "../../order/hooks/useCheckout";
import Footer from "../../../components/Footer";
import {
  FaTrashAlt,
  FaShoppingBag,
  FaArrowRight,
  FaSearch,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaBox,
} from "react-icons/fa";

function CartPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [quantities, setQuantities] = useState({});
  const {
    checkout,
    loading: checkoutLoading,
    error: checkoutError,
  } = useCheckout();

  const { handleUpdate, handleDelete } = useCartActions();

  const params = {
    name: search,
    category_id: categoryId,
    sort,
    page,
  };

  // Zdna "refetch" bach n-updatiw l-data mli n-cliquiw Save
  const { cartItems, meta, loading, refetch } = useGetCart(params);

  useEffect(() => {
    const initial = {};
    cartItems.forEach((item) => {
      initial[item.id] = item.quantity;
    });
    setQuantities(initial);
  }, [cartItems]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  // Logic dyal Update m3a l-Refresh
  const onSave = (itemId) => {
    const newQty = Number(quantities[itemId]);
    if (newQty > 0) {
      handleUpdate(itemId, newQty, () => {
        refetch(); // 🔥 Had l-ligne hiya li kaddir l-refresh l-data
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar search={search} setSearch={setSearch} setPage={setPage} />

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
              <FaShoppingBag className="text-indigo-600" /> My Basket
            </h2>
            <p className="text-gray-500 font-medium mt-1">
              Review your items and checkout
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
              <input
                placeholder="Filter cart..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all w-40 md:w-56"
              />
            </div>
            <select
              onChange={(e) => setSort(e.target.value)}
              className="bg-gray-50 border-none rounded-xl py-2 px-3 text-xs font-bold text-gray-600 outline-none cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- LEFT: ITEMS LIST --- */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="bg-white p-20 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Syncing Cart...
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="bg-white p-20 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
                <FaBox className="mx-auto text-gray-100 size-16 mb-4" />
                <h3 className="text-xl font-black text-gray-800">
                  Your cart is empty
                </h3>
                <button
                  onClick={() => window.history.back()}
                  className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 group hover:border-indigo-100 transition-all"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 border border-gray-50 overflow-hidden">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaBox size={24} />
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-black text-gray-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                      {item.product.name}
                    </h3>
                    <p className="text-indigo-600 font-black text-sm mt-1">
                      ${item.product.price}{" "}
                      <span className="text-gray-400 font-medium text-xs ml-1">
                        per unit
                      </span>
                    </p>
                  </div>

                  {/* Quantity Input & Update */}
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    <input
                      type="number"
                      min="1"
                      value={quantities[item.id] ?? item.quantity}
                      onChange={(e) =>
                        setQuantities({
                          ...quantities,
                          [item.id]: e.target.value,
                        })
                      }
                      className="w-12 bg-transparent text-center font-black text-gray-700 outline-none"
                    />
                    <button
                      onClick={() => onSave(item.id)}
                      className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-90"
                      title="Update Quantity"
                    >
                      <FaSave size={12} />
                    </button>
                  </div>

                  <div className="flex items-center gap-6 pl-4 border-l border-gray-50">
                    <div className="text-right min-w-[80px]">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Subtotal
                      </p>
                      <p className="font-black text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          !window.confirm(
                            "Are you sure you want to delete this item?",
                          )
                        )
                          return;

                        handleDelete(item.id, () => refetch());
                      }}
                      className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Pagination */}
            {!loading && cartItems.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <button
                  disabled={!meta.prev_page_url}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-2 text-gray-400 hover:text-indigo-600 disabled:opacity-20 transition-all"
                >
                  <FaChevronLeft size={14} />
                </button>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Page {meta.current_page} of {meta.last_page}
                </span>
                <button
                  disabled={!meta.next_page_url}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 text-gray-400 hover:text-indigo-600 disabled:opacity-20 transition-all"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* --- RIGHT: SUMMARY --- */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white sticky top-24 shadow-2xl shadow-indigo-100">
              <h3 className="text-xl font-black mb-8 tracking-tight">
                Order Summary
              </h3>
              <div className="space-y-4 border-b border-white/10 pb-8 mb-8">
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Shipping Cost</span>
                  <span className="text-green-400 font-bold uppercase text-xs">
                    Free Shipping
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                  Total to pay
                </span>
                <span className="text-3xl font-black text-indigo-400">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="mt-8">
                {/* --- CHECKOUT BUTTON --- */}
                <button
                  onClick={checkout}
                  disabled={checkoutLoading}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[2px] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] ${
                    checkoutLoading
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                  }`}
                >
                  {checkoutLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>Proceed to Checkout</>
                  )}
                </button>

                {/* --- ERROR MESSAGE (UPGRADED) --- */}
                {checkoutError && (
                  <div className="mt-6 overflow-hidden bg-red-50 border border-red-100 rounded-[1.5rem] animate-in slide-in-from-top-2 duration-300">
                    <div className="p-4 flex items-start gap-4">
                      {/* Error Icon Area */}
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-red-900 uppercase tracking-tight">
                          Checkout Issue
                        </h4>
                        <p className="text-red-600 text-sm font-medium">
                          {checkoutError.message}
                        </p>

                        {/* Detailed Info if exists */}
                        {(checkoutError.product ||
                          checkoutError.available_stock !== undefined) && (
                          <div className="mt-3 pt-3 border-t border-red-100 flex flex-wrap gap-4">
                            {checkoutError.product && (
                              <div className="text-[10px] font-black uppercase text-red-400 tracking-wider">
                                Product:{" "}
                                <span className="text-red-700">
                                  {checkoutError.product}
                                </span>
                              </div>
                            )}
                            {checkoutError.available_stock !== undefined && (
                              <div className="text-[10px] font-black uppercase text-red-400 tracking-wider">
                                Left in Stock:{" "}
                                <span className="text-red-700">
                                  {checkoutError.available_stock}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
