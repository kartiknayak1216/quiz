import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goToPrevious,
  goToNext,
  setAnswer,
  setQuestionIndex,
} from "../redux/quizSlice.js";
import { mcqData } from "../mcqData.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Question({ question, options, selectedOption, onChange }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{question}</h2>
      <div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="radio"
              id={`option-${index}`}
              name="options"
              value={option}
              checked={selectedOption === option}
              onChange={onChange}
            />
            <label htmlFor={`option-${index}`} className="ml-2">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Quiz() {
  const dispatch = useDispatch();
  const { questionIndex, answers } = useSelector((state) => state.quiz);
  const currentQuestion = mcqData[questionIndex];
  const navigate = useNavigate(); // Get navigate function for navigation
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  console.log(currentUser._id);
  console.log(answers);
  const handlePrevious = () => {
    dispatch(goToPrevious());
  };

  const handleNext = () => {
    dispatch(goToNext(mcqData.length));
  };

  const handleAnswerChange = (event) => {
    dispatch(setAnswer({ index: questionIndex, answer: event.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Calculate score based on correct answers
      const score = answers.reduce(
        (acc, answer, index) =>
          answer === mcqData[index].correctAnswer ? acc + 1 : acc,
        0
      );

      const userId = currentUser._id;
      const response = await fetch(`/api/auth/users/${userId}/marks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marks: score, // Send the calculated score to the server
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit answers");
      }

      // Reset question index to default value
      dispatch(setQuestionIndex(0));

      // Navigate to the result page
      navigate("/result");
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setLoading(false);
    }
  };

  const isLastQuestion = questionIndex === mcqData.length - 1;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <div className="bg-white p-8 shadow-xl sm:p-10 border border-gray-200 rounded-md max-w-md w-full transform scale-105 hover:scale-100 transition-transform duration-300 ease-in-out mx-auto">
        <img
          src={currentUser.profilePic}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Quiz Page
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center">
          Question {questionIndex + 1} of {mcqData.length}
        </p>
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={answers[questionIndex]}
          onChange={handleAnswerChange}
        />
        <div className="flex justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transform transition-transform hover:scale-110"
            onClick={handlePrevious}
            disabled={questionIndex === 0}
          >
            Previous
          </button>
          {!isLastQuestion && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transform transition-transform hover:scale-110"
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {isLastQuestion && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transform transition-transform hover:scale-110"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
