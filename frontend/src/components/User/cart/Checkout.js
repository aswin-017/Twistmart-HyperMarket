import '../../../assets/css/user/cart/Checkout.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCashRegister, FaCreditCard, FaShoppingCart } from 'react-icons/fa';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const { userId } = useAuth(); // Get userId from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!userId) {
          toast.error('User not authenticated');
          return;
        }
        const response = await fetch(`http://localhost:5000/api/cart?user_id=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch cart items');
        const result = await response.json();
        
        console.log('Fetched cart items:', result); // Debugging line

        setCartItems(result);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast.error('An error occurred while fetching cart items');
      }
    };

    fetchCartItems();
  }, [userId]);

  const calculateTotalPrice = (item) => item.price * item.quantity;

  const calculateTotalOrderedPrice = () => {
    return cartItems.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };

  const handlePlaceOrder = async (paymentMethod) => {
    try {
      if (!userId) {
        toast.error('User not authenticated');
        return;
      }
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          cartItems,
          payment_method: paymentMethod,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Order placed successfully!');
        setCartItems([]); // Clear cart items locally
        navigate('/products');
      } else {
        toast.error(result.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing the order');
    }
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
              <p className="checkout-item-name">Product: {item.product_name}</p>
              <p className="checkout-item-shop">Shop: {item.shop_name}</p>
              <p className="checkout-item-price">Price: ₹{item.price}</p>
              <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
              <p className="checkout-item-total">Total Price: ₹{calculateTotalPrice(item)}</p>
            </div>
          ))}
          <div className="checkout-total">
            <h2 className="checkout-total-price">Total Ordered Price: ₹{calculateTotalOrderedPrice()}</h2>
          </div>
          <div className="checkout-buttons">
            <button className="checkout-place-order-btn" onClick={() => handlePlaceOrder('credit_card')}>
              <FaCreditCard className="icon" /> Pay with Card
            </button>
            <button className="checkout-cash-on-delivery-btn" onClick={() => handlePlaceOrder('cash_on_delivery')}>
              <FaCashRegister className="icon" /> Cash on Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
