const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const bundleController = require('../controllers/bundleController');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Bundle = require('../models/bundleModel');
const { default: mongoose } = require('mongoose');


router.post('/add-product', async(req, res) =>{
    const {product_id, quantity} = req.body;

    try{
        const product = await Product.findOne({product_id: product_id});

        if(!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        let cart = await Cart.findOne();
        if(!cart){
            cart = new Cart();
        }
        const productIndex = cart.products.findIndex(p => p.product_id === product_id);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product_id, quantity });
        }

        cart.totalprice += product.price * quantity;
        
        await cart.save();
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.post('/add-buncle', async(req, res) =>{
    const {bundle_id, quantity} = req.body;

    try{
        const bundle = await bundleController.getBundleById({ bundle_id});

        if(!bundle) {
            return res.status(404).json({message: 'Bundle not found'});
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart();
        }

        const bundleIndex = cart.bundles.findIndex(b => b.bundle_id === bundle_id);
        if (bundleIndex > -1) {
            cart.bundles[bundleIndex].quantity += quantity;
        } else {
            cart.bundles.push({ bundle_id, quantity });
        }
        cart.totalprice += bundle.totalprice * quantity;

        await cart.save();
        res.status(200).json(cart);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        // Mencari cart yang ada
        let cart = await Cart.findOne();

        // Jika tidak ada cart, kirim respons bahwa keranjang kosong
        if (!cart) {
            return res.status(200).json({
                message: 'Cart is empty',
                products: [],
                bundles: [],
                totalprice: 0
            });
        }

        // Jika cart ditemukan, kirimkan isi cart
        res.status(200).json({
            products: cart.products,
            bundles: cart.bundles,
            totalprice: cart.totalprice
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;