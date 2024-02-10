// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice.js";
import userReducer from "./userSlice.js";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  quiz: quizReducer,
  user: userReducer,
  // Add other reducers if needed
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["quiz", "user"], // Persist only the quiz slice of the state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
