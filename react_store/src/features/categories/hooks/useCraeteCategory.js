import { useState } from "react";
import { createCategory } from "../api/CategoiresApi";

export const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addCategory = async (data, onSuccess) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await createCategory(data);

      setSuccess(true);

      if (onSuccess) onSuccess(res);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addCategory, loading, error, success };
};