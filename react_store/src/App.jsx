import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/pages/login";
import DashboardLayout from "./layout/DashboardLayout";
import CartPage from "./features/carts/pages/CartPage";

import Products from "./features/products/admin/pages/Products";
import Categories from "./features/categories/pages/Categories";

import AddProduct from "./features/products/admin/pages/AddProduct";
import EditProduct from "./features/products/admin/pages/EditProduct";

import AddCategory from "./features/categories/pages/AddCategory";
import EditCategory from "./features/categories/pages/EditCategory";

import ProductsCards from "./features/products/user/ProductsCards";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./features/auth/hooks/useAuth";
import AdminOrdersPage from "./features/order/pages/admin/AdminOrdersPage";
import AdminDashboard from "./features/dashboord/pages/AdminDashboard";
import UsersPage from "./features/users/pages/UsersPage";
import UserOrdersPage from "./features/order/pages/UserOrdersPage";

import "./index.css";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* 🔥 ROOT "/" SMART REDIRECT */}
      <Route
        path="/"
        element={
          user ? (
            user.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <ProductsCards />
            )
          ) : (
            <ProductsCards /> // 👈 guest يقدر يدخل عادي
          )
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} role="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* <Route index element={<h1>Admin Home</h1>} /> */}

        <Route path="products" element={<Products />} />
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="products/create" element={<AddProduct />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="users" element={<UsersPage />} />

        <Route path="categories" element={<Categories />} />
        <Route path="categories/create" element={<AddCategory />} />
        <Route path="categories/:id/edit" element={<EditCategory />} />
      </Route>

      {/* fallback */}
      <Route
        path="*"
        element={
          user?.role === "admin" ? (
            <Navigate to="/admin" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute user={user} role="user">
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute user={user} role="user">
            <UserOrdersPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
