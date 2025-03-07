const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  textContent: String,
  filePathImage: String,
  filePathAudio: String,
  filePathVideo: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Content", contentSchema);