import { useState, useEffect } from "react";
import { getCategory } from "../api/CategoiresApi";

export const useCategory = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getCategory(id);

        setData(res); // ✔️ direct object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return { data, loading, error };
};