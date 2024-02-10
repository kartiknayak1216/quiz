import { createSlice } from "@reduxjs/toolkit";
import { mcqData } from "../mcqData.js";

const initialState = {
  questionIndex: 0,
  answers: Array(mcqData.length).fill(null), // Initialize answers array with null values
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    goToPrevious: (state) => {
      if (state.questionIndex > 0) {
        state.questionIndex--;
      }
    },
    goToNext: (state, action) => {
      if (state.questionIndex < action.payload - 1) {
        state.questionIndex++;
      }
    },
    setQuestionIndex: (state, action) => {
      state.questionIndex = action.payload;
    },
    setAnswer: (state, action) => {
      const { index, answer } = action.payload;
      state.answers[index] = answer; // Update the answer at the specified index directly
    },
  },
});

export const { goToPrevious, goToNext, setQuestionIndex, setAnswer } =
  quizSlice.actions;
export default quizSlice.reducer;
