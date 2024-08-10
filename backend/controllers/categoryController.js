const Category = require('../models/categoryModel');
const db = require('../config/db');
const getAllCategories = (req, res) => {
    Category.getAllCategories((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};


const addCategory = (req, res) => {
    const { category_name, category_description, parent_category_id } = req.body;

    // Check for empty category_name
    if (!category_name) {
        return res.status(400).json({ error: 'Category name is required' });
    }

    // Step 1: Check if the category already exists
    const checkCategoryQuery = `
        SELECT category_id
        FROM Categories
        WHERE category_name = ?
    `;

    db.query(checkCategoryQuery, [category_name], (err, results) => {
        if (err) {
            console.error('Error checking category:', err);
            return res.status(500).json({ error: err.message });
        }

        // If category exists, return the existing category_id
        if (results.length > 0) {
            return res.status(200).json({ success: true, category_id: results[0].category_id });
        }

        // Step 2: Insert the new category if it does not exist
        const insertCategoryQuery = `
            INSERT INTO Categories (category_name, category_description, parent_category_id)
            VALUES (?, ?, ?)
        `;

        db.query(insertCategoryQuery, [category_name, category_description || null, parent_category_id || null], (err, results) => {
            if (err) {
                console.error('Error inserting category:', err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ success: true, category_id: results.insertId });
        });
    });
};


const getCategoryById = (req, res) => {
    const categoryId = req.params.id;
    Category.getCategoryById(categoryId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(results[0]);
    });
};

const createCategory = (req, res) => {
    const categoryData = req.body;
    Category.createCategory(categoryData, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Category created successfully', categoryId: results.insertId });
    });
};

const updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const categoryData = req.body;
    Category.updateCategory(categoryId, categoryData, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category updated successfully' });
    });
};

const deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    Category.deleteCategory(categoryId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    addCategory
};
