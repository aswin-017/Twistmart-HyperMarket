import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../assets/css/user/profile/OrderDetails.css';



const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const { userId } = useAuth(); // Get userId from AuthContext

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (!userId) {
                    toast.error('User not authenticated');
                    return;
                }
                const response = await fetch(`http://localhost:5000/api/orders?user_id=${userId}`);
                const result = await response.json();

                if (result.success) {
                    setOrderDetails(result.data);
                } else {
                    toast.error(result.message || 'Failed to fetch order details');
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
                toast.error('An error occurred while fetching order details');
            }
        };

        fetchOrderDetails();
    }, [userId]);

    const calculateTotalPrice = (price, quantity) => price * quantity;

    return (
        <div className="order-details-container">
            <h1 className="order-details-title">Order Details</h1>
            {orderDetails.length === 0 ? (
                <p className="order-details-empty">No orders found.</p>
            ) : (
                <div>
                    {orderDetails.map((item, index) => (
                        <div key={index} className="order-item">
                            <p className="order-item-product">Product: {item.product_name}</p>
                            <p className="order-item-shop">Shop: {item.shop_name}</p>
                            <p className="order-item-price">Price: ₹{item.order_price}</p>
                            <p className="order-item-quantity">Quantity: {item.quantity}</p>
                            <p className="order-item-quantity">Status: {item.status}</p>
                            <p className="order-item-total">Total Price: ₹{calculateTotalPrice(item.order_price, item.quantity)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
