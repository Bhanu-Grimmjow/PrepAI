import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export async function getTopics() {
    const res = await api.get("/api/sessions/topics");
    return res.data;
}

export async function createSession(topic) {
    const res = await api.post("/api/sessions", { topic });
    return res.data;
}

export async function getSessionById(sessionId) {
    const res = await api.get(`/api/sessions/${sessionId}`);
    return res.data;
}

export async function submitAnswer(sessionId, payload) {
    const res = await api.post(`/api/sessions/${sessionId}/answers`, payload);
    return res.data;
}
