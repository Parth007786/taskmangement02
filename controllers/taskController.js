const Task = require("../models/task");
const upload = require("../config/multerConfig"); // Import multer configuration

// Create a new task with image upload
const createTask = async (req, res) => {
  try {
    const { title, description, status, user } = req.body;
    const image = req.file ? req.file.path : null; // Get uploaded file path

    // Validate required fields
    if (!title || !description || !user) {
      return res
        .status(400)
        .json({ error: "Title, description, and user are required" });
    }

    const newTask = new Task({
      title,
      description,
      status, // Optional; default is "TODO"
      user,
      image // Image file path
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks or filter by user
const getTasks = async (req, res) => {
  try {
    const { userId, status } = req.query;

    const query = {};
    if (userId) query.user = userId;
    if (status) query.status = status;

    const tasks = await Task.find(query).populate("user", "name email");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task with image upload
const updateTask = async (req, res) => {
  try {
    const { id } = req.params.id.trim();
    const { title, description, status } = req.body;
    const image = req.file ? req.file.path : undefined; // Update image if uploaded

    const updatedFields = { title, description, status };
    if (image) updatedFields.image = image;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, upload };
