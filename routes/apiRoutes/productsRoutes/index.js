const router = require('express').Router();
const productsController = require('./../../../controllers/productsController');

// /api/products
router.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct)

// /api/products
// router.route('/:storeId')
//     .get(storesController.getStore)
//     .post(storesController.addProduct)
//     .delete(storesController.deleteStore)

module.exports = router;