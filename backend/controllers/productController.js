const Product = require('../models/productModel');
const db = require('../config/db');
const dbpromise = require('../config/db');
// Get all products with optional filters
const getAllProducts = (req, res) => {
    const filters = req.query;
    Product.getAllProducts(filters, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};


const getProductById = (req, res) => {
    const productId = req.params.id;
    Product.getProductById(productId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(results[0]);
    });
};

// Add a new product
// const addProduct = (req, res) => {
//     const { product_name, product_description, product_image, base_price, stock_quantity, shop_id } = req.body;
//     const query = `
//         INSERT INTO Products (product_name, product_description, product_image, base_price, stock_quantity, shop_id)
//         VALUES (?, ?, ?, ?, ?, ?)
//     `;
//     db.query(query, [product_name, product_description, product_image, base_price, stock_quantity, shop_id], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json({ success: true, product_id: results.insertId });
//     });
// };

// In your backend routes or controller file

const addProduct = (req, res) => {
    const { product_name, product_description, product_image, base_price, stock_quantity, shop_id } = req.body;

    // Debugging
    console.log('Received data:', {
        product_name,
        product_description,
        product_image: product_image ? 'Image provided' : 'No image',
        base_price,
        stock_quantity,
        shop_id
    });

    const query = `
        INSERT INTO Products (product_name, product_description, product_image, base_price, stock_quantity, shop_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    db.query(query, [product_name, product_description, product_image, base_price, stock_quantity, shop_id], (err, results) => {
        if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ success: true, product_id: results.insertId });
    });
};



const queryProductsByOwnerId = (ownerId, callback) => {
    const query = `
        SELECT 
            p.product_id,
            p.product_name,
            p.product_description,
            p.product_image,
            p.base_price,
            p.stock_quantity,
            c.category_name,
            c.category_description
        FROM Products p
        JOIN Shops s ON p.shop_id = s.shop_id
        JOIN ProductCategories pc ON p.product_id = pc.product_id
        JOIN Categories c ON pc.category_id = c.category_id
        WHERE s.owner_id = ?
    `;

    db.query(query, [ownerId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
};

const getProductsByOwnerId = (req, res) => {
    const { ownerId } = req.params;

    queryProductsByOwnerId(ownerId, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve products' });
        } else {
            res.json(results);
        }
    });
};




// Create a new product
const createProduct = (req, res) => {
    const productData = req.body;
    Product.createProduct(productData, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product created successfully', productId: results.insertId });
    });
};

// Update an existing product
const updateProduct = (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    Product.updateProduct(productId, productData, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product updated successfully' });
    });
};

// Delete a product
const deleteProduct = (req, res) => {
    const productId = req.params.id;
    Product.deleteProduct(productId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    });
};

// Associate product with categories
const associateProductWithCategories = (req, res) => {
    const productId = req.params.id;
    const categoryIds = req.body.categoryIds; // Expecting an array of category IDs

    Product.removeProductFromCategories(productId, (err) => {
        if (err) return res.status(500).json({ error: err.message });

        Product.associateProductWithCategories(productId, categoryIds, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'Product categories updated successfully' });
        });
    });
};

// Remove associations of product from categories
const removeProductFromCategories = (req, res) => {
    const productId = req.params.id;
    Product.removeProductFromCategories(productId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Product removed from all categories successfully' });
    });
};

// controllers/productController.js
const getProductAndShops = (req, res) => {
    const { productName } = req.params;

    if (!productName) {
        return res.status(400).json({ message: 'Product name is required' });
    }

    let query = `
        SELECT 
            p.product_id,
            p.product_name, 
            p.product_description, 
            p.product_image, 
            p.base_price, 
            p.stock_quantity, 
            s.shop_id,
            s.shop_name, 
            s.shop_description, 
            s.shop_image
        FROM 
            Products p
        JOIN 
            Shops s ON p.shop_id = s.shop_id
        WHERE 
            p.product_name LIKE ?
    `;
    
    const queryParams = [`%${productName}%`];

    console.log('Executing query:', query); // Debug log
    console.log('With parameters:', queryParams); // Debug log

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('SQL Error:', err); // Log SQL errors
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

module.exports = { getProductAndShops };



const getProductsByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    console.log('Fetching products for category ID:', categoryId); // Debugging

    const query = `
        SELECT p.product_name, MIN(p.base_price) AS min_price, MAX(p.base_price) AS max_price, MIN(p.product_image) AS product_image
        FROM Products p
        JOIN ProductCategories pc ON p.product_id = pc.product_id
        WHERE pc.category_id = ?
        GROUP BY p.product_name
    `;

    db.query(query, [categoryId], (err, results) => {
        if (err) {
            console.error('Database query error:', err.message); // Debugging
            return res.status(500).json({ error: err.message });
        }
        console.log('Products fetched:', results); // Debugging
        res.status(200).json(results);
    });
};




module.exports = {
    getProductAndShops,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    associateProductWithCategories,
    removeProductFromCategories,
    addProduct,
    getProductsByOwnerId,
    getProductsByCategory // Add this line
};
