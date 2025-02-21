import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:8000/api/v1/quiz", // Change this to your actual backend URL
  baseURL: import.meta.env.VITE_ADMIN_API_URL, // Change this to your actual backend URL

});

export const apiUser = axios.create({
  // baseURL: "http://localhost:8000/api/v1/users", // Change this to your actual backend URL
  baseURL: import.meta.env.VITE_USER_API_URL,
});

