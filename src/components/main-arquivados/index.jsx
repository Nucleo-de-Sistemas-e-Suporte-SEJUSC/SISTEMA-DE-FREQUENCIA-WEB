import styles from "./style.module.css"
import { meses } from "../../utils/meses";
import { CardBuscaServidores } from "../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores";

export function MainArquivados(props) {
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
                        <details className={styles["card__details"]}>
                            <summary className={styles["card__summary"]}>Lucas</summary>
                            <p>Arquivado</p>

                            <div className={styles["card__details__container__button"]}>
                                <button className={`${styles["card__details__atualizar__button"]} ${styles["card__details__button"]} `}>Atualizar</button>
                                <button className={`${styles["card__details__arquivar__button"]} ${styles["card__details__button"]} `}>Desarquivar</button>
                                <button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]} `}>Histórico</button>
                            </div>
                        </details>
                    </CardVisualizarServidores>
                </div>
    
            </section>
        );
}