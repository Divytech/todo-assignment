# To-Do List App

A simple MERN To-Do List application using Node.js, Express.js, MongoDB and React.

## Features

- Add a task
- View all tasks
- View one task
- Edit task title
- Update task status using a separate API
- Delete a task
- Search tasks
- Basic validation and error handling
- React frontend connected to the backend

## Project Structure

```text
todo-assignment-main/
├── backend/
│   ├── config/db.js
│   ├── controllers/taskController.js
│   ├── middleware/errorHandler.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── services/taskService.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── api/taskApi.js
│       ├── components/
│       ├── App.jsx
│       └── App.css
└── README.md
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update task details |
| PATCH | `/api/tasks/:id/status` | Update only task status |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/tasks/search?q=keyword` | Search tasks |

### Status Update Example

```json
PATCH /api/tasks/:id/status

{
  "completed": true
}
```

The status update is kept separate from the normal task update endpoint as required by the assignment.

## Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run:

```bash
npm start
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server proxies `/api` requests to the backend.

For a deployed frontend, set:

```env
VITE_API_URL=https://your-backend-url/api/tasks
```

## Testing

The APIs can be tested with Postman. Test the CRUD endpoints, search endpoint and the separate status endpoint.

## Challenges

- Connecting Express to MongoDB and handling connection errors.
- Keeping the React state updated after API requests.
- Handling invalid task IDs and validation errors.
- Separating task title updates from status updates.
- Connecting the React frontend to the deployed backend.

## Deployment

The frontend can be deployed on Netlify and the backend can be deployed on a service such as Render. Add the deployed URLs to the final submission after deployment.
