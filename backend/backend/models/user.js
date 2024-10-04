// Defines the schema (structure) for the User object in MongoDB.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'transporter', 'admin'],
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
