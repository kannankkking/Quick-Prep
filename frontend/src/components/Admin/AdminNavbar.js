import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBars } from 'react-icons/fa'; 

const AdminNavbar = () => {
  const [userCount, setUserCount] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    
    const fetchRegisteredUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/registered-users');
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching registered users:', error);
      }
    };
    const fetchTotalBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books/total-books');
        setTotalBooks(response.data.totalBooks);
      } catch (error) {
        console.error('Error fetching total books:', error);
      }
    };

    fetchRegisteredUsers();
    fetchTotalBooks();
  }, []);

  return (
    <div className='z-50'>

      <button
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
      >

        <FaBars size={24} />
      </button>

 
      <div
        className={`fixed top-0 right-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        } bg-gray-800 text-white shadow-lg rounded-lg w-64 h-full `}
      >
     
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white p-2"
        >
          X
        </button>

        <div className="mt-12 p-4">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <p className="mt-4 font-bold text-lg">Registered Students: {userCount}</p>
          <p className="mt-2 font-bold text-lg">Total Books: {totalBooks}</p>
        </div>
      </div>
      <div className={`ml-64 ${isOpen ? 'opacity-30' : 'opacity-100'} transition-opacity`}>

      </div>
    </div>
  );
};

export default AdminNavbar;
