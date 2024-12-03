const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

const PORT = process.env.PORT || 6565;
require("dotenv").config();
const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:5173" }));
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
  app.use(express.static(path.join(__dirname, "/frontend/vite-project/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "frontend", "vite-project", "dist", "index.html")
    )
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API IS RUNNING...!!!");
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
