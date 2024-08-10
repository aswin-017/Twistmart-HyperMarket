const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/categories', productController.associateProductWithCategories);
router.delete('/:id/categories', productController.removeProductFromCategories);
router.get('/categories/:ownerId', productController.getProductsByOwnerId);

// Define the route for product and shop details
router.get('/details/:productName', productController.getProductAndShops);

router.get('/category/:categoryId', productController.getProductsByCategory);
module.exports = router;
