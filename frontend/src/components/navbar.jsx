import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white fixed top-0 w-full shadow-md z-50 flex justify-between items-center px-6 py-3">
      <Link to="/" className="text-xl font-bold text-blue-600">TG Diagnostics</Link>
      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link>
        <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded hover:bg-blue-200">Login</button>
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;

