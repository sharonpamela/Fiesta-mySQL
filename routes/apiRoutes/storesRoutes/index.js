const router = require('express').Router();
const storesController = require('./../../../controllers/storesController');

// /api/stores
router.route('/')
    .get(storesController.getStores)
    .post(storesController.createStore)

// // /api/stores
// router.route('/:storeId')
//     .get(storesController.getStore)
//     .post(storesController.addProduct)
//     .delete(storesController.deleteStore)

// // /api/stores/products/:productId
// router.route('/comments/:storeId')
//     .get(storesController.getStoresProducts);

module.exports = router;