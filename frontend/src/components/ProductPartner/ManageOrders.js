import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/productpartner/ManageOrders.css'; // CSS file for manage orders

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!userId) {
                    toast.error('User not authenticated');
                    return;
                }
                const response = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
                const result = await response.json();

                if (result.success) {
                    setOrders(result.data);
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

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const result = await response.json();

            if (result.success) {
                setOrders(orders.map(order =>
                    order.order_id === orderId ? { ...order, status: newStatus } : order
                ));
                toast.success('Order status updated successfully');
            } else {
                toast.error(result.message || 'Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('An error occurred while updating order status');
        }
    };

    return (
        <div className="manage-orders-container">
            <h1 className="manage-orders-title">Manage Orders</h1>
            {orders.length === 0 ? (
                <p className="manage-orders-empty">No orders to display.</p>
            ) : (
                <table className="manage-orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product Name</th>
                            <th>Shop ID</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.product_name}</td>
                                <td>{order.shop_id}</td>
                                <td>{order.quantity}</td>
                                <td>₹{parseFloat(order.price).toFixed(2)}</td>
                                <td>₹{(parseFloat(order.price) * order.quantity).toFixed(2)}</td>
                                <td>{new Date(order.order_date).toLocaleString()}</td>
                                <td>{order.status}</td>
                                <td>
                                    <select
                                        className={`manage-order-status-select option-${order.status}`}
                                        value={order.status}
                                        onChange={(e) => handleUpdateStatus(order.order_id, e.target.value)}
                                    >
                                        <option value="pending" className="option-pending">Pending</option>
                                        <option value="shipped" className="option-shipped">Shipped</option>
                                        <option value="delivered" className="option-delivered">Delivered</option>
                                        <option value="canceled" className="option-canceled">Canceled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageOrders;
