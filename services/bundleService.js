const Bundle = require('../models/bundleModel');
const { saveImage, deleteImage } = require('./imageService');

async function findAllBundles(req) {
  try {
    const { search, minPrice, maxPrice, isActive, sortBy, order } = req.query;

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

    if (sortBy && order) {
      sort = { [sortBy]: order };
    }

    const bundle = await Bundle.find(query).sort(sort).populate('products');
    return bundle;
  } catch (error) {
    console.log('Error findAllBundles service: ', error);
    throw error;
  }
}

async function findBundleById(id) {
  try {
    const bundle = await Bundle.findOne({ _id: id }).populate('products');
    return bundle;
  } catch (error) {
    console.log('Error findBundleById service: ', error);
    throw error;
  }
}

async function createBundle(data, file) {
  try {
    const imagePath = await saveImage(file);

    const newBundle = new Bundle({ ...data, image: imagePath });
    const savedBundle = await newBundle.save();

    return await calculateBundlePrice(savedBundle);
  } catch (error) {
    console.log('Error createBundle service: ', error);
    throw error;
  }
}

async function updateBundle(id, data, file) {
  try {
    const existingBundle = await Bundle.findById(id);
    if (!existingBundle) {
      throw new Error('Bundle not found');
    }

    const updatedData = { ...data };

    if (file) {
      const newImagePath = await saveImage(file, existingBundle.image);
      updatedData.image = newImagePath;
    }

    const updatedBundle = await Bundle.findByIdAndUpdate({ _id: id }, updatedData, {
      new: true,
      runValidators: true,
    });

    return await calculateBundlePrice(updatedBundle);
  } catch (error) {
    console.log('Error updateBundle service: ', error);
    throw error;
  }
}

async function deleteBundle(id) {
  try {
    const bundle = await Bundle.findById(id);
    if (!bundle) {
      throw new Error('Bundle not found');
    }
    if (bundle.image) {
      deleteImage(bundle.image);
    }
    await Bundle.findByIdAndDelete({ _id: id });
    return bundle;
  } catch (error) {
    console.log('Error deleteBundle service: ', error);
    throw error;
  }
}

async function calculateBundlePrice(bundle) {
  await bundle.populate('products');
  const bundlePrice = bundle.products.reduce((total, product) => {
    return total + product.price;
  }, 0);
  bundle.price = bundlePrice;

  return await bundle.save();
}

module.exports = {
  findAllBundles,
  findBundleById,
  createBundle,
  updateBundle,
  deleteBundle,
};
