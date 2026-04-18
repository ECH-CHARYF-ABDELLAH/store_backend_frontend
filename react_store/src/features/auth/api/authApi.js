import api from "../../../api/axios";

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};