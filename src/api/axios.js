import axios from "axios";

export const api = axios.create({
    baseURL: "https://8447-131-161-126-34.ngrok-free.app",
    withCredentials: true
})