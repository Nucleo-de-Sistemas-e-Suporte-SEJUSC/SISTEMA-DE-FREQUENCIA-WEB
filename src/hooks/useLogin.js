import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "../api/axios";

export function useLogin() {
	const [credentials, setCredentials] = useState({
		matricula: '',
		password: '',
	})

	const navigate = useNavigate();

	const handleMatriculaChange = (matricula) => {
		setCredentials((prev) => ({ ...prev, matricula }))
	}

	const handlePasswordChange = (password) => {
		setCredentials((prev) => ({ ...prev, password }))
	}

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await api.post('/login', {
            matricula: credentials.matricula,
            senha: credentials.password
        });

        const dados = response.data;

        const usuarioStorage = {
            nome: dados.nome,
            role: dados.role,
            cargo: dados.cargo,
            matricula: credentials.matricula
        };

        localStorage.setItem("usuario", JSON.stringify(usuarioStorage));

        if (["admin", "editor"].includes(dados.role)) {
            toast.success("Usuário autenticado!");
            navigate("/servidores");
        } else {
            toast.error("Matrícula ou senha inválidos!");
        }

    } catch (erro) {
        if (erro.response && erro.response.data && erro.response.data.erro) {
            toast.error(erro.response.data.erro);
        } else {
            toast.error("Erro ao buscar dados");
        }
        console.error(erro);
    }
};


	return {
		credentials,
		handleMatriculaChange,
		handlePasswordChange,
		handleSubmit
	}
}

