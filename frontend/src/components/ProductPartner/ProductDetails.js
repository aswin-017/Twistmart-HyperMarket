import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Import your authentication context
import '../../assets/css/productpartner/ProductDetails.css'; // CSS file for product details

const BASE_URL = 'http://localhost:5000'; // Base URL for your backend

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { userId } = useAuth(); // Retrieve the userId from auth context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/api/products/categories/${userId}`);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error as necessary
            }
        };

        fetchProducts();
    }, [userId]);

    const handleManage = (productId) => {
        navigate(`/product_partner/manage-product/${productId}`);
    };

    return (
        <div className="product-details-container">
            <h2>Product Details</h2>
            <table className="product-details-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Base Price</th>
                        <th>Stock Quantity</th>
                        <th>Category Name</th>
                        <th>Category Description</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.product_description}</td>
                            <td>
                                <img src={product.product_image} alt={product.product_name} className="product-details-image" />
                            </td>
                            <td>{product.base_price}</td>
                            <td>{product.stock_quantity}</td>
                            <td>{product.category_name}</td>
                            <td>{product.category_description}</td>
                            {/* <td>
                                <button className="product-details-manage-button" onClick={() => handleManage(product.product_id)}>Manage</button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductDetails;
