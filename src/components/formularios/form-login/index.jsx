import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { toast } from "sonner";
import styles from "./style.module.css";
import { api } from "../../../api/axios";

export function FormLogin() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleChangeMatricula = (event) => {
        setMatricula(event.target.value);
    };

    const handleChangeSenha = (event) => {
        setSenha(event.target.value);
    };


    const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                // Configurando o axios para enviar cookies

                const response = await fetch('http://127.0.0.1:3000/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        matricula,
                        senha
                    }),
                    credentials: 'include'
                });
                const dados = await response.json();
                console.log(dados)
              
                localStorage.setItem("nome", JSON.stringify(dados.nome));
                localStorage.setItem("role", JSON.stringify(dados.role));
                localStorage.setItem("matricula", JSON.stringify(matricula));

                if (dados.role === "admin") {
                    toast.success("Usuário autenticado!");
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
                            // disabled={!isValidMatricula || !isValidSenha} 
                            // style={{cursor: !isValidMatricula || !isValidSenha ? "not-allowed" : "pointer"}} 
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
