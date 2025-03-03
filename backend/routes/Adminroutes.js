const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { collection: 'Adminlogin' });

const AdminModel = mongoose.model("Adminlogin", AdminSchema);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const admin = await AdminModel.findOne({ username: new RegExp("^" + username + "$", "i") });

    if (!admin) {
      console.log("No admin found with username:", username);
      return res.status(404).json({ message: "No admin found with this username" });
    }


    if (password === admin.password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
