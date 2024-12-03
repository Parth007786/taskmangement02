import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash, FaImage, FaEye } from "react-icons/fa";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: "1",
        title: "Task 1",
        description: "This is the first task",
        subTasks: [],
        priority: "Medium",
        status: "To-Do",
        image: null
      }
    ],
    inProgress: [],
    completed: []
  });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subTasks: [],
    priority: "Low",
    status: "To-Do",
    image: null
  });

  // Handle the end of a drag event
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // No destination (dropped outside of any droppable)
    if (!destination) return;

    // If the task is dropped in the same section and in the same position, return early (no change)
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Get the source and destination sections
    const sourceList = Array.from(tasks[source.droppableId]);
    const destinationList = Array.from(tasks[destination.droppableId]);

    // Remove the dragged task from the source section
    const [movedTask] = sourceList.splice(source.index, 1);

    // Update the status of the moved task based on the destination section
    movedTask.status =
      destination.droppableId === "todo"
        ? "To-Do"
        : destination.droppableId === "inProgress"
        ? "In Progress"
        : "Completed";

    // Add the moved task to the destination section
    destinationList.splice(destination.index, 0, movedTask);

    // Update the state with the new order and status
    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList
    }));
  };

  // Add a new task to the "To-Do" section
  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    const newTaskData = {
      ...newTask,
      id: Date.now().toString()
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTaskData]
    }));

    setNewTask({
      title: "",
      description: "",
      subTasks: [],
      priority: "Low",
      status: "To-Do",
      image: null
    });
  };

  // Delete task
  const handleDeleteTask = (taskId, section) => {
    const updatedTasks = tasks[section].filter((task) => task.id !== taskId);
    setTasks((prevTasks) => ({ ...prevTasks, [section]: updatedTasks }));
  };

  // Edit task title and description
  const handleEditTask = (taskId, section) => {
    const taskToEdit = tasks[section].find((task) => task.id === taskId);
    if (!taskToEdit) return;

    const updatedTitle =
      prompt("Edit task title:", taskToEdit.title) || taskToEdit.title;
    const updatedDescription =
      prompt("Edit task description:", taskToEdit.description) ||
      taskToEdit.description;

    const updatedTasks = tasks[section].map((task) =>
      task.id === taskId
        ? { ...task, title: updatedTitle, description: updatedDescription }
        : task
    );

    setTasks((prevTasks) => ({ ...prevTasks, [section]: updatedTasks }));
  };

  // Handle file upload for images
  const handleImageClick = (taskId) => {
    document.getElementById(`image-upload-${taskId}`).click(); // Trigger file input click programmatically for specific task
  };

  const handleImageFileChange = (e, taskId) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        const task = updatedTasks.todo.find((task) => task.id === taskId);
        if (task) {
          task.image = file; // Update task with the selected image file
        }
        return updatedTasks;
      });
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="sections-container">
            {["todo", "inProgress", "completed"].map((section) => (
              <Droppable droppableId={section} key={section}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`section ${
                      snapshot.isDraggingOver ? "drag-over" : ""
                    }`}
                  >
                    <h3 className="section-title">
                      {section === "todo"
                        ? "To-Do"
                        : section === "inProgress"
                        ? "In Progress"
                        : "Completed"}
                    </h3>

                    {section === "todo" && (
                      <div className="add-task">
                        <input
                          type="text"
                          placeholder="Title"
                          value={newTask.title}
                          onChange={(e) =>
                            setNewTask((prev) => ({
                              ...prev,
                              title: e.target.value
                            }))
                          }
                          className="add-task-input"
                        />
                        <textarea
                          placeholder="Description"
                          value={newTask.description}
                          onChange={(e) =>
                            setNewTask((prev) => ({
                              ...prev,
                              description: e.target.value
                            }))
                          }
                          className="add-task-textarea"
                        />
                        <button
                          onClick={handleAddTask}
                          className="add-task-btn"
                        >
                          Add Task
                        </button>
                      </div>
                    )}

                    {tasks[section].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`task-card ${
                              task.status === "Completed" ? "completed" : ""
                            }`}
                          >
                            <div className="task-header">
                              <h4
                                className={`task-title ${
                                  task.status === "Completed"
                                    ? "strikethrough"
                                    : ""
                                }`}
                              >
                                {task.title}
                              </h4>
                              <p
                                className={`task-desc ${
                                  task.status === "Completed"
                                    ? "strikethrough"
                                    : ""
                                }`}
                              >
                                {task.description}
                              </p>
                            </div>

                            {/* Image Display */}
                            {task.image && (
                              <img
                                src={URL.createObjectURL(task.image)}
                                alt="Task"
                                className="task-image"
                              />
                            )}

                            {/* Icons placed on the right side */}
                            <div className="task-controls">
                              {task.status !== "Completed" && (
                                <>
                                  <FaEdit
                                    onClick={() =>
                                      handleEditTask(task.id, section)
                                    }
                                  />
                                  <FaImage
                                    onClick={() => handleImageClick(task.id)} // Click triggers image upload
                                    className="image-upload-icon"
                                  />
                                  <input
                                    type="file"
                                    id={`image-upload-${task.id}`}
                                    style={{ display: "none" }} // Hide the file input element
                                    accept="image/*" // Restrict file types to images only
                                    onChange={(e) =>
                                      handleImageFileChange(e, task.id)
                                    } // Trigger the handler when a file is selected
                                  />
                                </>
                              )}
                              <FaTrash
                                onClick={() =>
                                  handleDeleteTask(task.id, section)
                                }
                              />
                              <FaEye
                                onClick={() =>
                                  alert(`Viewing task: ${task.title}`)
                                }
                              />
                            </div>

                            {task.status !== "Completed" && (
                              <div className="task-status-dropdown">
                                <select
                                  value={task.status}
                                  onChange={(e) => {
                                    const updatedTasks = tasks[section].map(
                                      (t) =>
                                        t.id === task.id
                                          ? { ...t, status: e.target.value }
                                          : t
                                    );
                                    setTasks((prevTasks) => ({
                                      ...prevTasks,
                                      [section]: updatedTasks
                                    }));
                                  }}
                                >
                                  <option value="To-Do">To-Do</option>
                                  <option value="In Progress">
                                    In Progress
                                  </option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Dashboard;
