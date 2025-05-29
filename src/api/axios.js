import axios from "axios";

const isDev = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: isDev ? "http://localhost:8000/api" : "http://12.90.4.191:8000/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});