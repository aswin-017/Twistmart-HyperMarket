import '../../../assets/css/user/product/AllCategories.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="all-categories-container">
      <h1 className="page-title">All Categories</h1>
      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <Link to={`/user/products?category=${category.category_id}`} className="category-link">
              <div className="category-card-content">
                <h2 className="category-name">{category.category_name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
