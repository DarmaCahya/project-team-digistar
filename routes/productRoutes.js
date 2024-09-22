const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage for buffer
const upload = multer({ storage });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getOneProductById);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
