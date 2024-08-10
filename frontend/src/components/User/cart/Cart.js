import '../../../assets/css/user/cart/Cart.css'
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleRemove = (productId, shopId) => {
    removeFromCart(productId, shopId);
  };

  const handleIncreaseQuantity = (productId, shopId) => {
    increaseQuantity(productId, shopId);
  };

  const handleDecreaseQuantity = (productId, shopId) => {
    decreaseQuantity(productId, shopId);
  };

  const handleProceedToCheckout = () => {
    navigate('/user/checkout');
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p className="cart-item-name">Product: {item.productName}</p>
              <p className="cart-item-shop">Shop: {item.shopName}</p>
              <p className="cart-item-price">Price: ₹{item.price}</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              <p className="cart-item-total">Total Price: ₹{calculateTotalPrice(item)}</p>
              <button className="cart-item-btn" onClick={() => handleIncreaseQuantity(item.productId, item.shopId)}>+</button>
              <button className="cart-item-btn" onClick={() => handleDecreaseQuantity(item.productId, item.shopId)}>-</button>
              <button className="cart-item-btn cart-item-remove-btn" onClick={() => handleRemove(item.productId, item.shopId)}>Remove</button>
            </div>
          ))}
          <button className="cart-proceed-btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
