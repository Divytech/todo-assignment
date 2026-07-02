import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api/tasks";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getTasks = async () => {
    const response = await api.get("/");
    return response.data;
};

export const createTask = async (title) => {
    const response = await api.post("/", { title });
    return response.data;
};

export const updateTask = async (id, updateData) => {
    const response = await api.put(`/${id}`, updateData);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

export const searchTasks = async (query) => {
    const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
    return response.data;
};
