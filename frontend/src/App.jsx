import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask, searchTasks } from "./api/taskApi";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError("Failed to load tasks. Make sure the backend server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAdd = async (title) => {
        try {
            const newTask = await createTask(title);
            setTasks((prev) => [newTask, ...prev]);
        } catch (err) {
            setError("Failed to add task");
            throw err;
        }
    };

    const handleUpdate = async (id, updateData) => {
        try {
            const updated = await updateTask(id, updateData);
            setTasks((prev) =>
                prev.map((task) => (task._id === id ? updated : task))
            );
        } catch (err) {
            setError("Failed to update task");
            throw err;
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((task) => task._id !== id));
        } catch (err) {
            setError("Failed to delete task");
            throw err;
        }
    };

    const handleSearch = useCallback(
        (query) => {
            if (searchTimeout) clearTimeout(searchTimeout);

            const timeout = setTimeout(async () => {
                setError(null);
                try {
                    if (query.trim() === "") {
                        const data = await getTasks();
                        setTasks(data);
                    } else {
                        const data = await searchTasks(query);
                        setTasks(data);
                    }
                } catch (err) {
                    setError("Search failed");
                }
            }, 300);

            setSearchTimeout(timeout);
        },
        [searchTimeout]
    );

    return (
        <div className="app">
            <div className="container">
                <h1>To-Do List</h1>
                <TaskForm onAdd={handleAdd} />
                <SearchBar onSearch={handleSearch} />

                {error && (
                    <div className="error-banner">
                        <span>{error}</span>
                        <button onClick={() => setError(null)}>✕</button>
                    </div>
                )}

                {loading ? (
                    <div className="loader">
                        <div className="spinner"></div>
                        <p>Loading tasks...</p>
                    </div>
                ) : (
                    <TaskList
                        tasks={tasks}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                )}

                <div className="stats">
                    <span>Total: {tasks.length}</span>
                    <span>Pending: {tasks.filter((t) => !t.completed).length}</span>
                    <span>Done: {tasks.filter((t) => t.completed).length}</span>
                </div>
            </div>
        </div>
    );
}

export default App;
