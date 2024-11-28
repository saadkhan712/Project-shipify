// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// // const User = require('../models/user');
// // const router = express.Router();

// // Register a new user
// router.post('/signup', async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// 

// Defines the API endpoints related to authentication.
const express = require('express');
const { signup, login } = require('../conrtrollers/authcontrollers');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;




