import { useState } from "react";
import { createProduct } from "../api/productsApi";

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = async (formData, callback) => {
    try {
      setLoading(true);
      await createProduct(formData);
      callback && callback();
    } catch (err) {
      setError(err.response?.data || "Error");
    } finally {
      setLoading(false);
    }
  };

  return { addProduct, loading, error };
};