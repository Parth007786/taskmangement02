const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
const fs = require("fs");

require("dotenv").config();
const app = express();
connectDB();

const NODE_ENV = process.env.NODE_ENV || "development";

// CORS configuration
const corsOptions = {
  origin:
    NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/taskRoute"));
app.use("/uploads", express.static("uploads"));

// Serve static files in production
if (NODE_ENV === "production") {
  const __dirname = path.resolve();
  const distPath = path.join(__dirname, "frontend/dist");

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  } else {
    console.error(
      "Frontend build not found. Ensure 'npm run build' is executed."
    );
  }

  // Optional: Serve production uploads folder
  app.use(
    "/uploads",
    express.static(process.env.UPLOAD_PATH || "/var/data/uploads")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API IS RUNNING...!!!");
  });
}

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 6565;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  console.log(`App running in ${NODE_ENV} mode`);
});
