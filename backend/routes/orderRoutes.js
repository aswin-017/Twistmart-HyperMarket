const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to place orders and clear cart
router.post('/checkout', orderController.placeOrderAndClearCart);
router.get('/orders', orderController.getOrderDetailsByUserId);
router.get('/orders/user/:userId', orderController.getOrdersByShopId);
router.get('/orderdetails', orderController.getAllOrderDetails);
router.patch('/orders/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
