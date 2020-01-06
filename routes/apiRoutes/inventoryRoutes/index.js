const router = require('express').Router();
const inventoryController = require('./../../../controllers/inventoryController');

// /api/inventory
router.route('/')
    .get(inventoryController.getInventory)

module.exports = router;