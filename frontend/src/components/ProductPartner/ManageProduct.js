// src/components/ProductPartner/ManageProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/css/productpartner/ManageProduct.css'; // CSS file for manage product

const ManageProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        product_id: '',
        product_name: '',
        product_description: '',
        product_image: null, // Changed to null initially
        base_price: '',
        stock_quantity: '',
        category_name: '',
        category_description: ''
    });

    const categories = [
        'Fruits & Vegetables',
        'Food Grains, Oil & Masala',
        'Beauty & Hygiene',
        'Appliances & Furnitures',
        'Snacks & Beverages'
    ];

    useEffect(() => {
        // Fetch product details using the id
        // Replace the below mock data with actual API call
        const fetchProduct = async () => {
            // Example mock data, replace with actual data from API
            const mockProduct = {
                product_id: id,
                product_name: 'Example Product',
                product_description: 'This is an example product description.',
                product_image: 'example-product.png', // This should be the URL or null
                base_price: 99.99,
                stock_quantity: 100,
                category_name: 'Fruits & Vegetables',
                category_description: 'This is an example category description.'
            };
            setProduct(mockProduct);
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct(prevState => ({
                ...prevState,
                product_image: file
            }));
        }
    };

    const handleCategoryChange = (e) => {
        setProduct(prevState => ({
            ...prevState,
            category_name: e.target.value
        }));
    };

    const handleSave = () => {
        // Handle file upload if necessary
        // For now, just alerting
        alert('Product details saved successfully');
        navigate('/product_partner/manage-products');
    };

    // Generate the image preview URL
    const imagePreviewUrl = product.product_image && typeof product.product_image === 'object'
        ? URL.createObjectURL(product.product_image)
        : product.product_image; // Use the URL if it's a string

    return (
        <div className="manage-product-container">
            <h2>Manage Product</h2>
            <form className="manage-product-form">
                <label>
                    Product ID:
                    <input type="text" name="product_id" value={product.product_id} disabled />
                </label>
                <label>
                    Product Name:
                    <input type="text" name="product_name" value={product.product_name} onChange={handleChange} required />
                </label>
                <label>
                    Product Description:
                    <textarea name="product_description" value={product.product_description} onChange={handleChange} />
                </label>
                <label>
                    Product Image:
                    <input type="file" name="product_image" accept="image/*" onChange={handleImageChange} />
                    {imagePreviewUrl && (
                        <img
                            src={imagePreviewUrl}
                            alt="Product Preview"
                            className="product-image-preview"
                        />
                    )}
                </label>
                <label>
                    Base Price:
                    <input type="number" step="0.01" name="base_price" value={product.base_price} onChange={handleChange} required />
                </label>
                <label>
                    Stock Quantity:
                    <input type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} required />
                </label>
                <label>
                    Category Name:
                    <select name="category_name" value={product.category_name} onChange={handleCategoryChange} required>
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Category Description:
                    <textarea name="category_description" value={product.category_description} onChange={handleChange} />
                </label>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default ManageProduct;
            