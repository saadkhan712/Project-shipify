// Contains the business logic for user authentication (signup and login).

const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// User signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User login
exports.login = async (req, res) => {
 try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);
    res.json({ message: 'Login successful' , token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// module.exports = { signup, login };
