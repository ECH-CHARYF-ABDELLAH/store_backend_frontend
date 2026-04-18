import api from "../../../api/axios";

// 📦 fetch orders with filters
export const getAdminOrders = (params) => {
  return api.get("/admin/orders", { params });
};