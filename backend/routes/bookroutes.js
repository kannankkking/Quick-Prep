// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path'); 
// const bookController = require('../controllers/upload'); 

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads')); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); 

//   },
// });

// const upload = multer({ storage });
// router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'pdf' }]), bookController.uploadBook);
// router.get('/', bookController.fetchBooks);
// router.delete('/:id', bookController.deleteBook);


// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bookController = require('../controllers/upload');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Routes
router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'pdf' }]), bookController.uploadBook); // Upload a book
router.get('/', bookController.fetchBooks); // Fetch all books
router.delete('/:id', bookController.deleteBook); // Delete a book
router.get('/total-books', bookController.getTotalBooks); // Fetch total number of books

module.exports = router;