import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import ProductCard from './ProductCard';
import '../../../assets/css/static/ProductList.css';
import riceImage from '../../../assets/images/products/rice.avif';
import tomatoImage from '../../../assets/images/products/tomato.jpg';
import potatoImage from '../../../assets/images/products/potato.avif';
import onionImage from '../../../assets/images/products/onion.jpg';
import garlicImage from '../../../assets/images/products/garlic.jpg';
import carrotImage from '../../../assets/images/products/carrot.jpg';
import beansImage from '../../../assets/images/products/beans.jpg';
import cabbageImage from '../../../assets/images/products/cabbage.jpg';
import broccoliImage from '../../../assets/images/products/broccoli.jpg';
import spinachImage from '../../../assets/images/products/spinach.jpg';
import appleImage from '../../../assets/images/products/apple.jpg';
import bananaImage from '../../../assets/images/products/banana.jpg';
import orangeImage from '../../../assets/images/products/orange.jpg';
import mangoImage from '../../../assets/images/products/mango.jpg';
import pineappleImage from '../../../assets/images/products/pineapple.jpg';

// Sample products (replace with your actual data)
const products = [
    { id: 1, name: 'Rice', price: '₹100 - ₹150', image: riceImage },
    { id: 2, name: 'Tomato', price: '₹20 - ₹40', image: tomatoImage },
    { id: 3, name: 'Potato', price: '₹20 - ₹30', image: potatoImage },
    { id: 4, name: 'Onion', price: '₹30 - ₹50', image: onionImage },
    { id: 5, name: 'Garlic', price: '₹120 - ₹180', image: garlicImage },
    { id: 6, name: 'Carrot', price: '₹40 - ₹60', image: carrotImage },
    { id: 7, name: 'Beans', price: '₹50 - ₹70', image: beansImage },
    { id: 8, name: 'Cabbage', price: '₹20 - ₹40', image: cabbageImage },
    { id: 9, name: 'Broccoli', price: '₹60 - ₹80', image: broccoliImage },
    { id: 10, name: 'Spinach', price: '₹30 - ₹50', image: spinachImage },
    { id: 11, name: 'Apple', price: '₹100 - ₹140', image: appleImage },
    { id: 12, name: 'Banana', price: '₹30 - ₹50', image: bananaImage },
    { id: 13, name: 'Orange', price: '₹70 - ₹90', image: orangeImage },
    { id: 14, name: 'Mango', price: '₹130 - ₹170', image: mangoImage },
    { id: 15, name: 'Pineapple', price: '₹80 - ₹100', image: pineappleImage }
];

const ProductList = () => {
    const [search, setSearch] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // This should ideally be managed through authentication
    const navigate = useNavigate(); // Initialize useNavigate

    const filteredList = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleLogin = () => {
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div id="app">
            { !isLoggedIn && (
                <div className="blur-overlay">
                    <div className="login-prompt">
                        <h2>Login Required</h2>
                        <p>Please log in to view the products.</p>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            )}
            { isLoggedIn && (
                <>
                    <div className="search-wrapper">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search product name.."
                        />
                        <label>Search product name:</label>
                    </div>
                    <div className="wrapper">
                        {filteredList.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductList;
