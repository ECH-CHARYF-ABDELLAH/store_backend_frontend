import { useEffect } from "react";
import api from "../api/api";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");

  useEffect(() => {
    const markPaid = async () => {
      await api.post(`/orders/${orderId}/mark-paid`);
    };

    if (orderId) markPaid();
  }, [orderId]);

  return (
    <div>
      <h1>Payment Successful 🎉</h1>
    </div>
  );
}

export default Success;