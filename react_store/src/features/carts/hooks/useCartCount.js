import { useEffect, useState } from "react";
import { getCartCount } from "../api/cartApi";

export const useCartCount = () => {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const res = await getCartCount();
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return { count, fetchCount };
};