import { useState } from "react";

function TaskItem({ task, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        try {
            await onUpdate(task._id, { completed: !task.completed });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editTitle.trim()) return;
        setLoading(true);
        try {
            await onUpdate(task._id, { title: editTitle.trim() });
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete(task._id);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") {
            setEditTitle(task.title);
            setIsEditing(false);
        }
    };

    return (
        <div className={`task-item ${task.completed ? "completed" : ""} ${loading ? "loading" : ""}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggle}
                disabled={loading}
            />
            {isEditing ? (
                <input
                    type="text"
                    className="edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    autoFocus
                    disabled={loading}
                />
            ) : (
                <span
                    className="task-title"
                    onDoubleClick={() => {
                        setIsEditing(true);
                        setEditTitle(task.title);
                    }}
                >
                    {task.title}
                </span>
            )}
            <div className="task-actions">
                {!isEditing && (
                    <button
                        className="edit-btn"
                        onClick={() => {
                            setIsEditing(true);
                            setEditTitle(task.title);
                        }}
                        disabled={loading}
                    >
                        ✎
                    </button>
                )}
                <button
                    className="delete-btn"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
