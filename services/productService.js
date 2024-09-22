const Product = require('../models/productModel');
const { saveImage, deleteImage } = require('./imageService');

async function findAllProducts(req) {
  try {
    const { search, category, minPrice, maxPrice, isActive, sortBy, order } = req.query;

    const query = {};
    const sort = {};

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
    if (isActive) {
      query.isActive = isActive === 'true';
    }

    if (sortBy && order) {
      sort = { [sortBy]: order };
    }

    const products = await Product.find(query).sort(sort);
    return products;
  } catch (error) {
    console.log('Error findAllProducts service: ', error);
    throw error;
  }
}

async function findProductById(id) {
  try {
    const product = await Product.findOne({ _id: id });
    return product;
  } catch (error) {
    console.log('Error findProductById service: ', error);
    throw error;
  }
}

async function createProduct(data, file) {
  try {
    const imagePath = await saveImage(file);

    const newData = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      minPurchase: Number(data.minPurchase),
      image: imagePath,
    };

    const newProduct = new Product(newData);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    console.log('Error createProduct service: ', error);
    throw error;
  }
}

async function updateProduct(id, data, file) {
  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const updatedData = {};

    if (data.name) updatedData.name = data.name;
    if (data.description) updatedData.description = data.description;
    if (data.price) updatedData.price = Number(data.price);
    if (data.stock) updatedData.stock = Number(data.stock);
    if (data.minPurchase) updatedData.minPurchase = Number(data.minPurchase);

    if (file) {
      const existingImagePath = existingProduct.image.split('/uploads/')[1];
      await saveImage(file, existingImagePath);
      updatedData.image = `/uploads/${Date.now()}${path.extname(file.originalname)}`;
    }

    const product = await Product.findByIdAndUpdate({ _id: id }, updatedData, {
      new: true,
      runValidators: true,
    });
    return product;
  } catch (error) {
    console.log('Error updateProduct service: ', error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.image) {
      deleteImage(product.image);
    }

    await Product.findByIdAndDelete({ _id: id });
    return product;
  } catch (error) {
    console.log('Error deleteProduct service: ', error);
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
