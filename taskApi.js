import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api/tasks";

const api = axios.create({
    baseURL: API_URL
});

export async function getTasks() {
    const response = await api.get("/");
    return response.data;
}

export async function createTask(title) {
    const response = await api.post("/", { title });
    return response.data;
}

export async function updateTask(id, data) {
    const response = await api.put(`/${id}`, data);
    return response.data;
}

export async function updateStatus(id, completed) {
    const response = await api.patch(`/${id}/status`, { completed });
    return response.data;
}

export async function deleteTask(id) {
    const response = await api.delete(`/${id}`);
    return response.data;
}

export async function searchTasks(query) {
    const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
    return response.data;
}
