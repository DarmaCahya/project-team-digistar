const productService = require('../services/productService');

async function getAllProducts(req, res) {
  try {
    const products = await productService.findAllProducts(req);
    res.status(200).json(products);
  } catch (error) {
    console.log('Error in getAllProducts controller: ', error);
    res.status(500).json({ message: error.message });
  }
}

async function getOneProductById(req, res) {
  try {
    const product = await productService.findProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log('Error in getProductById controller: ', error);
    res.status(404).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const newProduct = await productService.createProduct(req.body);
    return res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.log('Error in createProduct controller: ', error);
    res.status(500).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log('Error in updateProduct controller: ', error);
    res.status(404).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log('Error in deleteProduct controller: ', error);
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  getOneProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
