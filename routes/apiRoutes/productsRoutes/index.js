const router = require('express').Router();
const productsController = require('./../../../controllers/productsController');

// /api/products
router.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct)

// /api/products
router.route('/:product_id')
    .get(productsController.getProduct)
    .delete(productsController.deleteProduct)


module.exports = router;