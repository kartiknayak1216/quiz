// server.js
import express from "express";
import cors from "cors";
import connect from "./db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Auth from "./routes/Auth.route.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

const clientPath = path.join(__dirname, "client");
app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});
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
