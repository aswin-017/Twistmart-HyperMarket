const db = require('../config/db');

// Post to Cart
const addToCart = (req, res) => {
    const { user_id, product_id, shop_id, quantity, price } = req.body;

    // First, check if the item is already in the cart
    const checkQuery = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND shop_id = ?';
    db.query(checkQuery, [user_id, product_id, shop_id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        if (results.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Item already in cart.'
            });
        }

        // Insert new item into cart
        const query = 'INSERT INTO cart (user_id, product_id, shop_id, quantity, price) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [user_id, product_id, shop_id, quantity, price], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: err.message });

            res.status(200).json({
                success: true,
                message: 'Item added to cart successfully.',
                cart_id: results.insertId
            });
        });
    });
};

// Get Cart by User ID
const getCartByUserId = (req, res) => {
    const { user_id } = req.query;

    const query = `
        SELECT 
            c.id AS cart_id, 
            c.user_id, 
            c.product_id, 
            c.shop_id, 
            c.quantity, 
            c.price, 
            p.product_name, 
            p.product_description, 
            p.product_image, 
            s.shop_name, 
            s.shop_description, 
            s.shop_image,
            (c.quantity * c.price) AS total_price
        FROM cart c
        JOIN products p ON c.product_id = p.product_id
        JOIN shops s ON c.shop_id = s.shop_id
        WHERE c.user_id = ?;
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        res.status(200).json(results);
    });
};
// Increase quantity
const increaseQuantity = (req, res) => {
    const { user_id, product_id, shop_id } = req.body;

    const query = 'UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ? AND shop_id = ?';
    db.query(query, [user_id, product_id, shop_id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        // Retrieve updated cart items
        const fetchQuery = `
            SELECT 
                c.id AS cart_id, 
                c.user_id, 
                c.product_id, 
                c.shop_id, 
                c.quantity, 
                c.price, 
                p.product_name, 
                s.shop_name
            FROM cart c
            JOIN products p ON c.product_id = p.product_id
            JOIN shops s ON c.shop_id = s.shop_id
            WHERE c.user_id = ?;
        `;
        db.query(fetchQuery, [user_id], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.status(200).json(results);
        });
    });
};

// Decrease quantity
const decreaseQuantity = (req, res) => {
    const { user_id, product_id, shop_id } = req.body;

    const query = 'UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ? AND shop_id = ? AND quantity > 1';
    db.query(query, [user_id, product_id, shop_id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        // Retrieve updated cart items
        const fetchQuery = `
            SELECT 
                c.id AS cart_id, 
                c.user_id, 
                c.product_id, 
                c.shop_id, 
                c.quantity, 
                c.price, 
                p.product_name, 
                s.shop_name
            FROM cart c
            JOIN products p ON c.product_id = p.product_id
            JOIN shops s ON c.shop_id = s.shop_id
            WHERE c.user_id = ?;
        `;
        db.query(fetchQuery, [user_id], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.status(200).json(results);
        });
    });
};

// Remove from cart
const removeFromCart = (req, res) => {
    const { user_id, product_id, shop_id } = req.body;

    const query = 'DELETE FROM cart WHERE user_id = ? AND product_id = ? AND shop_id = ?';
    db.query(query, [user_id, product_id, shop_id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        // Retrieve updated cart items
        const fetchQuery = `
            SELECT 
                c.id AS cart_id, 
                c.user_id, 
                c.product_id, 
                c.shop_id, 
                c.quantity, 
                c.price, 
                p.product_name, 
                s.shop_name
            FROM cart c
            JOIN products p ON c.product_id = p.product_id
            JOIN shops s ON c.shop_id = s.shop_id
            WHERE c.user_id = ?;
        `;
        db.query(fetchQuery, [user_id], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.status(200).json(results);
        });
    });
};

module.exports = {
    addToCart,
    getCartByUserId,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
};
