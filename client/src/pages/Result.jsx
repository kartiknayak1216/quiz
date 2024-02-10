import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const { answers } = useSelector((state) => state.quiz);
  const { currentUser } = useSelector((state) => state.user);

  const userId = currentUser._id; // Replace "yourUserId" with the actual user ID
  console.log(userId);
  useEffect(() => {
    // Fetch user's marks from the server
    fetch(`/api/auth/users/${userId}/marks`)
      .then((response) => response.json())
      .then((data) => {
        setScore(data.marks);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching user's marks:", error));
  }, [userId]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <div className="bg-white p-8 shadow-xl sm:p-10 border border-gray-200 rounded-md max-w-md w-full transform scale-105 hover:scale-100 transition-transform duration-300 ease-in-out justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <img
              src={currentUser.profilePic}
              alt="profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
              Result
            </h1>
            <p className="text-gray-600 text-lg mb-8 text-center">
              Your Score: {score} out of {answers.length}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transform transition-transform hover:scale-110 mx-auto"
              onClick={() => navigate("/quiz")}
            >
              Retake Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
