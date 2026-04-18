import api from "../../../api/axios";

// get user orders
export const getUserOrders = (params) => {
  return api.get("/orders", { params });
};