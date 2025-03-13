import styles from "./style.module.css"

export function CardVisualizarServidores() {
    return (
        <div className={styles["container__visualizar__info"]}>
            <div className={styles["card__servidores--visualizar"]}>
                <div className={styles["card__container__details"]}>
                    <details className={styles["card__details"]}>
                        <summary className={styles["card__summary"]}>Lucas</summary>
                        <p>GTI</p>
                    </details>
                </div>
            </div>
        </div>
    )
}