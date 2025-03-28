import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importando o axios

import { toast } from "sonner";
import styles from "./style.module.css";

export function FormLogin() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    const [isValidMatricula, setIsValidMatricula] = useState(false);
    const [isValidSenha, setIsValidSenha] = useState(false);

    const matriculaSalva = localStorage.getItem("matricula");
    const senhaSalva = localStorage.getItem("senha");

    const navigate = useNavigate();

    if(matriculaSalva || senhaSalva) {
        console.log("não tem matricula ou senha");
        useEffect(() => {
            navigate("/home");
        }, [])
    }

    const handleChangeMatricula = (event) => {
        const inputMatricula = event.target.value;
        setMatricula(inputMatricula);

        if (inputMatricula) {
            setIsValidMatricula(true);
        } else {
            setIsValidMatricula(false);
        }
    };

    const handleChangeSenha = (event) => {
        const inputSenha = event.target.value;
        setSenha(inputSenha);

        if (inputSenha.length >= 8) {
            setIsValidSenha(true);
        } else {
            setIsValidSenha(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isValidMatricula && isValidSenha) {
            try {
                // Configurando o axios para enviar cookies
                axios.defaults.withCredentials = true;

                const response = await axios.post(' http://12.90.4.88:3000/login', {
                    matricula: matricula,
                    senha: senha
                });

                const dados = response.data;
                console.log(dados);

                if (dados) {
                    toast.success("Usuário autenticado!");
                    localStorage.setItem("matricula", matricula);
                    localStorage.setItem("senha", senha);
                    navigate("/home");
                } else {
                    toast.error("Matrícula ou senha inválidos!");
                }

            } catch (erro) {
                toast.error("Erro ao buscar dados");
                console.error(erro);
            } finally {
                console.log("Requisição finalizada.");
            }
        }
    };

    return (
        <section className={styles["container__form"]}>
            <div>
                <h1 className={styles["container__form__titulo__header"]}>Gestão do RH</h1>
                <h2 className={styles["container__form__titulo"]}>Login</h2>
            </div>

            <section className={styles["container__section__form"]}>
                <form action="#" method="POST" className={styles["form"]}>
                    <div className={styles["container__input"]}>
                        <label htmlFor="matricula" className={styles["label__form"]}>Matrícula</label>
                        <input 
                            type="text" 
                            name="matricula"
                            id="matricula"
                            placeholder="Matrícula"
                            className={styles["input__form"]}
                            value={matricula}
                            onChange={handleChangeMatricula}
                        />
                    </div>
                    <div className={styles["container__input"]}>
                        <label htmlFor="senha" className={styles["label__form"]}>Senha</label>
                        <input 
                            type="password" 
                            name="senha"
                            id="senha"
                            placeholder="Senha"
                            className={styles["input__form"]}
                            value={senha}
                            onChange={handleChangeSenha}
                        />
                    </div>

                    <div className={styles["container__button"]}>
                        <button 
                            type="submit" 
                            onClick={handleSubmit} 
                            disabled={!isValidMatricula || !isValidSenha} 
                            style={{cursor: !isValidMatricula || !isValidSenha ? "not-allowed" : "pointer"}} 
                            className={styles["form__button"]}
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
}
