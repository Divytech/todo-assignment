const Task = require("../models/Task");

const getAllTasks = async () => {
    return await Task.find().sort({ createdAt: -1 });
};

const getTaskById = async (id) => {
    const task = await Task.findById(id);
    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    return task;
};

const createTask = async (taskData) => {
    if (!taskData.title || taskData.title.trim() === "") {
        const error = new Error("Task title is required and cannot be empty");
        error.statusCode = 400;
        throw error;
    }
    const task = new Task({
        title: taskData.title.trim(),
    });
    return await task.save();
};

const updateTask = async (id, updateData) => {
    const task = await Task.findById(id);
    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    if (updateData.title !== undefined) {
        if (updateData.title.trim() === "") {
            const error = new Error("Task title cannot be empty");
            error.statusCode = 400;
            throw error;
        }
        task.title = updateData.title.trim();
    }
    if (updateData.completed !== undefined) {
        task.completed = updateData.completed;
    }
    return await task.save();
};

const deleteTask = async (id) => {
    const task = await Task.findById(id);
    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    await Task.findByIdAndDelete(id);
    return { message: "Task deleted successfully" };
};

const searchTasks = async (query) => {
    if (!query || query.trim() === "") {
        return await Task.find().sort({ createdAt: -1 });
    }
    return await Task.find({
        title: { $regex: query.trim(), $options: "i" },
    }).sort({ createdAt: -1 });
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
};
