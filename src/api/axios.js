import axios from "axios";

const isDev = window.location.hostname === "http://12.90.4.191:8001";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});