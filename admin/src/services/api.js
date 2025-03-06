import axios from "axios";

export const apiAdmin = axios.create({
    // baseURL: "http://localhost:8000/api/v1/quiz", // Change this to your actual backend URL
    baseURL: import.meta.env.VITE_ADMIN_API_URL, // Change this to your actual backend URL
    withCredentials: true, // ✅ Ensures cookies are sent and received

});