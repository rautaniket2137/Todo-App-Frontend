import React from "react";
import Navbar from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { Link } from "react-router-dom";


export const Home = () => {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-gray-800 min-h-screen flex flex-col">
      
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
          Welcome to TaskMaster
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-8">
          Manage your tasks efficiently with our powerful todo application.
          Stay organized and boost your productivity.
        </p>

        {/* Button */}
        <Link to="/todo">
          <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </Link>

      </div>

      <Footer />
    </div>
  );
};
