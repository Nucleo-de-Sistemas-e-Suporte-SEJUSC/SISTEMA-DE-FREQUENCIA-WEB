import { toast } from "sonner"
import styles from "./style.module.css"

export function FormLogin() {
    return (
        <section className={styles["container__form"]}>
            <div>
                <h1 className={styles["container__form__titulo__header"]}>Gestão do RH</h1>
                <h2 className={styles["container__form__titulo"]}>Login</h2>
            </div>

            <section className={styles["container__section__form"]}>
                <form action="#" method="POST" className={styles["form"]}>
                    <div className={styles["container__input"]}>
                        <label htmlFor="usuario" className={styles["label__form"]}>Usuário</label>
                        <input 
                            type="text" 
                            name="usuario"
                            id="usuario"
                            placeholder="Usuário"
                            className={styles["input__form"]}
                        />
                    </div>
                    <div className={styles["container__input"]}>
                        <label htmlFor="senha" className={styles["label__form"]}>Senha</label>
                        <input 
                            type="text" 
                            name="senha"
                            id="senha"
                            placeholder="Senha"
                            className={styles["input__form"]}
                        />
                    </div>
        
                    <div className={styles["container__button"]} >
                        <button type="submit" className={styles["form__button"]} onClick={(e) => {
                            e.preventDefault()
                            toast.error("Erro", {
                                description: "Uso inválido de ID de sessão",
                                duration: 3000,
                            })
                        }}>Entrar</button>
                    </div>
                </form>
            </section>
        </section>
    )
}