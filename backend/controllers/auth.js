const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, registerNo, password } = req.body;

    if (!name || !email || !registerNo || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

   
    const existingUser = await User.findOne({ $or: [{ email }, { registerNo }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or register number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ name, email, registerNo, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
};



exports.getRegisteredUsers = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1, registerNo: 1, _id: 0 });
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.error('Error fetching registered users:', error.message);
    res.status(500).json({ error: 'Failed to fetch registered users' });
  }
};


exports.login = async (req, res) => {
  try {
    const { registerNo, password } = req.body;

   
    if (!registerNo || !password) {
      return res.status(400).json({ error: 'Register number and password are required' });
    }

    
    const user = await User.findOne({ registerNo });
    if (!user) {
      return res.status(400).json({ error: 'Invalid register number or password' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid register number or password' });
    }

  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Failed to log in', details: error.message });
  }
};