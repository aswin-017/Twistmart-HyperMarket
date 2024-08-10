// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const { getCartDetails, addToCart } = require('../controllers/cartController');

// GET /api/cart/:userId
router.get('/:userId', getCartDetails);

// POST /api/cart/:userId
router.post('/:userId', addToCart);

module.exports = router;
