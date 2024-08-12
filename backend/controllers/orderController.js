const db = require('../config/db');

// Place order and clear cart
const placeOrderAndClearCart = (req, res) => {
    const { user_id, cartItems } = req.body;

    if (!user_id || !cartItems || cartItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid request.' });
    }

    // Start a transaction to ensure data integrity
    db.beginTransaction(err => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        // Insert orders into the orders table
        const orderPromises = cartItems.map(item => {
            return new Promise((resolve, reject) => {
                const query = 'INSERT INTO orders (user_id, product_id, shop_id, quantity, price) VALUES (?, ?, ?, ?, ?)';
                db.query(query, [user_id, item.product_id, item.shop_id, item.quantity, item.price], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
        });

        Promise.all(orderPromises)
            .then(() => {
                // Clear the cart for the user
                const clearCartQuery = 'DELETE FROM cart WHERE user_id = ?';
                db.query(clearCartQuery, [user_id], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ success: false, message: err.message }));

                    // Commit transaction
                    db.commit(err => {
                        if (err) return db.rollback(() => res.status(500).json({ success: false, message: err.message }));

                        res.status(200).json({ success: true, message: 'Order placed and cart cleared successfully.' });
                    });
                });
            })
            .catch(err => {
                db.rollback(() => res.status(500).json({ success: false, message: err.message }));
            });
    });
};
const getOrderDetailsByUserId = (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    const query = `
        SELECT 
            o.user_id,
            o.product_id,
            o.shop_id,
            o.quantity,
            o.status,
            o.price AS order_price,
            p.product_name,
            p.product_image,
            p.base_price,
            s.shop_name,
            s.shop_image
        FROM orders o
        JOIN products p ON o.product_id = p.product_id
        JOIN shops s ON o.shop_id = s.shop_id
        WHERE o.user_id = ?;
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        res.status(200).json({ success: true, data: results });
    });
};
const getOrdersByShopId = (req, res) => {
    const { userId } = req.params;

    // Step 1: Get the shop_id from the shops table using the user_id
    const shopQuery = `
        SELECT shop_id
        FROM shops
        WHERE owner_id = ?
    `;

    db.query(shopQuery, [userId], (err, shopResults) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        if (shopResults.length === 0) {
            return res.status(404).json({ success: false, message: 'Shop not found for the user' });
        }

        const shopId = shopResults[0].shop_id;

        // Step 2: Get the orders for the shop_id
        const orderQuery = `
            SELECT 
                o.id AS order_id,
                o.user_id,
                o.product_id,
                o.shop_id,
                o.quantity,
                o.price,
                o.order_date,
                o.status,
                p.product_name,
                p.product_description,
                p.product_image,
                p.base_price,
                a.email AS user_email,
                a.first_name AS user_first_name,
                a.last_name AS user_last_name,
                a.phone AS user_phone
            FROM orders o
            JOIN products p ON o.product_id = p.product_id
            JOIN authenticated a ON o.user_id = a.id
            WHERE o.shop_id = ?
        `;

        db.query(orderQuery, [shopId], (err, orderResults) => {
            if (err) return res.status(500).json({ success: false, message: err.message });

            res.status(200).json({ success: true, data: orderResults });
        });
    });
};


const getAllOrderDetails = (req, res) => {
    const query = `
        SELECT 
            o.id AS order_id,
            o.user_id,
            o.product_id,
            o.shop_id,
            o.quantity,
            o.price,
            o.order_date,
            o.status,
            p.product_name,
            p.product_description,
            p.product_image,
            p.base_price,
            s.shop_name,
            s.shop_description,
            s.shop_image,
            a.email AS user_email,
            a.first_name AS user_first_name,
            a.last_name AS user_last_name,
            a.phone AS user_phone
        FROM orders o
        JOIN products p ON o.product_id = p.product_id
        JOIN shops s ON o.shop_id = s.shop_id
        JOIN authenticated a ON o.user_id = a.id;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        res.status(200).json({ success: true, data: results });
    });
};


const updateOrderStatus = (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const query = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    db.query(query, [status, orderId], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, message: 'Order status updated successfully' });
    });
};

module.exports = {
    placeOrderAndClearCart,
    getOrderDetailsByUserId,
    getOrdersByShopId,
    getAllOrderDetails,
    updateOrderStatus
};
