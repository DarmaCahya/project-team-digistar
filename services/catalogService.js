const Product = require('../models/productModel');
const Bundle = require('../models/bundleModel');

async function findAllCatalog(req) {
  try {
    const { search, minPrice, maxPrice, isActive, sortBy, order } = req.query;

    console.log(req.query, 'req.queryres.query');

    const query = {};
    const sort = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
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

    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1; // -1 for descending, 1 for ascending
    }

    const product = await Product.find(query).sort(sort);
    const bundle = await Bundle.find(query).sort(sort).populate('products');

    return [...bundle, ...product];
  } catch (error) {
    console.log('Error findAllCatalog service: ', error);
    throw error;
  }
}

module.exports = {
  findAllCatalog,
};
