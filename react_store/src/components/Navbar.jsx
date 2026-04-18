import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
  FaBoxOpen,
  FaStore,
  FaSignInAlt,
} from "react-icons/fa";
import { useCartContext } from "../features/carts/context/CartContext";

function Navbar({ search, setSearch, setPage }) {
  const { count } = useCartContext();
  const navigate = useNavigate();

  // --- T-checki wach l-user m-logini ---
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
            <FaStore size={20} />
          </div>
          <h1 className="font-black text-xl tracking-tighter text-gray-900 italic">
            Store<span className="text-indigo-600">Hub</span>
          </h1>
        </Link>

        {/* --- SEARCH BAR --- */}
        {search !== undefined && (
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={14} />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage && setPage(1);
                }}
                placeholder="Search products..."
                className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 px-12 py-2.5 rounded-2xl outline-none transition-all font-medium text-sm"
              />
            </div>
          </div>
        )}

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Ila kan l-user m-logini warrih l-Cart w l-Orders */}
          {isAuthenticated ? (
            <>
              {/* Cart */}
              <Link to="/cart" className="relative p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all" title="My Cart">
                <FaShoppingCart size={22} />
                {count > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {count}
                  </span>
                )}
              </Link>

              {/* Orders */}
              <Link to="/orders" className="p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all" title="My Orders">
                <FaBoxOpen size={22} />
              </Link>

              {/* Divider */}
              <div className="h-8 w-[1px] bg-gray-100 mx-1"></div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95 group"
              >
                <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            /* Ila mamsjjelch, warrih Login */
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 group"
            >
              <FaSignInAlt className="group-hover:translate-x-1 transition-transform" />
              <span>Login</span>
            </Link>
          )}
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;