import { useState } from "react";
import api from "../../../api/axios";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/checkout");

      const orderId = res.data.order_id;

      const stripeRes = await api.post(`/stripe/session/${orderId}`);

      window.location.href = stripeRes.data.url;

    } catch (err) {
      const data = err?.response?.data;

      setError({
        message: data?.message || "Checkout failed",
        product: data?.product,
        available_stock: data?.available_stock,
      });
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading, error };
};