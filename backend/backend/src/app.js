// to implement websocket tracking for shipment update
// app.js
// const express = require("express");
// const http = require("http");
// const WebSocket = require("ws");
// const connectDB = require("./config/db");
// const shipmentRoutes = require("./routes/shipmentRoutes");

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// connectDB();
// app.use(express.json());

// // Define REST API routes
// app.use("/shipments", shipmentRoutes);

// // WebSocket connection for real-time tracking
// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     console.log("Received:", message);
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

// // Function to broadcast location updates
// const broadcastLocationUpdate = (locationData) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(locationData));
//     }
//   });
// };

// // Export the function to use it in controllers for location updates
// module.exports = { broadcastLocationUpdate };

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
