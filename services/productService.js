const Product = require("../models/productModel");

async function create(product) {
    try {
        const newProduct = new Product(product);
        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (error) {
        console.log('Error creating product: ', error);
        throw error;
    }
}

async function getOneById(productId) {
    try {
        const product = await Product.findOne({ product_id: productId });
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

async function getOneByName(nameProduct) {
    try {
        const product = await Product.findOne({ name: nameProduct });
        if (!product) {
            console.log(`Product with name ${nameProduct} not found`);
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        console.log('Error getting product by name: ', error);
        throw error;
    }
}

async function getOneByKategori(KategoriProduct) {
    try {
        const product = await Product.findOne({ category: KategoriProduct });
        if (!product) {
            console.log(`Product with category ${KategoriProduct} not found`);
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        console.log('Error getting product by category: ', error);
        throw error;
    }
}

async function findAll() {
    try {
        const products = await Product.find();
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

async function deleteProduct(productId) {
    try {
        const product = await Product.findOneAndDelete({ product_id: productId });
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

async function updateProduct(productId, updateData) {
    try {
        const product = await Product.findOneAndUpdate(
            { product_id: productId },
            { $set: updateData },
            { new: true, runValidators: true }
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

module.exports = {
    create,
    getOneById,
    getOneByName,
    getOneByKategori,
    findAll,
    deleteProduct,
    updateProduct
};
