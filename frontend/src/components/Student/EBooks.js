import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react'; 
import Navbar from './Navbar';

const EBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      const ebooks = response.data.filter((book) => book.category === 'E-books');
      setBooks(ebooks);
      setFilteredBooks(ebooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(books); 
    } else {
      const results = books.filter((book) =>
        book.title.toLowerCase().includes(query)
      );
      setFilteredBooks(results);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col md:flex-col justify-center items-center mt-6 gap-4 px-4">
        <h1 className="text-xl md:text-2xl font-bold text-center">E-Books</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for books..."
          className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-96"
        />
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 w-full">
        {filteredBooks.map((book) => (
          <motion.div
            key={book._id}
            className="border border-gray-300 rounded-lg shadow-md bg-white p-4 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={`http://localhost:5000/uploads/${book.thumbnail}`}
              alt={book.title}
              className="w-full h-56 object-fit rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200';
              }}
            />
            <h3 className="text-lg font-semibold mt-2 text-center">{book.title}</h3>
      
            <div className="mt-4 flex flex-col items-center gap-3 w-full">
       
              <a
                href={`http://localhost:5000/uploads/${book.pdf}`}
                download={book.title}
                target='_blank'
                className="relative overflow-hidden h-12 px-8 rounded-full bg-[#3d3a4e] text-white border-none cursor-pointer group flex items-center justify-center w-full"
              >
                <span className="relative z-10 flex items-center">
                  <Download size={24} className="mr-2" />
                  Download
                </span>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#965de9] to-[#6358ee] scale-x-0 origin-left transition-transform duration-[475ms] group-hover:scale-x-100 rounded-full"></div>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EBooks;
