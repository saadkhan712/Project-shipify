//Contains the logic for creating and managing shipments.

const Shipment = require('../models/shipment');

// Create a shipment
exports.createShipment = async (req, res) => {
  const { origin, destination, weight } = req.body;
  try {
    const shipment = new Shipment({ origin, destination, weight });
    await shipment.save();
    res.status(201).json(shipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all shipments
exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update shipment status
exports.updateShipmentStatus = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });

    shipment.status = req.body.status;
    await shipment.save();
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
