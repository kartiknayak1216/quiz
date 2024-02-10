// server.js
import express from "express";
import cors from "cors";
import connect from "./db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Auth from "./routes/Auth.route.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

// routes
app.use("/api/auth", Auth);

const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`SERVER CONNECTED SUCCESSFULLY ON PORT ${port}`);
    });
  } catch (err) {
    console.log(`FAILED TO CONNECT TO PORT ${err}`);
  }
};

// start server
start();
