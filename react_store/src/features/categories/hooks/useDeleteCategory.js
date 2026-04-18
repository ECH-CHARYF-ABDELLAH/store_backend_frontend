import { useState } from "react";
import { deleteCategory } from "../api/CategoiresApi";

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeCategory = async (id, onSuccess) => {
    try {
      setLoading(true);
      setError(null);

      const res = await deleteCategory(id);

      if (onSuccess) onSuccess(res);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { removeCategory, loading, error };
};