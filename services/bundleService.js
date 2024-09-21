const Bundle = require('../models/bundleModel');

async function findAllBundles() {
  try {
    const bundle = await Bundle.find().populate('products');
    return bundle;
  } catch (error) {
    console.log('error finding bundle: ', error);
    throw error;
  }
}

async function findBundleById(bundleId) {
  try {
    const bundle = await Bundle.findOne({ _id: bundleId }).populate('products');
    if (!bundle) {
      throw new Error('Bundle not found');
    }
    return bundle;
  } catch (error) {
    console.log('Error finding bundle by ID: ', error);
    throw error;
  }
}

async function creteBundle(bundleData) {
  try {
    const newBundle = new Bundle(bundleData);
    const savedBundle = await newBundle.save();
    return savedBundle;
  } catch (error) {
    console.log('Error creating bundle', error);
    throw error;
  }
}

async function updateBundle(bundleId, updateData) {
  try {
    const updatedBundle = await Bundle.findByIdAndUpdate(
      { _id: bundleId },
      { $set: updateData },
      { new: true, runValidators: true },
    );
    if (!updatedBundle) {
      throw new Error('Bundle not found');
    }
    return updatedBundle;
  } catch (error) {
    console.log('Error updating bundle: ', error);
    throw error;
  }
}

async function deleteBundle(bundleId) {
  try {
    const deletedBundle = await Bundle.findByIdAndDelete({ _id: bundleId });
    if (!deletedBundle) {
      throw new Error('Bundle not found');
    }
    return deletedBundle;
  } catch (error) {
    console.log('Error deleting bundle: ', error);
    throw error;
  }
}

module.exports = {
  findAllBundles,
  findBundleById,
  creteBundle,
  updateBundle,
  deleteBundle,
};
