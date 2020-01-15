const router = require('express').Router();
const inventoryController = require('./../../../controllers/inventoryController');

// /api/inventory
router.route('/')
    .get(inventoryController.getInventory)
    .post(inventoryController.createInventoryEntry)

// /api/inventory
router.route('/:inventory_id')
    .delete(inventoryController.deleteInventoryEntry)
    .get(inventoryController.getInventoryEntry)
    .put(inventoryController.updateInventoryEntry)

module.exports = router;