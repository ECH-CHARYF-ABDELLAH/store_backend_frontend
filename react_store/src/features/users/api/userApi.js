import api from "../../../api/axios";

export const getUsers = (params) => {
  return api.get("/admin/users", { params });
};

export const deleteUser = (id) => {
  return api.delete(`/admin/users/${id}`);
};

export const updateUserRole = (id, role) => {
  return api.put(`/admin/users/${id}/role`, { role });
};