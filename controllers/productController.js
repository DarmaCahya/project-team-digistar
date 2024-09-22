const productService = require('../services/productService');

async function getAllProducts(req, res) {
  try {
    const products = await productService.findAllProducts(req);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: products,
    });
  } catch (error) {
    console.log('Error in getAllProducts controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function getOneProductById(req, res) {
  try {
    const product = await productService.findProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: product,
    });
  } catch (error) {
    console.log('Error in getProductById controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function createProduct(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'No image uploaded',
      });
    }

    const newProduct = await productService.createProduct(req.body, req.file);

    return res.status(201).json({
      status: 'success',
      code: 201,
      data: newProduct,
    });
  } catch (error) {
    console.log('Error in createProduct controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body, req.file);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: updatedProduct,
    });
  } catch (error) {
    console.log('Error in updateProduct controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: deletedProduct,
    });
  } catch (error) {
    console.log('Error in deleteProduct controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

module.exports = {
  getAllProducts,
  getOneProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
