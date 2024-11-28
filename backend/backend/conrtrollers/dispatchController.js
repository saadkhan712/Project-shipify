// Controller for Route Calculation
const axios = require("axios");
const Dispatch = require("../models/dispatch");

const calculateRoute = async (pickup, delivery) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup}&destination=${delivery}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const route = response.data.routes[0].legs[0].steps.map((step) => ({
      location: { lat: step.end_location.lat, lng: step.end_location.lng },
      address: step.html_instructions.replace(/<[^>]*>/g, ""),
    }));
    return route;
  } catch (error) {
    console.error("Error calculating route:", error.message);
    throw new Error("Route calculation failed");
  }
};



// Controller for Creating Dispatches and Assigning Drivers
const createDispatch = async (req, res) => {
    try {
        const { driverId, shipmentId, pickupLocation, deliveryLocation } = req.body;

        // Calculate route
        const route = await calculateRoute(pickupLocation, deliveryLocation);

        const newDispatch = new Dispatch({
            driverId,
            shipmentId,
            route,
            status: 'Pending'
        });

        await newDispatch.save();
        res.status(201).json({ message: 'Dispatch created successfully', dispatch: newDispatch });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Driver Acceptance and Decline of Dispatch
const acceptDispatch = async (req, res) => {
  try {
    const { dispatchId } = req.body;
    const dispatch = await Dispatch.findByIdAndUpdate(
      dispatchId,
      { status: "In-Progress", updatedAt: Date.now() },
      { new: true }
    );

    if (!dispatch) {
      return res.status(404).json({ message: "Dispatch not found" });
    }

    res.status(200).json({ message: "Dispatch accepted", dispatch });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const declineDispatch = async (req, res) => {
  try {
    const { dispatchId } = req.body;
    const dispatch = await Dispatch.findByIdAndUpdate(
      dispatchId,
      { status: "Pending", driverId: null },
      { new: true }
    );

    if (!dispatch) {
      return res.status(404).json({ message: "Dispatch not found" });
    }

    res.status(200).json({ message: "Dispatch declined", dispatch });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createDispatch, acceptDispatch, declineDispatch };



// Automated Route Re-Optimization with Polling
// const updateRoute = async (req, res) => {
//     try {
//         const { dispatchId, pickupLocation, deliveryLocation } = req.body;
//         const route = await calculateRoute(pickupLocation, deliveryLocation);

//         const updatedDispatch = await Dispatch.findByIdAndUpdate(
//             dispatchId,
//             { route, updatedAt: Date.now() },
//             { new: true }
//         );

//         if (!updatedDispatch) {
//             return res.status(404).json({ message: 'Dispatch not found' });
//         }

//         // Notify driver about route change (for example, via WebSocket or message queue)
//         res.status(200).json({ message: 'Route updated', dispatch: updatedDispatch });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// module.exports = { createDispatch, acceptDispatch, declineDispatch, updateRoute };
