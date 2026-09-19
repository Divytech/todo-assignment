import { useState } from "react";

function TaskItem({ task, onUpdate, onStatusChange, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [loading, setLoading] = useState(false);

    async function save() {
        if (!title.trim()) return;

        try {
            setLoading(true);
            await onUpdate(task._id, title.trim());
            setEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function changeStatus() {
        try {
            setLoading(true);
            await onStatusChange(task._id, !task.completed);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function remove() {
        try {
            setLoading(true);
            await onDelete(task._id);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function startEdit() {
        setTitle(task.title);
        setEditing(true);
    }

    function cancelEdit() {
        setTitle(task.title);
        setEditing(false);
    }

    return (
        <div className={`task-item ${task.completed ? "completed" : ""}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={changeStatus}
                disabled={loading}
            />

            {editing ? (
                <input
                    className="edit-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") save();
                        if (e.key === "Escape") cancelEdit();
                    }}
                    autoFocus
                />
            ) : (
                <span className="task-title">{task.title}</span>
            )}

            <div className="task-actions">
                {editing ? (
                    <>
                        <button onClick={save} disabled={loading}>Save</button>
                        <button onClick={cancelEdit} disabled={loading}>Cancel</button>
                    </>
                ) : (
                    <button onClick={startEdit} disabled={loading}>Edit</button>
                )}

                <button onClick={remove} disabled={loading}>Delete</button>
            </div>
        </div>
    );
}

export default TaskItem;
