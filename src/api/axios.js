import axios from "axios";

const isDev = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: isDev ? "http://localhost:8000/api" : "http://12.90.4.88:8000/api",
  withCredentials: true,
});