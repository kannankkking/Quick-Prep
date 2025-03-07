const express = require("express");
const multer = require("multer");
const path = require("path");
const Content = require("../models/content");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });


router.post("/upload", upload.single("files"), async (req, res) => {
  const { textContent } = req.body;
  const file = req.file;

  let filePathImage = null;
  let filePathAudio = null;
  let filePathVideo = null;

  if (file) {
    if (file.mimetype.startsWith("image")) {
      filePathImage = `/uploads/${file.filename}`; 
    } else if (file.mimetype.startsWith("audio")) {
      filePathAudio = `/uploads/${file.filename}`; 
    } else if (file.mimetype.startsWith("video")) {
      filePathVideo = `/uploads/${file.filename}`; 
    }
  }

  try {
    const newContent = new Content({
      textContent,
      filePathImage,
      filePathAudio,
      filePathVideo,
    });
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    console.error("Error uploading content:", error);
    res.status(500).send("Error uploading content");
  }
});

// Route to fetch uploaded content
router.get("/content", async (req, res) => {
  try {
    const content = await Content.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).send("Error fetching content");
  }
});

// Route to delete content
router.delete("/content/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Content.findByIdAndDelete(id);
    res.status(200).send("Content deleted successfully");
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).send("Error deleting content");
  }
});

module.exports = router;