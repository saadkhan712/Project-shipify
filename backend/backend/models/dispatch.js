// models/Dispatch.js
const mongoose = require("mongoose");

const dispatchSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  shipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },
  route: [
    {
      location: { lat: Number, lng: Number },
      address: String,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "In-Progress", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dispatch", dispatchSchema);
