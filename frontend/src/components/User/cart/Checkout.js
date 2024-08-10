import '../../../assets/css/user/cart/Checkout.css'
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const { cartItems, clearCart, calculateTotalPrice } = useCart();
  const navigate = useNavigate();

  // Function to calculate the total price of all items in the cart
  const calculateTotalOrderedPrice = () => {
    return cartItems.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };

  const handlePlaceOrder = () => {
    // Handle order placement logic here (if needed)
    console.log('Order placed');

    // Clear cart items
    clearCart();

    // Show success message
    toast.success('Order placed successfully!');

    // Redirect to products or another page
    navigate('/products');
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="checkout-empty">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
              <p className="checkout-item-name">Product: {item.productName}</p>
              <p className="checkout-item-shop">Shop: {item.shopName}</p>
              <p className="checkout-item-price">Price: ₹{item.price}</p>
              <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
              <p className="checkout-item-total">Total Price: ₹{calculateTotalPrice(item)}</p>
            </div>
          ))}
          <div className="checkout-total">
            <h2 className="checkout-total-price">Total Ordered Price: ₹{calculateTotalOrderedPrice()}</h2>
          </div>
          <button className="checkout-place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
