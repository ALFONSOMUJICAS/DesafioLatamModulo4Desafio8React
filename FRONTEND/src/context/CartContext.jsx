import React, { createContext, useContext, useMemo, useState } from "react";

// cart = { [id]: { id, name, price, img, qty } }
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (pizza) => {
    if (!pizza || pizza.id == null) return;
    setCart((prev) => {
      const item = prev[pizza.id] || { ...pizza, qty: 0 };
      return { ...prev, [pizza.id]: { ...item, qty: item.qty + 1 } };
    });
  };

  const increase = (id) => {
    setCart((prev) =>
      prev[id]
        ? { ...prev, [id]: { ...prev[id], qty: prev[id].qty + 1 } }
        : prev
    );
  };

  const decrease = (id) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const next = item.qty - 1;
      const copy = { ...prev };
      if (next <= 0) {
        delete copy[id];
        return copy;
      }
      copy[id] = { ...item, qty: next };
      return copy;
    });
  };

  const remove = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const items = useMemo(() => Object.values(cart), [cart]);
  const total = useMemo(
    () => items.reduce((acc, it) => acc + (it.qty || 0) * (it.price || 0), 0),
    [items]
  );

  const value = { cart, items, total, addToCart, increase, decrease, remove };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
