//Defines the schema for the shipment data stored in MongoDB

const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in transit', 'delivered'],
    default: 'pending'
  },
  weight: Number,
  assignedTransporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Shipment', shipmentSchema);
