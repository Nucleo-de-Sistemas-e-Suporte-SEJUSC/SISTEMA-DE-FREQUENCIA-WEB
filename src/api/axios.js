import axios from "axios";

export const api = axios.create({
    baseURL: "https://8796-131-161-126-34.ngrok-free.app/api",
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})