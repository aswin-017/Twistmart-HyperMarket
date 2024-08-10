import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import '../../../assets/css/user/product/ProductDetails.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [shops, setShops] = useState([]);
    const { name } = useParams(); // Extract product name from URL
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        if (!name) return;

        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/details/${encodeURIComponent(name)}`);
                if (!response.ok) throw new Error('Failed to fetch product details');
                const data = await response.json();
                
                if (data.length > 0) {
                    const productData = data[0];
                    const shopData = data.slice(1);
                    
                    setProduct(productData);
                    setShops(shopData);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [name]);

    if (!product) return <div>Product not found</div>;

    const handleAddToCart = (shopId, price, shopName) => {
        addToCart(product.product_id, shopId, price, shopName);
        toast.success('Product added to cart successfully!');
    };

    return (
        <div className="product-details-wrapper">

            <div className="product-info-card">
                <img src={product.product_image} alt={product.product_name} className="product-image" />
                <div className="product-info">
                    <h1 className="product-title">{product.product_name}</h1>
                </div>
            </div>

            <h2 className="shops-heading">Available in Shops</h2>
            <div className="shops-container">
                {shops.map(shop => (
                    <div key={shop.shop_id} className="shop-info-card">
                        <img src={shop.shop_image} alt={shop.shop_name} className="shop-image" />
                        <div className="shop-info">
                            <h3 className="shop-name">{shop.shop_name}</h3>
                            <p className="shop-description-text">{shop.product_description}</p>
                            <p className="shop-price-tag">Price: ₹{shop.base_price}</p>
                            <button
                                className="add-to-cart-button"
                                onClick={() => handleAddToCart(shop.shop_id, shop.price, shop.shop_name)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
