import { useEffect, useState } from "react";
import { fetchCategories } from "../api/CategoiresApi";

export const useCategories = (params = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await fetchCategories(params);
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [params]);

  return { data, loading, error, refetch: getCategories };
};