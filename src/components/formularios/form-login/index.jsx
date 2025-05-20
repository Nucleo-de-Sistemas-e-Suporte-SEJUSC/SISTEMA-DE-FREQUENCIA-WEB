import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { toast } from "sonner";
import styles from "./style.module.css";

export function FormLogin() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const response = await fetch('http://12.90.4.191:8000/login', {
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

                const status = response.status

                if (status !== 200) {
                    const dados = await response.json();
                    throw new Error(dados.erro)
                }

                const dados = await response.json()
                const usuarioStorage = {
                    nome: dados.nome,
                    role: dados.role,
                    cargo: dados.cargo,
                    matricula
                }
              
                localStorage.setItem("usuario", JSON.stringify(usuarioStorage));

                if (dados.role === "admin", "editor") {
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
                <h1 className={styles["container__form__titulo__header"]}>SEJUSC - RH</h1>
            </div>

            <section className={styles["container__section__form"]}>
                <form className={styles["form"]}>
                    <div className={styles["container__input"]}>
                        <label htmlFor="matricula" className={styles["label__form"]}>Matrícula</label>
                        <input 
                            type="text" 
                            name="matricula"
                            id="matricula"
                            placeholder="Matrícula"
                            className={styles["input__form"]}
                            value={matricula}
                            onChange={(e) => setMatricula(e.target.value)}
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
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <div className={styles["container__button"]}>
                        <button onClick={handleSubmit} className={styles["form__button"]}>
                            Entrar
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
}
