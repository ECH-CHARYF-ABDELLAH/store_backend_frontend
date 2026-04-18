import { useState } from "react";
import { updateCategory } from "../api/CategoiresApi";

export const useUpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editCategory = async (id, data, onSuccess) => {
    try {
      setLoading(true);
      setError(null);

      const res = await updateCategory(id, data);

      if (onSuccess) onSuccess(res);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { editCategory, loading, error };
};