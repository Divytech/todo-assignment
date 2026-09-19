import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
    searchTasks
} from "./api/taskApi";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            setError("Could not load tasks.");
        } finally {
            setLoading(false);
        }
    }

    async function addTask(title) {
        try {
            const task = await createTask(title);
            setTasks((oldTasks) => [task, ...oldTasks]);
        } catch (error) {
            setError("Could not add task.");
            throw error;
        }
    }

    async function editTask(id, title) {
        try {
            const task = await updateTask(id, { title });
            setTasks((oldTasks) =>
                oldTasks.map((item) => item._id === id ? task : item)
            );
        } catch (error) {
            setError("Could not update task.");
            throw error;
        }
    }

    async function changeStatus(id, completed) {
        try {
            const task = await updateStatus(id, completed);
            setTasks((oldTasks) =>
                oldTasks.map((item) => item._id === id ? task : item)
            );
        } catch (error) {
            setError("Could not update task status.");
            throw error;
        }
    }

    async function removeTask(id) {
        try {
            await deleteTask(id);
            setTasks((oldTasks) => oldTasks.filter((item) => item._id !== id));
        } catch (error) {
            setError("Could not delete task.");
            throw error;
        }
    }

    async function search(query) {
        try {
            const data = query.trim() ? await searchTasks(query) : await getTasks();
            setTasks(data);
        } catch (error) {
            setError("Search failed.");
        }
    }

    const pending = tasks.filter((task) => !task.completed).length;
    const done = tasks.filter((task) => task.completed).length;

    return (
        <div className="app">
            <main className="container">
                <h1>To-Do List</h1>

                <TaskForm onAdd={addTask} />
                <SearchBar onSearch={search} />

                {error && (
                    <div className="error">
                        {error}
                        <button onClick={() => setError("")}>X</button>
                    </div>
                )}

                {loading ? (
                    <p className="message">Loading tasks...</p>
                ) : (
                    <TaskList
                        tasks={tasks}
                        onUpdate={editTask}
                        onStatusChange={changeStatus}
                        onDelete={removeTask}
                    />
                )}

                <div className="stats">
                    Total: {tasks.length} | Pending: {pending} | Completed: {done}
                </div>
            </main>
        </div>
    );
}

export default App;
