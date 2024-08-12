import '../../../assets/css/user/cart/Cart.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { userId } = useAuth(); // Get userId from AuthContext
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cart items when the component mounts
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/cart?user_id=${userId}`);
                if (!response.ok) throw new Error('Failed to fetch cart items');
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleRemove = async (productId, shopId) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: productId,
                    shop_id: shopId
                }),
            });

            if (!response.ok) throw new Error('Failed to remove item from cart');
            setCartItems(cartItems.filter(item => item.product_id !== productId || item.shop_id !== shopId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleIncreaseQuantity = async (productId, shopId) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/increase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: productId,
                    shop_id: shopId
                }),
            });

            if (!response.ok) throw new Error('Failed to increase quantity');
            const updatedCart = await response.json();
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const handleDecreaseQuantity = async (productId, shopId) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/decrease', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: productId,
                    shop_id: shopId
                }),
            });

            if (!response.ok) throw new Error('Failed to decrease quantity');
            const updatedCart = await response.json();
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const handleProceedToCheckout = () => {
        navigate('/user/checkout');
    };

    const calculateTotalPrice = (item) => {
        return item.quantity * item.price;
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
                            <p className="cart-item-name">Product: {item.product_name}</p>
                            <p className="cart-item-shop">Shop: {item.shop_name}</p>
                            <p className="cart-item-price">Price: ₹{item.price}</p>
                            <div className="cart-item-quantity-container">
                                <button className="cart-item-quantity-btn" onClick={() => handleDecreaseQuantity(item.product_id, item.shop_id)}>
                                    <i className="fas fa-minus"></i>
                                </button>
                                <span className="cart-item-quantity">{item.quantity}</span>
                                <button className="cart-item-quantity-btn" onClick={() => handleIncreaseQuantity(item.product_id, item.shop_id)}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <p className="cart-item-total">Total Price: ₹{calculateTotalPrice(item)}</p>
                            <button className="cart-item-remove-btn" onClick={() => handleRemove(item.product_id, item.shop_id)}>
                                <i className="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    ))}
                    <button className="cart-proceed-btn" onClick={handleProceedToCheckout}>
                        <i className="fas fa-check-circle"></i> Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
