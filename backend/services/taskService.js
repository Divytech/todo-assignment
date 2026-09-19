const Task = require("../models/Task");

async function getAllTasks() {
    return Task.find().sort({ createdAt: -1 });
}

async function getTaskById(id) {
    const task = await Task.findById(id);

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;
}

async function createTask(data) {
    if (!data.title || !data.title.trim()) {
        const error = new Error("Task title is required");
        error.statusCode = 400;
        throw error;
    }

    const task = new Task({
        title: data.title.trim()
    });

    return task.save();
}

async function updateTask(id, data) {
    const task = await getTaskById(id);

    if (data.title !== undefined) {
        if (!data.title.trim()) {
            const error = new Error("Task title cannot be empty");
            error.statusCode = 400;
            throw error;
        }

        task.title = data.title.trim();
    }

    return task.save();
}

async function updateStatus(id, completed) {
    const task = await getTaskById(id);

    if (typeof completed !== "boolean") {
        const error = new Error("completed must be true or false");
        error.statusCode = 400;
        throw error;
    }

    task.completed = completed;
    return task.save();
}

async function deleteTask(id) {
    const task = await getTaskById(id);
    await task.deleteOne();

    return { message: "Task deleted successfully" };
}

async function searchTasks(query) {
    if (!query || !query.trim()) {
        return getAllTasks();
    }

    return Task.find({
        title: { $regex: query.trim(), $options: "i" }
    }).sort({ createdAt: -1 });
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
    searchTasks
};
