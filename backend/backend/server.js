// server.js 
// This is the core file that initializes and runs the Express server.
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;
// app.use(bodyParser.json());
app.use(express.json());

// Basic route for the home page
app.get('/', (req, res) => {
  res.send('Shipify API is running');
});

// Start the server
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});


connectDB();
// MongoDB connection (place this before starting the server)

mongoose.connect('mongodb+srv://******-******:********@shipify.lweng.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));
  

// Import the router files
  const authRoutes = require('./routes/authRoutes');
  app.use('/auth', authRoutes);
  app.use("/users", authRoutes);
  

//   // Add this in your app.js or a separate cron job file
// const cron = require('node-cron');
// const { updateRoute } = require('./controllers/dispatchController');

// cron.schedule('*/30 * * * *', () => {
//     console.log('Checking routes for re-optimization...');
//     // Call `updateRoute` function for active dispatches
// });
