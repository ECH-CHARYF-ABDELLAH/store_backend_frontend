import api from "../../../api/axios";

// 🔥 GET (list with params)
export const fetchCategories = async (params = "") => {
  const res = await api.get(`/categories?${params}`);
  return res.data;
};

// 🔥 CREATE
export const createCategory = async (data) => {
  const res = await api.post("/categories", data);
  return res.data;
};

// 🔥 UPDATE
export const updateCategory = async (id, data) => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

// 🔥 SHOW
export const getCategory = async (id) => {
  const res = await api.get(`/categories/${id}`);
  return res.data;
};

// 🔥 DELETE
export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
