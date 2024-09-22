const express = require('express');
const multer = require('multer');
const bundleController = require('../controllers/bundleController');

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage for buffer
const upload = multer({ storage });

router.get('/', bundleController.getAllBundles);
router.get('/:id', bundleController.getBundleById);
router.post('/', upload.single('image'), bundleController.createBundle);
router.put('/:id', upload.single('image'), bundleController.updateBundle);
router.delete('/:id', bundleController.deleteBundle);

module.exports = router;
