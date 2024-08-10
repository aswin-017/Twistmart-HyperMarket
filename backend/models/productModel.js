const db = require('../config/db');

// Get all products with optional filters
const getAllProducts = (filters, callback) => {
    let query = 'SELECT * FROM Products';
    const queryParams = [];

    if (filters) {
        const filterConditions = [];

        if (filters.category) {
            query += ' JOIN ProductCategories ON Products.product_id = ProductCategories.product_id';
            filterConditions.push('ProductCategories.category_id = ?');
            queryParams.push(filters.category);
        }

        if (filters.priceRange) {
            filterConditions.push('base_price BETWEEN ? AND ?');
            queryParams.push(filters.priceRange.min, filters.priceRange.max);
        }

        if (filterConditions.length > 0) {
            query += ' WHERE ' + filterConditions.join(' AND ');
        }
    }

    db.query(query, queryParams, callback);
};

// Get product by ID
const getProductById = (productId, callback) => {
    const query = 'SELECT * FROM Products WHERE product_id = ?';
    db.query(query, [productId], callback);
};

// Create a new product
const createProduct = (productData, callback) => {
    const query = 'INSERT INTO Products SET ?';
    db.query(query, productData, callback);
};

// Update an existing product
const updateProduct = (productId, productData, callback) => {
    const query = 'UPDATE Products SET ? WHERE product_id = ?';
    db.query(query, [productData, productId], callback);
};

// Delete a product
const deleteProduct = (productId, callback) => {
    const query = 'DELETE FROM Products WHERE product_id = ?';
    db.query(query, [productId], callback);
};

// Associate product with categories
const associateProductWithCategories = (productId, categoryIds, callback) => {
    const query = 'INSERT INTO ProductCategories (product_id, category_id) VALUES ?';
    const values = categoryIds.map(categoryId => [productId, categoryId]);
    db.query(query, [values], callback);
};

// Remove associations of product from categories
const removeProductFromCategories = (productId, callback) => {
    const query = 'DELETE FROM ProductCategories WHERE product_id = ?';
    db.query(query, [productId], callback);
};
// Function to get products and shops by product name
const getProductAndShops = (productName, callback) => {
    let query = `
        SELECT p.product_id, p.product_name, p.product_description, p.product_image, p.base_price, p.stock_quantity, s.shop_id, s.shop_name, s.shop_description, s.shop_image
        FROM Products p
        JOIN Shops s ON p.shop_id = s.shop_id
        WHERE p.product_name LIKE ?
    `;
    
    // Using `%${productName}%` for partial matching
    const queryParams = [`%${productName}%`];

    db.query(query, queryParams, callback);
};


module.exports = {
    getProductAndShops,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    associateProductWithCategories,
    removeProductFromCategories
};
