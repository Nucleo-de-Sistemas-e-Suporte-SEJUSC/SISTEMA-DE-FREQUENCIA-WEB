import axios from "axios";

const isDev = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});