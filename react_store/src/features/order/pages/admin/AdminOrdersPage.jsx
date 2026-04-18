import { useState } from "react";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import { 
  FaSearch, FaUser, FaBoxOpen, FaCalendarAlt, FaSortAmountDown, 
  FaChevronLeft, FaChevronRight, FaShoppingCart, FaReceipt 
} from "react-icons/fa";

function AdminOrdersPage() {
  const [filters, setFilters] = useState({
    user: "",
    product: "",
    price_sort: "",
    date_sort: "",
  });

  const { orders, meta, loading, refetch } = useAdminOrders(filters);

  const handlePage = (page) => {
    refetch(filters, page);
  };

  // Helper function bach n-lawno l-status
  const getStatusStyle = (status) => {
    const styles = {
      paid: "bg-green-100 text-green-700 border-green-200",
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      failed: "bg-red-100 text-red-700 border-red-200",
    };
    return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="p-4 md:p-8 bg-[#f9fafb] min-h-screen space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <FaReceipt size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Orders Management</h1>
            <p className="text-gray-500 text-sm font-medium">Track and manage customer purchases</p>
          </div>
        </div>
      </div>

      {/* --- FILTERS SECTION --- */}
      <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* User Search */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <input
            placeholder="Filter by customer..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-medium"
            value={filters.user}
            onChange={(e) => setFilters({ ...filters, user: e.target.value })}
          />
        </div>

        {/* Product Search */}
        <div className="relative">
          <FaBoxOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <input
            placeholder="Filter by product..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-medium"
            value={filters.product}
            onChange={(e) => setFilters({ ...filters, product: e.target.value })}
          />
        </div>

        {/* Price Sort */}
        <div className="relative">
          <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <select
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none cursor-pointer text-sm font-bold text-gray-600 appearance-none"
            value={filters.price_sort}
            onChange={(e) => setFilters({ ...filters, price_sort: e.target.value })}
          >
            <option value="">Sort Price</option>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>

        {/* Date Sort */}
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <select
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none cursor-pointer text-sm font-bold text-gray-600 appearance-none"
            value={filters.date_sort}
            onChange={(e) => setFilters({ ...filters, date_sort: e.target.value })}
          >
            <option value="">Sort Date</option>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
             <p className="mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest">Loading Orders...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Products</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Total</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-5">
                      <span className="font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-xs">
                        #{order.id}
                      </span>
                    </td>
                    <td className="p-5 font-bold text-gray-700">{order.user?.name}</td>
                    <td className="p-5">
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="text-xs font-medium text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                            {item.product.name} <span className="text-indigo-400 font-bold">×{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span className="font-black text-gray-900">${Number(order.total_price).toFixed(2)}</span>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-5 text-gray-500 text-xs font-medium">
                      {new Date(order.created_at).toLocaleDateString()} <br />
                      <span className="text-[10px] opacity-60 font-normal">{new Date(order.created_at).toLocaleTimeString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- PAGINATION --- */}
      {!loading && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Showing Page {meta.current_page} of {meta.last_page}
          </p>
          <div className="flex gap-2">
            <button
              disabled={!meta.prev_page_url}
              onClick={() => handlePage(meta.current_page - 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm active:scale-95"
            >
              <FaChevronLeft size={10} /> Prev
            </button>
            <button
              disabled={!meta.next_page_url}
              onClick={() => handlePage(meta.current_page + 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm active:scale-95"
            >
              Next <FaChevronRight size={10} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrdersPage;