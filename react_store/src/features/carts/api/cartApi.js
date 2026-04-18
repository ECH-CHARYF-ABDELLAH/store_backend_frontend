// src/features/cart/api/cartApi.js

import api from "../../../api/axios";

// Add to cart
export const addToCart = (data) => {
  return api.post("/cart/add", data);
};

// Checkout
// export const checkout = () => {
//   return api.post("/checkout");
// };

export const getCart = (params) => {
  return api.get("/cart", { params });
};

export const getCartCount = () => {
  return api.get("/cart/count");
};

export const updateCartItem = (id, quantity) => {
  return api.put(`/cart/${id}`, { quantity });
};

export const deleteCartItem = (id) => {
  return api.delete(`/cart/${id}`);
};


export const checkout = async () => {
  const res = await api.post("/checkout");

  window.location.href = res.data.url; // 🔥 redirect to Stripe
};