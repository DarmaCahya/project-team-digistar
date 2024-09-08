const productService = require('../services/productService');

async function createProduct(req, res) {
    try {
        const { product_id, name, image, category, description, price, stock, min_purchase } = req.body;
        if (!product_id || !name || !image || !category || !description || !price || !stock) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const productData = {
            product_id,
            name,
            image,
            category,
            description,
            price,
            stock,
            min_purchase: min_purchase || 1  // Use default value if not provided
        };

        const newProduct = await productService.create(productData);
        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.log('Error in createProduct controller: ', error);
        res.status(500).json({ message: error.message });
    }
}

async function getProductById(req, res) {
    try {
        const product = await productService.getOneById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.log('Error in getProductById controller: ', error);
        res.status(404).json({ message: error.message });
    }
}

async function getProductByName(req, res) {
    try {
        const product = await productService.getOneByName(req.params.name);
        res.status(200).json(product);
    } catch (error) {
        console.log('Error in getProductByName controller: ', error);
        res.status(404).json({ message: error.message });
    }
}

async function getProductByCategory(req, res) {
    try {
        const product = await productService.getOneByKategori(req.params.category);
        res.status(200).json(product);
    } catch (error) {
        console.log('Error in getProductByCategory controller: ', error);
        res.status(404).json({ message: error.message });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await productService.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.log('Error in getAllProducts controller: ', error);
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
    createProduct,
    getProductById,
    getProductByName,
    getProductByCategory,
    getAllProducts,
    updateProduct,
    deleteProduct
};
