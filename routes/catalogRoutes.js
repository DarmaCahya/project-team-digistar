const express = require('express');
const catalogController = require('../controllers/catalogController');

const router = express.Router();

router.get('/', catalogController.getAllCatalog);

module.exports = router;
