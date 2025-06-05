import axios from "axios";

const isDev = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: isDev 
    ? "http://12.90.4.191:8001/api"  // endereço para desenvolvimento
    : "/api",                       // endpoint relativo para produção
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
