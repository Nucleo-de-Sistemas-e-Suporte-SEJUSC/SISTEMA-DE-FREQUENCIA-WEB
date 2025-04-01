// src/hooks/useAuth.js
import { useEffect } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import { api } from "../api/axios"

export function useAuth() {
    const navigate = useNavigate();

    async function verificaAutenticacao() {
        try {
        
            // Endpoint no backend que verifica a sessão
            const dados  = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            const response = await dados.json();
            console.log(response)
        } catch (erro) {
            console.error("e => ", erro)
            localStorage.removeItem("nome");
            localStorage.removeItem("role");
            navigate('/');
        }
    }

    useEffect(() => {
        verificaAutenticacao()
    }, []);
}