import { useState } from "react";

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        setLoading(true);
        try {
            await onAdd(title.trim());
            setTitle("");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
                disabled={loading}
            />
            <button type="submit" disabled={loading || !title.trim()}>
                {loading ? "Adding..." : "Add Task"}
            </button>
        </form>
    );
}

export default TaskForm;
