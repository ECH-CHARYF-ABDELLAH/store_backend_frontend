import { useEffect, useState } from "react";
import { getAdminOrders } from "../api/adminOrdersApi";

export const useAdminOrders = (filters = {}) => {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async (customFilters = filters) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAdminOrders(customFilters);

      setOrders(res.data.data); // orders list
      setMeta(res.data);        // pagination meta
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load orders");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // auto fetch on mount or filters change
  useEffect(() => {
    fetchOrders(filters);
  }, [
    filters.user,
    filters.product,
    filters.min_price,
    filters.max_price,
    filters.price_sort,
    filters.date_sort,
  ]);

  return {
    orders,
    meta,
    loading,
    error,
    refetch: fetchOrders,
  };
};