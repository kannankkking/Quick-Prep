const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');


exports.uploadBook = async (req, res) => {
  try {
    const { title, category, course } = req.body;

    
    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }
    if (category === 'Subject E-books' && !course) {
      return res.status(400).json({ error: 'Course is required for Subject E-books' });
    }


    if (!req.files || !req.files['thumbnail'] || !req.files['pdf']) {
      return res.status(400).json({ error: 'Thumbnail and PDF files are required' });
    }

    const thumbnail = req.files['thumbnail'][0];
    const pdf = req.files['pdf'][0];

 
    if (!thumbnail.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Thumbnail must be an image file' });
    }
    if (pdf.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Uploaded file must be a PDF' });
    }


    const newBook = new Book({ title, category, course, thumbnail: thumbnail.filename, pdf: pdf.filename });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error during upload:', error.message);
    res.status(500).json({ error: 'Failed to upload book', details: error.message });
  }
};


exports.getTotalBooks = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    res.status(200).json({ totalBooks });
  } catch (error) {
    console.error('Error fetching total books:', error.message);
    res.status(500).json({ error: 'Failed to fetch total books' });
  }
};
exports.fetchBooks = async (req, res) => {
  try {
    const { category, course } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (course) query.course = course;
    
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  
  try {
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const thumbnailPath = path.join(__dirname, '../uploads', book.thumbnail);
    const pdfPath = path.join(__dirname, '../uploads', book.pdf);
    
    if (fs.existsSync(thumbnailPath)) fs.unlinkSync(thumbnailPath);
    if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);

    await Book.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Book and associated files deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};
