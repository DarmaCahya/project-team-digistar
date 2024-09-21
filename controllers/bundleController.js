const bundleService = require('../services/bundleService');

async function getAllBundles(req, res) {
  try {
    const bundles = await bundleService.findAllBundles();
    res.status(200).json(bundles);
  } catch (error) {
    console.log('Error in getAllBundles controller: ', error);
    res.status(500).json({ message: error.message });
  }
}

async function getBundleById(req, res) {
  try {
    const bundle = await bundleService.findBundleById(req.params.id);
    res.status(200).json(bundle);
  } catch (error) {
    console.log('Error in getBundleById controller: ', error);
    res.status(404).json({ message: error.message });
  }
}

async function getBundleByName(req, res) {
  try {
    const bundle = await bundleService.findBundleByName(req.params.name);
    res.status(200).json(bundle);
  } catch (error) {
    console.log('Error in getBundleByName controller: ', error);
    res.status(404).json({ message: error.message });
  }
}

async function createBundle(req, res) {
  try {
    const bundle = await bundleService.creteBundle(req.body);
    res.status(201).json(bundle);
  } catch (error) {
    console.log('Error in createBundle controller: ', error);
    res.status(500).json({ message: error.message });
  }
}

async function updateBundle(req, res) {
  try {
    const updatedBundle = await bundleService.updateBundle(req.params.id, req.body);
    res.status(200).json(updatedBundle);
  } catch (error) {
    console.log('Error in updateBundle controller: ', error);
    res.status(404).json({ message: error.message });
  }
}

async function deleteBundle(req, res) {
  try {
    const deletedBundle = await bundleService.deleteBundle(req.params.id);
    res.status(200).json(deletedBundle);
  } catch (error) {
    console.log('Error in deleteBundle controller: ', error);
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  createBundle,
  getAllBundles,
  getBundleById,
  getBundleByName,
  updateBundle,
  deleteBundle,
};
