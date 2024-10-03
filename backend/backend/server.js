// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Basic route for the home page
app.get('/', (req, res) => {
  res.send('Shipify API is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// MongoDB connection (place this before starting the server)

mongoose.connect('mongodb+srv://shipify-backend:saadkhan777@shipify.lweng.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));
  


  const authRoutes = require('./routes/auth');
  app.use('/auth', authRoutes);
  