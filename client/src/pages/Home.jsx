import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/quiz");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <div className="bg-white p-8 shadow-xl sm:p-10 border border-gray-200 rounded-md max-w-md w-full transform scale-105 hover:scale-100 transition-transform duration-300 ease-in-out mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Welcome to the Quiz App
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center">
          Test your knowledge with our quizzes!
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transform transition-transform hover:scale-110"
            onClick={handleClick} // Pass a function reference
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
