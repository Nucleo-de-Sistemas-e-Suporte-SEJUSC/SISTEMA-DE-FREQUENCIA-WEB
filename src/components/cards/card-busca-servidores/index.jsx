import styles from "./style.module.css"

export function CardBuscaServidores(props) {
    const { meses, mes, possuiSelecaoDoMes = true } = props

    return (
        <div className={styles["container__visualizar__funcionarios"]}>
            <div className={styles["card__container__details"]}>
                <details className={styles["card__details"]}>
                    <summary className={styles["card__summary"]}>MARCOS LUIZ PEREIRA DOS SANTOS</summary>
                    <p>GTI</p>
                </details>
                <details className={styles["card__details"]}>
                    <summary className={styles["card__summary"]}>MARCOS LUIZ PEREIRA DOS SANTOS</summary>
                    <p>GTI</p>
                </details>
                <details className={styles["card__details"]}>
                    <summary className={styles["card__summary"]}>MARCOS LUIZ PEREIRA DOS SANTOS</summary>
                    <p>GTI</p>
                </details>
                <details className={styles["card__details"]}>
                    <summary className={styles["card__summary"]}>MARCOS LUIZ PEREIRA DOS SANTOS</summary>
                    <p>GTI</p>
                </details>
                <details className={styles["card__details"]}>
                    <summary className={styles["card__summary"]}>MARCOS LUIZ PEREIRA DOS SANTOS</summary>
                    <p>GTI</p>
                </details>
                <details className={styles["card__details"]}>
                    <summary className={styles["card__summary"]}>MARCOS LUIZ PEREIRA DOS SANTOS</summary>
                    <p>GTI</p>
                </details>
            </div>

            { possuiSelecaoDoMes && (
                    <div className={styles["form__filtro__select__container--visualizar"]}>
                    <label htmlFor="selecione">Selecione o mês:</label>
                    <select name="meses" id="meses" className="form__filtro__select form__siltro__select--visualizar" defaultValue={mes}>
                        { meses.map((mes, index) => {
                            return <option key={index} value={mes}>{mes}</option>
                        }) }
                    </select>
                </div>
            ) }

            <div className={styles["container__button__form--visualizar"]}>
                <button>Ir</button>
            </div>  
        </div>
    )
}