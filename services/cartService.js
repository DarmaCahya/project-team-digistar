const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

async function findAllCarts() {
  try {
    const cart = await Cart.find().populate('products.product');
    return cart;
  } catch (error) {
    console.log('Error findAllCarts service: ', error);
    throw error;
  }
}

async function addCartItem(products) {
  try {
    let cart;
    const res = await Cart.find();

    if (res.length === 0) {
      cart = new Cart({ products });
    } else {
      cart = res[0];

      for (const item of products) {
        const { product, quantity } = item;

        const findProduct = await Product.findById(product);
        if (!findProduct) {
          throw new Error(`Product with ID ${product} not found`);
        }

        const existingProductIndex = cart.products.findIndex(
          (p) => p.product.toString() === product.toString(),
        );

        if (existingProductIndex > -1) {
          cart.products[existingProductIndex].quantity += quantity;
        } else {
          cart.products.push({
            product,
            quantity,
          });
        }
      }
    }

    cart.totalPrice = await calculateTotalPrice(cart.products);
    const updatedCart = await cart.save();
    return updatedCart;
  } catch (error) {
    console.log('Error createCart: ', error);
    throw error;
  }
}

// async function removeProductFromCart(id) {
//   try {
//     let cart;
//     cart = await Cart.find();

//     if (cart.length === 0) {
//       throw new Error('Cart not found');
//     }

//     cart.products = cart.products.filter((p) => p.product !== productId.toString());

//     cart.totalPrice = await calculateTotalPrice(cart.products);

//     const updatedCart = await cart.save();
//     return updatedCart;
//   } catch (error) {
//     console.error('Error in removeProductFromCart service:', error);
//     throw error;
//   }
// }

async function calculateTotalPrice(products) {
  let totalPrice = 0;

  for (const item of products) {
    const product = await Product.findById(item.product);
    if (product) {
      totalPrice += product.price * item.quantity;
    }
  }

  return totalPrice;
}

module.exports = {
  findAllCarts,
  addCartItem,
};
