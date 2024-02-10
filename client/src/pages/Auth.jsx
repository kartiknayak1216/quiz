import React from "react";
import AuthButton from "../components/Authbutton.jsx";
import logo from "../images/logo3.jpg";
export default function Auth() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <div className="bg-white p-8 shadow-xl sm:p-10 border border-gray-200 rounded-md max-w-md w-full transform scale-105 hover:scale-100 transition-transform duration-300 ease-in-out">
        <img
          src={logo}
          alt="logo"
          className="mx-auto mb-5 w-20 h-20 rounded-full border-4 border-purple-500 p-1"
        />
        <h1 className="text-center text-2xl font-bold text-purple-600 mb-4">
          Welcome to Chatify
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Chatify is a sleek and user-friendly messaging application designed to
          streamline communication and foster connections.
        </p>
        <AuthButton />
      </div>
    </div>
  );
}
