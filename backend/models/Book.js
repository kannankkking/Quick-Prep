const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  course: { type: String },
  thumbnail: { type: String, required: true },
  pdf: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);


 