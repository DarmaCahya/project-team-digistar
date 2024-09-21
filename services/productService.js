const Product = require('../models/productModel');

async function findAllProducts(req) {
  try {
    const { search, category, minPrice, maxPrice } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (Number(minPrice) && Number(maxPrice)) {
      query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    const products = await Product.find(query);
    if (products.length === 0) {
      console.log('No products found');
      throw new Error('No products found');
    }
    return products;
  } catch (error) {
    console.log('Error finding products: ', error);
    throw error;
  }
}

async function findProductById(productId) {
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      console.log(`Product with ID ${productId} not found`);
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.log('Error getting product by ID: ', error);
    throw error;
  }
}

async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    console.log('Error creating product: ', error);
    throw error;
  }
}

async function updateProduct(productId, updateData) {
  try {
    const product = await Product.findByIdAndUpdate(
      { product_id: productId },
      { $set: updateData },
      { new: true, runValidators: true },
    );
    if (!product) {
      console.log(`Product with ID ${productId} not found`);
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.log('Error updating product: ', error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const product = await Product.findByIdAndDelete({ _id: productId });
    if (!product) {
      console.log(`Product with ID ${productId} not found`);
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.log('Error deleting product: ', error);
    throw error;
  }
}

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
