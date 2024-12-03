# Task Management Application with Authentication and Drag & Drop Functionality.

# This is a full-stack Task Management Application built with React, TanStack Query, and React-Beautiful-DnD on the frontend and a Node.js backend. It features user authentication (register, login, logout) and allows users to create, view, and manage tasks with a drag-and-drop interface.


🚀 Features
User Authentication:
Users can register, log in, and log out securely using JWT.

Task Management:
Create, view, and delete tasks seamlessly.

Drag & Drop:
Tasks can be reordered using a modern drag-and-drop interface provided by react-beautiful-dnd.

Optimized State Management:
Powered by TanStack Query, ensuring efficient data fetching and caching.

Responsive Design:
Fully responsive for both desktop and mobile users..

---

🛠️ Technologies Used

# Frontend:
React: Component-based UI development.
TanStack Query: Data fetching and caching for seamless task management.
React-Beautiful-DnD: Drag-and-drop functionality.
Axios: For making API requests.

# Backend:
Node.js: Runtime for backend logic.
Express.js: RESTful API creation.
MongoDB: Database to store users.
Mongoose: ODM for MongoDB.

# Middleware
- `express.json()`
- CORS

---

📚 Prerequisites
Before running the project, ensure you have:

- Node.js (v14 or later)
- MongoDB installed and running locally or in the cloud.
- A terminal or code editor (e.g., VS Code).
- Git

---

## Setup Instructions

### 1. Clone the Repository

(```bash
git clone https://github.com/parth007786/task-management-app.git
cd task-management-app)

# Configure Environment Variables
Create a .env file in the backend folder
# Install Dependencies
- npm install
- npm install --prefix frontend
# Run the Application
- npm run start

🌟 Challenges Faced & Solutions

1. Drag-and-Drop Integration
Problem: Ensuring tasks update their order in the database after being rearranged.
Solution: Used the onDragEnd handler from react-beautiful-dnd to capture new task order and update the backend.

2. Handling Authentication
Problem: Managing JWT tokens for secure API requests.
Solution: Implemented Axios interceptors to include the JWT token in every request.

3. State Management
Problem: Efficiently fetching and caching tasks for optimal performance.
Solution: Used TanStack Query to minimize redundant API calls and keep data synchronized.

4. CORS Issues
Problem: Cross-origin requests failing during local development.
Solution: Added CORS middleware in the backend:
js

- const cors = require("cors");
- app.use(cors());

  🏗️ Future Improvements
- Implement user profiles and avatars.
- Add task deadlines and notifications.


