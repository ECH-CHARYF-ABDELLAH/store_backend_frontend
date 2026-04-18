import { createContext, useContext, useEffect, useState } from "react";
import { getCartCount } from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const res = await getCartCount();
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <CartContext.Provider value={{ count, fetchCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);