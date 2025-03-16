import styles from "./style.module.css"

export function Header(props) {
    const {titulo } = props

    return (
        <header className={styles["cabecalho"]}>
            <h1 className={styles["titulo"]}>{ titulo }</h1>
        </header>
    )
}
