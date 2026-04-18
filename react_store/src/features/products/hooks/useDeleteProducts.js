import { useState } from "react";
import { deleteProduct } from "../api/productsApi";

export const useDeleteProducts = () => {
  const [loading, setLoading] = useState(false);

  const removeProduct = async (id, onSuccess) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { removeProduct, loading };
};