import { updateCartItem, deleteCartItem } from "../api/cartApi";
import { useCartContext } from "../context/CartContext";

export const useCartActions = () => {
  const { fetchCount } = useCartContext();

  const handleUpdate = async (id, quantity, cb) => {
    try {
      await updateCartItem(id, quantity);

      fetchCount();
      if (cb) cb(); // 🔥 refetch
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, cb) => {
    try {
      await deleteCartItem(id);

      fetchCount();
      if (cb) cb();
    } catch (err) {
      console.error(err);
    }
  };

  return { handleUpdate, handleDelete };
};