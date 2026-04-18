import api from "../../../api/axios";

export const fetchProducts = async (params = {}) => {
  const res = await api.get("/products", {
    params, // 🔥 axios كيحول object → query string
  });

  return res.data;
};

export const getProduct = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};


// UPDATE product
export const updateProduct = async (id, data) => {
  const res = await api.post(`/products/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};