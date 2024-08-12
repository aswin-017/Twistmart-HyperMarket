import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext
import '../../../assets/css/user/product/ProductDetails.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [shops, setShops] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { name } = useParams(); // Extract product name from URL
    const navigate = useNavigate();
    const { userId } = useAuth(); // Get userId from AuthContext

    useEffect(() => {
        if (!name) return;

        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/details/${encodeURIComponent(name)}`);
                if (!response.ok) throw new Error('Failed to fetch product details');
                const data = await response.json();
                console.log(data)
                
                if (data.length > 0) {
                    const productData = data[0];
                    const shopData = data;
                    
                    setProduct(productData);
                    setShops(shopData);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

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

        fetchProductDetails();
        fetchCartItems();
    }, [name, userId]);

    if (!product) return <div>Product not found</div>;

    const handleGoToCart = async (shopId, price) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: product.product_id,
                    shop_id: shopId,
                    quantity: 1,
                    price: price
                }),
            });

            if (!response.ok) throw new Error('Failed to add item to cart');

            toast.success('Product added to cart successfully!');
       
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart');
        }
    };

    const isInCart = (shopId) => {
        return cartItems.some(item => item.product_id === product.product_id && item.shop_id === shopId);
    };

    return (
        <div className="product-details">
            <div className="product-info">
                <img src={product.product_image} alt={product.product_name} className="product-image" />
                <div className="product-name">
                    <h1>{product.product_name}</h1>
                </div>
            </div>

            <h2 className="available-shops-heading">Available in Shops</h2>
            <div className="shop-list">
                {shops.map(shop => (
                    <div key={shop.shop_id} className="shop-item">
                        <img src={shop.shop_image} alt={shop.shop_name} className="shop-image" />
                        <div className="shop-info">
                            <h3 className="shop-name">{shop.shop_name}</h3>
                            <p className="shop-description">{shop.shop_description}hello</p>
                            <p className="shop-price">Price: ₹{shop.base_price}</p>
                            <button
                                className="go-to-cart-button"
                                onClick={() => handleGoToCart(shop.shop_id, shop.base_price)}
                            >
                                {isInCart(shop.shop_id) ? 'Go to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
