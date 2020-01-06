const router = require('express').Router();

const storesRoutes = require('./storesRoutes');
const productsRoutes = require('./productsRoutes');
const inventoryRoutes = require('./inventoryRoutes');

// /api  prepended to every route declared in here

// /api/stores
router.use('/stores', storesRoutes);

// /api/products
router.use('/products', productsRoutes);

// /api/inventory
router.use('/inventory', inventoryRoutes);

module.exports = router;
