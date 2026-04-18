import { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";

export const useUserOrders = (filters) => {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getUserOrders(filters);

      setOrders(res.data.data);
      setMeta(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [JSON.stringify(filters)]);

  return { orders, meta, loading, refetch: fetchOrders };
};