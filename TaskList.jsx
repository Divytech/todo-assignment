import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdate, onStatusChange, onDelete }) {
    if (tasks.length === 0) {
        return <p className="message">No tasks found.</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onUpdate={onUpdate}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;
