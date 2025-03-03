const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const adminRoutes = require('./routes/Adminroutes');  
const authRoutes = require('./routes/authroutes');
const bookRoutes = require('./routes/bookroutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use the admin routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/admin', adminRoutes); 

// Server Setup
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
