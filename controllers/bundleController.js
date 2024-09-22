const bundleService = require('../services/bundleService');

async function getAllBundles(req, res) {
  try {
    const bundles = await bundleService.findAllBundles(req);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: bundles,
    });
  } catch (error) {
    console.log('Error in getAllBundles controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function getBundleById(req, res) {
  try {
    const bundle = await bundleService.findBundleById(req.params.id);

    if (!bundle) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Bundle not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: bundle,
    });
  } catch (error) {
    console.log('Error in getBundleById controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function createBundle(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'No image uploaded',
      });
    }

    const newBundle = await bundleService.createBundle(req.body, req.file);

    return res.status(201).json({
      status: 'success',
      code: 201,
      data: newBundle,
    });
  } catch (error) {
    console.log('Error in createBundle controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function updateBundle(req, res) {
  try {
    const updatedBundle = await bundleService.updateBundle(req.params.id, req.body, req.file);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: updatedBundle,
    });
  } catch (error) {
    console.log('Error in updateBundle controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

async function deleteBundle(req, res) {
  try {
    const deletedBundle = await bundleService.deleteBundle(req.params.id);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: deletedBundle,
    });
  } catch (error) {
    console.log('Error in deleteBundle controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

module.exports = {
  getAllBundles,
  getBundleById,
  createBundle,
  updateBundle,
  deleteBundle,
};
