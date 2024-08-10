const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shopController');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const productCategoryController = require('../controllers/productCategoryController');

// Route to get shop ID by owner ID
router.get('/shops_/:owner_id', shopController.getShopIdByOwnerId);

// Route to add a new product
router.post('/products_', productController.addProduct);

// Route to add a new category
router.post('/categories_', categoryController.addCategory);

// Route to link product to category
router.post('/productcategories_', productCategoryController.linkProductToCategory);

module.exports = router;
