const express = require('express');
const bundleController = require('../controllers/bundleController');

const router = express.Router();

router.get('/', bundleController.getAllBundles);
router.get('/:id', bundleController.getBundleById);
router.post('/', bundleController.createBundle);
router.put('/:id', bundleController.updateBundle);
router.delete('/:id', bundleController.deleteBundle);

module.exports = router;
