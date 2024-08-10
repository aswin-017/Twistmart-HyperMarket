
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/static/ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
            <Link to="/login"className="product-link">

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

                                                                                                                                                                                                                                                                                                            
