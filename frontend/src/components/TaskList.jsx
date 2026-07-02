import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdate, onDelete }) {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>No tasks found. Add one above!</p>
            </div>
        );
    }

    const pending = tasks.filter((t) => !t.completed);
    const completed = tasks.filter((t) => t.completed);

    return (
        <div className="task-list">
            {pending.length > 0 && (
                <div className="task-section">
                    <h3>Pending ({pending.length})</h3>
                    {pending.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
            {completed.length > 0 && (
                <div className="task-section">
                    <h3>Completed ({completed.length})</h3>
                    {completed.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;
