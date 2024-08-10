// controllers/cartController.js

const db = require('../config/db'); // Ensure this points to your database connection

// Get cart details
const getCartDetails = (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Step 1: Retrieve cart ID for the user
    const getCartIdQuery = 'SELECT cart_id FROM Carts WHERE user_id = ?';
    
    db.query(getCartIdQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching cart ID:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const cartId = results[0].cart_id;

        // Step 2: Retrieve cart items with product and shop details
        const getCartItemsQuery = `
            SELECT 
                ci.cart_id, 
                ci.product_id, 
                ci.quantity, 
                ci.price AS item_price,
                p.product_name,
                s.shop_name,
                p.product_price
            FROM 
                CartItems ci
            JOIN 
                Products p ON ci.product_id = p.product_id
            JOIN 
                Shops s ON p.shop_id = s.shop_id
            WHERE 
                ci.cart_id = ?
        `;
        
        db.query(getCartItemsQuery, [cartId], (err, items) => {
            if (err) {
                console.error('Error fetching cart items:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            // Process and calculate total price
            const cartDetails = items.map(item => {
                const totalPrice = item.item_price * item.quantity;

                return {
                    productName: item.product_name,
                    shopName: item.shop_name,
                    price: item.item_price,
                    quantity: item.quantity,
                    totalPrice: totalPrice.toFixed(2) // Format to 2 decimal places
                };
            });

            res.status(200).json({ success: true, data: cartDetails });
        });
    });
};

// Add product to cart
const addToCart = (req, res) => {
    const { userId } = req.params;
    const { productId, quantity, price } = req.body;

    if (!userId || !productId || !quantity || !price) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Step 1: Retrieve or create cart for the user
    const getOrCreateCartQuery = `
        INSERT INTO Carts (user_id) 
        VALUES (?) 
        ON DUPLICATE KEY UPDATE user_id = user_id
    `;

    db.query(getOrCreateCartQuery, [userId], (err) => {
        if (err) {
            console.error('Error getting or creating cart:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        // Step 2: Retrieve cart ID for the user
        const getCartIdQuery = 'SELECT cart_id FROM Carts WHERE user_id = ?';
        
        db.query(getCartIdQuery, [userId], (err, results) => {
            if (err) {
                console.error('Error fetching cart ID:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            const cartId = results[0].cart_id;

            // Step 3: Insert or update item in CartItems table
            const insertOrUpdateQuery = `
                INSERT INTO CartItems (cart_id, product_id, quantity, price)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), price = VALUES(price)
            `;

            const values = [cartId, productId, quantity, price];

            db.query(insertOrUpdateQuery, values, (err) => {
                if (err) {
                    console.error('Error adding to cart:', err);
                    return res.status(500).json({ success: false, message: 'Internal Server Error' });
                }

                res.status(201).json({ success: true, message: 'Product added to cart' });
            });
        });
    });
};

module.exports = { getCartDetails, addToCart };
