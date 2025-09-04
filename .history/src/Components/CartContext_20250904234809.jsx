import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children, user }) => {
  const [cartItems, setCartItems] = useState([]);

  // fetch cart from backend
  const fetchCartItems = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get("http://localhost:5000/cardItems", {
        params: { userId: user._id },
      });
      if (res.data.success) setCartItems(res.data.data);
      else setCartItems([]);
    } catch (err) {
      console.error(err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  // Function to update cart manually after add/remove
  const updateCart = (newCart) => setCartItems(newCart);

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
