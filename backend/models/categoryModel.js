const db = require('../config/db');

// Get all categories with optional filters
const getAllCategories = (callback) => {
    const query = 'SELECT * FROM Categories';
    db.query(query, callback);
};

// Get category by ID
const getCategoryById = (categoryId, callback) => {
    const query = 'SELECT * FROM Categories WHERE category_id = ?';
    db.query(query, [categoryId], callback);
};

// Create a new category
const createCategory = (categoryData, callback) => {
    const query = 'INSERT INTO Categories SET ?';
    db.query(query, categoryData, callback);
};

// Update a category
const updateCategory = (categoryId, categoryData, callback) => {
    const query = 'UPDATE Categories SET ? WHERE category_id = ?';
    db.query(query, [categoryData, categoryId], callback);
};

// Delete a category
const deleteCategory = (categoryId, callback) => {
    const query = 'DELETE FROM Categories WHERE category_id = ?';
    db.query(query, [categoryId], callback);
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
