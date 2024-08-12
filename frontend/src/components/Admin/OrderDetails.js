import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/admin/OrderDetails.css'; // Regular stylesheet

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!userId) {
                    toast.error('User not authenticated');
                    return;
                }
                const response = await fetch(`http://localhost:5000/api/orderdetails?userId=${userId}`);
                const result = await response.json();

                if (result.success) {
                    // Convert data to ensure numerical values are properly handled
                    const ordersWithNumberValues = result.data.map(order => ({
                        ...order,
                        price: parseFloat(order.price),
                        totalPrice: parseFloat(order.price) * order.quantity
                    }));
                    setOrders(ordersWithNumberValues);
                } else {
                    toast.error(result.message || 'Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('An error occurred while fetching orders');
            }
        };

        fetchOrders();
    }, [userId]);

    // Function to determine status class
    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'status-pending';
            case 'Approved':
                return 'status-approved';
            case 'Cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    return (
        <div className="order-details-container">
            <h1 className="order-details-title">Order Details</h1>
            {orders.length === 0 ? (
                <p className="order-details-empty">No orders to display.</p>
            ) : (
                <table className="order-details-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product Name</th>
                            <th>Shop ID</th>
                            <th>Quantity</th>
                            <th className="price">Price</th>
                            <th className="price">Total Price</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>User Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.product_name}</td>
                                <td>{order.shop_id}</td>
                                <td>{order.quantity}</td>
                                <td className="price">₹{order.price.toFixed(2)}</td>
                                <td className="price">₹{order.totalPrice.toFixed(2)}</td>
                                <td>{new Date(order.order_date).toLocaleString()}</td>
                                <td className={`status ${getStatusClass(order.status)}`}>{order.status}</td>
                                <td>{order.user_email}</td>
                                <td>{order.user_first_name} {order.user_last_name}</td>
                                <td>{order.user_phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderDetails;
