import styles from "./style.module.css"

export function Header(props) {
    const {cabecalhoLogin, titulo } = props

    return (
        <header className={cabecalhoLogin ? "cabecalho__login" : "cabecalho__home"}>
            <section className={styles["container__header"]}>
                <h1 className={
                    cabecalhoLogin ? styles["titulo__login"] : styles["titulo"]
                }>{ titulo }</h1>
            </section>
        </header>
    )
}
