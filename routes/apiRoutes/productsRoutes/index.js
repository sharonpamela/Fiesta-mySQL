const router = require('express').Router();
const productsController = require('./../../../controllers/productsController');

// /api/products
router.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct)

// // /api/stores
// router.route('/:storeId')
//     .get(storesController.getStore)
//     .post(storesController.addProduct)
//     .delete(storesController.deleteStore)

// // /api/stores/products/:productId
// router.route('/comments/:storeId')
//     .get(storesController.getStoresProducts);

module.exports = router;