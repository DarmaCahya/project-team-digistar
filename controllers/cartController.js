const cartService = require('../services/cartService');

async function getCart(req, res) {
  try {
    const carts = await cartService.findAllCarts();
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: carts,
    });
  } catch (error) {
    console.log('Error in getCart controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function addCart(req, res) {
  try {
    const cart = await cartService.addCartItem(req.body);
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: cart,
    });
  } catch (error) {
    console.log('Error in addCart controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

module.exports = {
  getCart,
  addCart,
};
