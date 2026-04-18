import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, user, role }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;

  if (!user) return null; // ولا loader

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}