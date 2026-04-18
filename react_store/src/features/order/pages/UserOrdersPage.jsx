import { useState } from "react";
import { useUserOrders } from "../hooks/useUserOrders";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
  FaBox,
  FaSearch,
  FaHistory,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function UserOrdersPage() {
  const [filters, setFilters] = useState({
    product: "",
    min_price: "",
    max_price: "",
    price_sort: "",
    date_sort: "desc",
    page: 1,
  });

  const { orders, meta, loading } = useUserOrders(filters);

  // --- FIX: Functions l-Navbar ---
  const setSearch = (val) => setFilters({ ...filters, product: val, page: 1 });
  const setPage = (val) => setFilters({ ...filters, page: val });

  const getStatusBadge = (status) => {
    const styles = {
      paid: "bg-emerald-50 text-emerald-600 border-emerald-100",
      pending: "bg-amber-50 text-amber-600 border-amber-100",
      failed: "bg-red-50 text-red-600 border-red-100",
    };
    return styles[status] || "bg-gray-50 text-gray-600 border-gray-100";
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Navbar barra l-padding bach t-b9a sticky l-fou9 kamla */}
      <Navbar
        search={filters.product}
        setSearch={setSearch}
        setPage={setPage}
      />

      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* --- HEADER --- */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <FaHistory size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  Order History
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  Track and review your past purchases
                </p>
              </div>
            </div>
          </div>

          {/* --- FILTERS BAR --- */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative col-span-1 md:col-span-1">
              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={12}
              />
              <input
                placeholder="Quick filter..."
                value={filters.product}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
              />
            </div>

            <input
              type="number"
              placeholder="Min Price"
              value={filters.min_price}
              onChange={(e) =>
                setFilters({ ...filters, min_price: e.target.value, page: 1 })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm font-medium"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={filters.max_price}
              onChange={(e) =>
                setFilters({ ...filters, max_price: e.target.value, page: 1 })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm font-medium"
            />

            <select
              value={filters.price_sort}
              onChange={(e) =>
                setFilters({ ...filters, price_sort: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm font-bold text-gray-600 cursor-pointer"
            >
              <option value="">Sort Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>

            <select
              value={filters.date_sort}
              onChange={(e) =>
                setFilters({ ...filters, date_sort: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm font-bold text-gray-600 cursor-pointer"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          {/* --- ORDERS TABLE --- */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-20 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                  Fetching Orders...
                </p>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-20 text-center">
                <FaBox size={48} className="mx-auto text-gray-100 mb-4" />
                <p className="text-gray-400 font-bold italic">
                  No orders found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                        Order Info
                      </th>
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                        Items Details
                      </th>
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                        Amount
                      </th>
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                        Status
                      </th>
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="p-6 text-sm font-bold text-indigo-600">
                          #{order.id}
                        </td>
                        <td className="p-6">
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="text-sm font-medium text-gray-700 flex items-center gap-2"
                              >
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {item.product.name}{" "}
                                <span className="text-gray-400 text-xs font-black">
                                  ×{item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-6 text-center font-black text-gray-900">
                          ${Number(order.total_price).toFixed(2)}
                        </td>
                        <td className="p-6 text-center">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-2 ${getStatusBadge(order.status)}`}
                          >
                            {order.status === "paid" && (
                              <FaCheckCircle size={10} />
                            )}
                            {order.status === "pending" && (
                              <FaClock size={10} />
                            )}
                            {order.status === "failed" && (
                              <FaExclamationCircle size={10} />
                            )}
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <p className="text-xs font-bold text-gray-800">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium">
                            {new Date(order.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* --- PAGINATION --- */}
          {!loading && meta && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Page {meta.current_page} of {meta.last_page}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={!meta.prev_page_url}
                  onClick={() => setPage(filters.page - 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm active:scale-95"
                >
                  <FaChevronLeft size={10} /> Prev
                </button>
                <button
                  disabled={!meta.next_page_url}
                  onClick={() => setPage(filters.page + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm active:scale-95"
                >
                  Next <FaChevronRight size={10} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserOrdersPage;
