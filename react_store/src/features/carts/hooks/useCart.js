import { useState } from "react";
import { addToCart, checkout } from "../api/cartApi";
import { useCartContext } from "../context/CartContext";

export const useCart = () => {
  const [loading, setLoading] = useState(false);
  const { fetchCount } = useCartContext();

  const handleAddToCart = async (product_id, quantity = 1) => {
    try {
      setLoading(true);
      await addToCart({ product_id, quantity });

      fetchCount(); // 🔥 دابا غادي يحدث Navbar

      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await checkout();

      fetchCount(); // reset count

      alert("Order done");
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleAddToCart,
    handleCheckout,
  };
};