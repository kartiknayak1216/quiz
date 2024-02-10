import User from "../modules/User.module.js";
import generateToken from "../utils/generateToken.js";

// authController.js - Google Authentication Controller

export const google = async (req, res, next) => {
  const { fullName, userName, profilePic } = req.body;
  try {
    const newUser = await User.findOne({ userName });
    if (newUser) {
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      const newUser = new User({
        fullName,
        userName,
        profilePic,
      });

      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res) => {
  try {
    const { userId } = req.params;
    const { marks } = req.body;

    const user = await User.findByIdAndUpdate(userId, { marks }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Marks updated successfully", user });
  } catch (error) {
    console.error("Error updating marks:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get marks for a user
export const get = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ marks: user.marks });
  } catch (error) {
    console.error("Error getting marks:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
