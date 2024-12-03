const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  upload
} = require("../controllers/taskController");

const router = express.Router();

// Routes
router.post("/", upload.single("image"), createTask); // Single file upload for 'image'
router.get("/", getTasks);
router.put("/:id", upload.single("image"), updateTask); // Update task with optional file upload
router.delete("/:id", deleteTask);

module.exports = router;
