const catalogService = require('../services/catalogService');

async function getAllCatalog(req, res) {
  try {
    const catalog = await catalogService.findAllCatalog(req);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: catalog,
    });
  } catch (error) {
    console.log('Error in getAllCatalog controller: ', error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
}

module.exports = {
  getAllCatalog,
};
