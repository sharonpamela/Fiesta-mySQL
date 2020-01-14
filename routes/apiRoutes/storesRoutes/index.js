const router = require('express').Router();
const storesController = require('./../../../controllers/storesController');

// /api/stores
router.route('/')
    .get(storesController.getStores) // get all the stores' information
    .post(storesController.createStore) //create a new store entry

// /api/stores
router.route('/:storeId')
    .delete(storesController.deleteStore) // delete a particular store
    .get(storesController.getStore) // get name, city, and state info for a particular store

// /api/stores/products/
router.route('/products/:storeId')
    .get(storesController.getStoreProducts) // get all the products under a particular store
    .post(storesController.addStoreProduct) // add a product to a particular store
    .delete(storesController.deleteStoreProduct) // delete a product from a particular store

module.exports = router;