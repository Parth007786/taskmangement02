const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

require("dotenv").config();
const app = express();
connectDB();

const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://taskmerge01.onrender.com" // Production
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // Allow cookies or auth headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/taskRoute"));
app.use("/uploads", express.static("uploads"));

let NODE_ENV = "production";
if (NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

  app.get("/", (req, res) => {
    res.send("API IS RUNNING...!!!");
  });
}

app.use(errorHandler);
const PORT = process.env.PORT || 6565;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
