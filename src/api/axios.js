import axios from "axios";

export const api = axios.create({
   //seURL: "https://9430-131-161-126-34.ngrok-free.app",
    baseURL: "http://12.90.4.97:8000/api",
    withCredentials: true
})