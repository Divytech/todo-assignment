# To-Do List App (MERN Stack)

A full-stack To-Do List application built with MongoDB, Express.js, React.js, and Node.js.

## Features
- Create, Read, Update, and Delete tasks
- Mark tasks as complete/incomplete
- Search tasks by title
- Responsive dark-themed UI
- Separated pending and completed task sections
- Loading indicators and error handling

## Tech Stack
- **Frontend:** React 18, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose

## Project Structure
```
todo-app/
├── backend/
│   ├── config/db.js           # MongoDB connection
│   ├── models/Task.js         # Mongoose schema
│   ├── services/taskService.js # Business logic
│   ├── controllers/taskController.js # HTTP handlers
│   ├── routes/taskRoutes.js   # API routes
│   ├── middleware/errorHandler.js # Error middleware
│   └── server.js              # Entry point
├── frontend/
│   └── src/
│       ├── api/taskApi.js     # Axios API calls
│       ├── components/        # React components
│       ├── App.jsx            # Main component
│       └── App.css            # Styles
└── README.md
```

## API Endpoints

| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| GET    | /api/tasks           | Get all tasks      |
| POST   | /api/tasks           | Create a task      |
| PUT    | /api/tasks/:id       | Update a task      |
| DELETE | /api/tasks/:id       | Delete a task      |
| GET    | /api/tasks/search?q= | Search tasks       |

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173` and proxy API requests to `http://localhost:5000`.

## Environment Variables

### Backend (.env)
| Variable  | Description                  |
|-----------|------------------------------|
| PORT      | Server port (default: 5000)  |
| MONGO_URI | MongoDB connection string    |

## Challenges Faced

1. **CORS Configuration:** The React dev server runs on port 5173 while Express runs on port 5000. Solved by using Vite's built-in proxy during development and the `cors` npm package on the backend for production.

2. **Real-time UI Sync:** Ensuring the frontend state stays in sync with the database after each CRUD operation. Solved by updating local state immediately after a successful API response instead of re-fetching the entire list.

3. **Search Debouncing:** Typing in the search bar would fire an API call for every keystroke. Solved by implementing a 300ms debounce using `setTimeout` and `clearTimeout` to reduce unnecessary network requests.

4. **Error Handling Across Layers:** Mongoose validation errors, invalid ObjectId formats, and network failures all needed different handling. Solved by creating a centralized error handler middleware on the backend and an error banner component on the frontend.

5. **MongoDB Connection Failures:** If the database connection string is wrong or the database is down, the server should not start silently. Solved by calling `connectDB()` before `app.listen()` and exiting the process on connection failure.
