import React, { useState } from "react";
import toast from "react-hot-toast";
import app from "../../firebase.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/userSlice.js";
import logo from "../images/logo4.png";

export default function AuthButton() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      dispatch(signInStart());

      setLoading(true);

      const provider = new GoogleAuthProvider(); // Define provider
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: result.user.displayName,
          userName: result.user.email,
          profilePic: result.user.photoURL,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.error));

        throw new Error(data.error || "Failed to authenticate with Google.");
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      if (res.ok) {
        dispatch(signInSuccess(data));

        console.log("sucess");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="mt-6 flex items-center justify-center rounded-md border px-8 py-2 outline-none ring-gray-400 ring-offset-2 transition focus:ring hover:border-transparent hover:bg-gray-200 hover:text-gray-900 mx-auto"
      disabled={loading}
      onClick={handleGoogleSignIn}
    >
      <img className="mr-2 h-5" src={logo} alt="Google Icon" />
      Continue with Google
    </button>
  );
}
