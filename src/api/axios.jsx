import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:2001/api",
  // baseURL:"https://todo-app-backend-vn5c.onrender.com"
  baseURL: import.meta.env.VITE_API_URL
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;