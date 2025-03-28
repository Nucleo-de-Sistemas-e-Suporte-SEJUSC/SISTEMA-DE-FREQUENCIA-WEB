import { NavLink } from "react-router-dom"
import { toast } from "sonner"
import styles from "./style.module.css"
import { use, useState } from "react"

import { useNavigate } from 'react-router-dom';

export function FormLogin() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    const [isValidMatricula, setIsValidMatricula] = useState(false);
    const [isValidSenha, setIsValidSenha] = useState(false);

    const navigate = useNavigate();

    const handleChangeMatricula = (event) => {
        const inputMatricula = event.target.value;
        setMatricula(inputMatricula);

        const regex = /^\d{7}[A-Z]$/;
        if (regex.test(inputMatricula)) {
            setIsValidMatricula(true);
        } else {
            setIsValidMatricula(false);
        }
    };

    const handleChangeSenha = (event) => {
        const inputSenha = event.target.value;
        setSenha(inputSenha);

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8}$/;
        if (regex.test(inputSenha)) {
            setIsValidSenha(true);
        } else {
            setIsValidSenha(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (isValidMatricula && isValidSenha) {
            try {
                const response = await fetch('/dados.json');
                if (!response.ok) throw new Error("Erro ao buscar dados");

                const dados = await response.json();
                
                if (dados.matricula === matricula && dados.senha === senha) {
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

    //console.log(isValidMatricula)
    //console.log(isValidSenha);

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
        
                    <div className={styles["container__button"]} >
                        <div to="" className={styles["container__button__link"]}>
                            <button type="submit" onClick={handleSubmit} disabled={!isValidMatricula || !isValidSenha} style={{cursor: !isValidMatricula || !isValidSenha ? "not-allowed" : "pointer"}} className={styles["form__button"]}>Entrar</button>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}