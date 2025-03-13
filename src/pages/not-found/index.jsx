import styles from "./style.module.css"
import { NavLink } from "react-router-dom"

export function NotFound() {
    return (
        <section className={styles["container__nao-encontrado"]}>
            <header>
                <h1>404 Erro <br /> <span>Página não encontrada</span></h1>
            </header>

            <main>
                <NavLink to="/gerar" className={styles["container__nao-encontrado_link"]}>Voltar</NavLink>
            </main>
        </section>
    )
}