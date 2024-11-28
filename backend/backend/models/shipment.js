//Defines the schema for the shipment data stored in MongoDB

const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  pickupLocation: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  senderDetails: {
    name: String,
    contact: String,
  },
  receiverDetails: {
    name: String,
    contact: String,
  },
  status: {
    type: String,
    enum: ["pending", "in transit", "delivered"],
    default: "pending",
  },
  weight: Number,
  assignedTransporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    lat: Number,
    lng: Number,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shipment', shipmentSchema);
