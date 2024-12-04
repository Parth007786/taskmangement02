const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["TODO", "InProgress", "Completed"],
      default: "TODO"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    image: { type: String }
  },
  { timestamps: true, collection: "tasks" }
);
module.exports = mongoose.model("Task", taskSchema, "tasks");
