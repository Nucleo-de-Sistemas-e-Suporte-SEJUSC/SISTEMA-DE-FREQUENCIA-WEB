import styles from "./style.module.css"

export function FormLogin() {
    return (
        <section className={styles["container__form"]}>
            <h2 className={styles["container__form__titulo"]}>Login</h2>

            <section className={styles["container__section__form"]}>
                <form action="#" className={styles["form"]}>
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
    
                <div className={styles["container__button"]}>
                    <button type="submit" className={styles["form__button"]}>Entrar</button>
                </div>
                </form>
            </section>
        </section>
    )
}