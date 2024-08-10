// src/components/product/ShopProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../../../assets/css/user/product/ShopProductDetails.css';
 // Make sure to create this CSS file

const ShopProductDetails = () => {
  const { productId, shopId } = useParams();
  // Fetch product details from the API based on productId and shopId
  const product = { id: productId, name: 'Sample Product', image: 'product.jpg', description: 'Detailed description of the product', price: 100 }; // Replace with real data
  const shop = { id: shopId, name: 'Sample Shop', address: '123 Shop Street' }; // Replace with real data

  return (
    <div className="shop-product-details-container">
      <h1>Product Details from {shop.name}</h1>
      <div className="product-details">
        <img src={`/src/assets/images/${product.image}`} alt={product.name} className="product-image" />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Shop Address: {shop.address}</p>
      </div>
    </div>
  );
};

export default ShopProductDetails;
