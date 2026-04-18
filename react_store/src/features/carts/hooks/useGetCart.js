import { useState, useEffect } from "react";
import { getCart } from "../api/cartApi";

export const useGetCart = (params) => {
  const [cartItems, setCartItems] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart(params);

      setCartItems(res.data.data);
      setMeta(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [JSON.stringify(params)]);

  return {
    cartItems,
    meta,
    loading,
    refetch: fetchCart, // 🔥 important
  };
};