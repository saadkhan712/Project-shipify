//Contains the logic for creating and managing shipments.

const Shipment = require('../models/shipment');

// Create a shipment
exports.createShipment = async (req, res) => {
  const { shipmentId, pickupLocation, deliveryLocation, senderDetails, receiverDetails, weight } = req.body;
  try {
    const newShipment = new Shipment({
      shipmentId,
      pickupLocation,
      deliveryLocation,
      senderDetails,
      receiverDetails,
      weight,
    });
    await newShipment.save();
    res
      .status(201)
      .json({
        message: "Shipment created successfully",
        shipment: newShipment,
      });
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



//  // controllers/shipmentController.js (continued)
// exports.updateShipmentStatus = async (req, res) => {
//     try {
//         const { shipmentId, status } = req.body;
//         const shipment = await Shipment.findOneAndUpdate(
//             { shipmentId },
//             { status, updatedAt: Date.now() },
//             { new: true }
//         );

//         if (!shipment) {
//             return res.status(404).json({ message: 'Shipment not found' });
//         }

//         res.status(200).json({ message: 'Shipment status updated', shipment });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };




// controllers/shipmentController.js (continued)
exports.updateShipmentLocation = async (req, res) => {
    try {
        const { shipmentId, lat, lng } = req.body;
        const shipment = await Shipment.findOneAndUpdate(
            { shipmentId },
            { location: { lat, lng }, updatedAt: Date.now() },
            { new: true }
        );

        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }

        res.status(200).json({ message: 'Shipment location updated', shipment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// const { broadcastLocationUpdate } = require("../server");

// // Inside updateShipmentLocation function
// broadcastLocationUpdate({ shipmentId, lat, lng });

