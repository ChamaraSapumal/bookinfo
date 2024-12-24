// src/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Book Finder</h1>
      <p className="text-lg mb-8">
        Discover your next favorite book by searching with ISBN.
      </p>
      <Link
        to="/login"
        className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-200 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
