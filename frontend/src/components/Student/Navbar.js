import React, { useState } from "react";
import { IoMdHome, IoMdBook, IoMdList, IoMdHelpCircle } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../images/logo1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const nav = [
    { name: "Home", path: "/Home", icon: <IoMdHome /> },
    { name: "E-Books", path: "/ebooks", icon: <IoMdBook /> },
    { name: "CheatSheet", path: "/cheatsheets", icon: <IoMdList /> },
    { name: "Sub E-Books", path: "/subjectebooks", icon: <IoMdBook /> },
    { name: "Interview IQ", path: "/interviewquestions", icon: <IoMdHelpCircle /> },
  ];

  const handleLogout = () => {
    navigate("/UserLogin");
  };

  const isHomePage = location.pathname === "/Home";

  return (
    <div className="flex flex-col">
      <div className="bg-white shadow-md px-4 py-2 flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-screen-lg">
          <Link to="/">
            {/* <img src={Logo} alt="Logo" className="w-28 h-auto" /> */}
            <h1 className="italic">Quick Prep</h1>
          </Link>
          <div className="hidden md:flex gap-8 list-none">
            {nav.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`text-base font-serif lg:text-lg transition duration-300 hover:text-purple-600 ${
                    location.pathname === item.path ? "text-purple-600" : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </div>
          {isHomePage && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50 md:hidden">
        <div className="flex justify-around items-center py-2">
          {nav.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center text-sm transition duration-300 hover:text-purple-600 ${
                location.pathname === item.path ? "text-purple-600" : "text-gray-600"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
