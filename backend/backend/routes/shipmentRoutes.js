//Defines the API endpoints for shipment-related actions.

const express = require('express');
const {
  createShipment,
  getShipments,
  updateShipmentStatus,
  updateShipmentLocation,
} = require("../controllers/shipmentController");
const auth = require('../middleware/auth'); // Ensure authentication for protected routes
const router = express.Router();

router.post('/', auth, createShipment);  // Only authenticated users can create shipments
router.get('/', getShipments);
router.put('/:id', auth, updateShipmentStatus);
router.patch("/update-location", updateShipmentLocation);

module.exports = router;


// router.patch('/update-status', updateShipmentStatus);