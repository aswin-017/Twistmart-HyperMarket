// ProductList.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../../../assets/css/user/product/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category');

  useEffect(() => {
    if (!categoryId) return; // Ensure categoryId is available

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/category/${categoryId}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        // Debugging
        console.log('Fetched products:', data);
        // Format the data if necessary
        setProducts(data.map(product => ({
          name: product.product_name,
          price: `${product.min_price} - ${product.max_price}`,
          image: product.product_image // Use the image URL here
        })));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const filteredList = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="app">
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
        {filteredList.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
