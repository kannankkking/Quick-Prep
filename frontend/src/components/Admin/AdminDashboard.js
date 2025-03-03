import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminNavbar from '../Admin/AdminNavbar'; 
import { Eye } from 'lucide-react'; 

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      let allBooks = response.data;

  
      if (categoryFilter) {
        allBooks = allBooks.filter((book) => book.category === categoryFilter);
      }

      if (categoryFilter === 'Subject E-books') {
        if (courseFilter) {
          allBooks = allBooks.filter((book) => book.course === courseFilter);
        } else {
          setBooks([]);
          return;
        }
      }

      setBooks(allBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, [categoryFilter, courseFilter]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <AdminNavbar />
      <div className="text-center mt-12 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {['E-books', 'Cheat sheets', 'Subject E-books', 'Interview Questions'].map((category) => (
            <button
              key={category}
              onClick={() => {
                setCategoryFilter(category);
                setCourseFilter('');
              }}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                categoryFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {categoryFilter === 'Subject E-books' && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
            </select>
          </div>
        )}
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-6">
        {books.map((book) => (
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
            <p className="text-gray-500 text-sm">{book.category}</p>
            {book.category === 'Subject E-books' && (
              <p className="text-gray-500 text-sm">{book.course}</p>
            )}
            <div className="mt-4 flex flex-col lg:flex-row items-center gap-3 w-full">
              <a
                href={`http://localhost:5000/uploads/${book.pdf}`}
                target="_blank"
                className="relative overflow-hidden h-12 px-8 rounded-full bg-[#3d3a4e] text-white border-none cursor-pointer group flex items-center justify-center w-full lg:w-auto lg:ml-12"
              >
                <span className="relative z-10 flex items-center">
                  <Eye size={24} className="mr-2" /> 
                  View PDF
                </span>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#965de9] to-[#6358ee] scale-x-0 origin-left transition-transform duration-[475ms] group-hover:scale-x-100 rounded-full"></div>
              </a>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(book._id);
                }}
                className="relative flex items-center justify-start w-10 lg:w-10 h-10 rounded-full cursor-pointer overflow-hidden transition-all shadow-md bg-gradient-to-br from-orange-500 via-red-500 to-red-600 hover:w-32 hover:mr-5 hover:rounded-lg active:translate-x-0.5 active:translate-y-0.5"
              >
                <div className="flex items-center justify-center w-12 h-12 transition-all">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-5 h-5 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                  </svg>
                </div>
                <div className="absolute right-4 opacity-0 text-white text-lg font-semibold transition-all hover:opacity-100">
                  Delete
                </div>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => navigate('/upload')}
        className="rounded-lg fixed bottom-6 right-6  w-40 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
      >
        <span className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
          Add Item
        </span>
        <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg
            className="svg w-8 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default AdminDashboard;
