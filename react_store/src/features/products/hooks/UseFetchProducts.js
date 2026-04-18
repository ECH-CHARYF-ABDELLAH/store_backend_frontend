import { useState, useEffect } from "react";
import { fetchProducts } from "../api/productsApi";

export const UseFetchProducts = (params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts(params);
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [JSON.stringify(params)]); // 🔥 مهم

  return { data, loading, error, refetch: getProducts };
};