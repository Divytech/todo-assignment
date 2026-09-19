const taskService = require("../services/taskService");

async function getTasks(req, res, next) {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

async function getTask(req, res, next) {
    try {
        const task = await taskService.getTaskById(req.params.id);
        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function createTask(req, res, next) {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

async function updateTask(req, res, next) {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function updateStatus(req, res, next) {
    try {
        const task = await taskService.updateStatus(req.params.id, req.body.completed);
        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function deleteTask(req, res, next) {
    try {
        const result = await taskService.deleteTask(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function searchTasks(req, res, next) {
    try {
        const tasks = await taskService.searchTasks(req.query.q);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
    searchTasks
};
