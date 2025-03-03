import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react'; 
import Navbar from './Navbar';

const SubjectEBooks = () => {
  const [subjectBooks, setSubjectBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [course, setCourse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      fetchSubjectBooks();
    } else {
      setSubjectBooks([]);
      setFilteredBooks([]);
    }
  }, [course]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = subjectBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(subjectBooks);
    }
  }, [searchQuery, subjectBooks]);

  const fetchSubjectBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books', {
        params: { category: 'Subject E-books', course },
      });
      setSubjectBooks(response.data);
      setFilteredBooks(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again later.');
      setSubjectBooks([]);
      setFilteredBooks([]);
    }
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <h1 className="text-center text-xl md:text-2xl font-bold mt-6">
        Subject E-Books
      </h1>
      <div className="mt-4 text-center flex flex-col items-center space-y-4">
        <select
          value={course}
          onChange={handleCourseChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Course</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
        </select>
        {course && (
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for books..."
            className="border border-blue-300 rounded-full px-4 py-2 w-64 md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
      </div>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {course ? (
          filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <motion.div
                key={book._id}
                className="border border-gray-300 rounded-lg shadow-md bg-white p-4 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
              >
                <img
                  src={`http://localhost:5000/uploads/${book.thumbnail}`}
                  alt={book.title}
                  className="w-full h-48 object-fit rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                />
                <h3 className="text-lg font-semibold mt-2 text-center">
                  {book.title}
                </h3>
                <div className="mt-4 flex flex-col items-center gap-3 w-full">
             
                  <a
                    href={`http://localhost:5000/uploads/${book.pdf}`}
                    download
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
            ))
          ) : (
            <p className="text-center w-full mt-4 text-gray-500">
              No books found for the selected course.
            </p>
          )
        ) : (
          <p className="text-center w-full mt-4 text-gray-500">
            Please select a course to view books.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubjectEBooks;
