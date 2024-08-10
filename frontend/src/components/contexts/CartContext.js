import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CART_STORAGE_KEY = 'cartItems';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cartItems state from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId, shopId, price, productName, shopName) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.productId === productId && cartItem.shopId === shopId
    );

    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.productId === productId && cartItem.shopId === shopId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        { productId, shopId, price, quantity: 1, productName, shopName },
      ]);
    }

    toast.success('Item added to cart');
  };

  const removeFromCart = (productId, shopId) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => !(cartItem.productId === productId && cartItem.shopId === shopId)
    );
    setCartItems(updatedCartItems);

    toast.error('Item removed from cart');
  };

  const increaseQuantity = (productId, shopId) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.productId === productId && cartItem.shopId === shopId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (productId, shopId) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.productId === productId && cartItem.shopId === shopId && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);

    toast.info('Cart cleared');
  };

  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    calculateTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
