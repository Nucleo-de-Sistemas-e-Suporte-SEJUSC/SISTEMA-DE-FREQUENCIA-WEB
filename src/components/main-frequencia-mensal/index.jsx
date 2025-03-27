import styles from "./style.module.css"
import { meses } from "../../utils/meses";
import { CardBuscaServidores } from "../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores";

export function MainFrequenciaMensal(props) {
        const { funcionarios } = props

        const data = new Date()
        const mesAtual = data.getMonth()
        const mes = meses[mesAtual]
    
        return (
            <section className={styles["container__visualizar"]}>
    
                <form action="#" className={styles["form__visualizar"]}>
                    <div className={styles["form__visualizar__container"]}>
                        <input
                            type="text"
                            name="pesquisa"
                            id="pesquisa"
                            placeholder={`Pesquisa pelos ${funcionarios} ou setor`}
                            className={styles["form__visualizar__input"]}
                        />
                    </div>
    
                    <p>{ funcionarios } - Setor: GTI / Mês: Fevereiro </p>
                </form>
    
                <div className={styles["container__visualizar__content"]}>
                    <CardBuscaServidores 
                        meses={meses} 
                        mes={mes}
                    />

                    <CardVisualizarServidores>
                        <details className={`${styles["card__details"]} ${styles["details__verde"]}`}>
                            <summary className={styles["card__summary"]}>Lucas</summary>
                            <p>Frequencia Mensal Postada : xx/xx/xx</p>

                            <div className={styles["card__details__container__button"]}>
                                <button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]} ${styles["card__details__button__cancelar"]} `}>Visualizar</button>
                            </div>
                        </details>

                        <details className={`${styles["card__details"]} ${styles["details__amarelo"]}`}>
                            <summary className={styles["card__summary"]}>Felipe</summary>
                            <p>Frequencia Mensal desse Mês em Falta / data limite: xx/xx/xx</p>

                            <div className={styles["card__details__container__button"]}>
                                <button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]} ${styles["card__details__button__pendente"]}`}>Visualizar</button>
                            </div>
                        </details>

                        <details className={`${styles["card__details"]} ${styles["details__vermelho"]}`}>
                            <summary className={styles["card__summary"]}>Yuri</summary>
                            <p>Frequencia Mensal de outro mês em falta </p>

                            <div className={styles["card__details__container__button"]}>
                                <button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]} ${styles["card__details__button__nao-enviado-vencido"]} `} >Visualizar</button>
                            </div>
                        </details>

                        <details className={`${styles["card__details"]} ${styles["details__branco"]}`}>
                            <summary className={styles["card__summary"]}>Yasmin</summary>
                            <p>Frequencia Mensal data limite: xx/xx/xx</p>

                            <div className={styles["card__details__container__button"]}>
                                <button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]} ${styles["card__details__button__anexo"]} ${styles["card__details__button__nao-enviado"]}  `}>Visualizar</button>
                            </div>
                        </details>
                    </CardVisualizarServidores>
                </div>
    
            </section>
        );
}