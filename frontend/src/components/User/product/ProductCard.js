import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/user/product/ProductCard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductCard = ({ product }) => {
  const encodedName = encodeURIComponent(product.name);

  return (
    <div className="product-card">
      <Link to={`/user/products/${encodedName}`} className="product-card__link">
        <div className="product-card__image-container">
          <img src={product.image} alt={product.name} className="product-card__image" />
        </div>
        <div className="product-card__details">
          <h2 className="product-card__name">{product.name}</h2>
          <p className="product-card__price">
            <i className="fas fa-rupee-sign"></i> {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
