// Update User Schema
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default:
        "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png",
    },
    marks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
