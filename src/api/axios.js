import axios from "axios";

const isDev = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: isDev ? "http://localhost:8001/api" : "http://12.90.4.98:8001/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});