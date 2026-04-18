import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import {
  LayoutDashboard,
  Layers,
  Package,
  LogOut,
  Menu,
  X,
  UserCircle,
} from "lucide-react"; // Sta3malthom f blast emoji bach yji dakchi pro

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-green-600 text-white shadow-lg shadow-green-900/20"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-64 bg-gray-900 text-white
          flex flex-col transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Admin<span className="text-green-500">Panel</span>
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <NavLink to="/admin/dashboard" end className={linkClass}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/categories" className={linkClass}>
            <Layers size={20} /> Categories
          </NavLink>
          <NavLink to="/admin/products" className={linkClass}>
            <Package size={20} /> Products
          </NavLink>
          <NavLink to="/admin/orders" className={linkClass}>
            <Package size={20} /> orders
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            <Package size={20} /> users
          </NavLink>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-green-400">
              <UserCircle size={28} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role || "Manager"}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* NAVBAR */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-6">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          <h2 className="hidden md:block font-semibold text-gray-800">
            Overview System
          </h2>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
              {user?.role || "Admin"}
            </span>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Hna fin kat-render l-page */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
