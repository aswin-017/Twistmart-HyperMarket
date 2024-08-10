import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/user/product/ProductCard.css';

const ProductCard = ({ product }) => {
  // Encode the product name for safe URL usage
  const encodedName = encodeURIComponent(product.name);

  return (
    <div className="product-card">
      <Link to={`/user/products/${encodedName}`} className="product-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-details">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
