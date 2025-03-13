import styles from "./style.module.css"

export function CardVisualizarServidores({ children }) {
    return (
        <div className={styles["container__visualizar__info"]}>
            <div className={styles["card__servidores--visualizar"]}>
                <div className={styles["card__container__details"]}>
                    { children }
                </div>
            </div>
        </div>
    )
}