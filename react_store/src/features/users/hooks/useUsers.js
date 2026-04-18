import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUserRole } from "../api/userApi";

export const useUsers = (filters) => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers(filters);
      setUsers(res.data.data);
      setMeta(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await deleteUser(id);
    fetchUsers();
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [JSON.stringify(filters)]);

  return { users, meta, loading, handleDelete, handleRoleChange };
};