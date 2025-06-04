import axios from "axios";

const isDev = window.location.hostname === "http://12.90.4.191:8001";

export const api = axios.create({
  baseURL: "http://12.90.4.191:8001/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});