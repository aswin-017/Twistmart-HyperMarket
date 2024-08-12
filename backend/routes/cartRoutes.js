const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to add item to cart
router.post('/cart', cartController.addToCart);

// Route to get cart items by user ID
router.get('/cart', cartController.getCartByUserId);

// Route to increase item quantity
router.post('/cart/increase', cartController.increaseQuantity);

// Route to decrease item quantity
router.post('/cart/decrease', cartController.decreaseQuantity);

// Route to remove item from cart
router.post('/cart/remove', cartController.removeFromCart);

module.exports = router;
