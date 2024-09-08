const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/name/:name', productController.getProductByName);
router.get('/category/:category', productController.getProductByCategory);
router.get('/', productController.getAllProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
