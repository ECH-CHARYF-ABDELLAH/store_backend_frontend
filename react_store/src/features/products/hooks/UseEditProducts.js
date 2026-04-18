import { useState } from "react";
import { updateProduct } from "../api/productsApi";

export const useEditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editProduct = async (id, formData, callback) => {
    try {
      setLoading(true);
      await updateProduct(id, formData);
      callback && callback();
    } catch (err) {
      setError(err.response?.data || "Error");
    } finally {
      setLoading(false);
    }
  };

  return { editProduct, loading, error };
};