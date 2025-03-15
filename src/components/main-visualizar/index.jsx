import { Link } from "react-router-dom";
import { meses } from "../../utils/meses";
import { CardBuscaServidores } from "../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores";
import  styles from "./style.module.css";

export function MainVisualizar() {
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
                        placeholder="Pesquisa pelo servidor ou setor ou estagiário"
                        className={styles["form__visualizar__input"]}
                    />
                </div>

                <p>Servidores - Setor: GTI / Mês: Fevereiro </p>
            </form>

            <div className={styles["container__visualizar__content"]}>
               <CardBuscaServidores meses={meses} mes={mes}/>

               <CardVisualizarServidores>
                    <details className={styles["card__details"]}>
                            <summary className={styles["card__summary"]}>Lucas</summary>
                            <p>GTI</p>
                    </details>
               </CardVisualizarServidores>
            </div>

            <div className={styles["container__buttons--visualizar"]}>
                <button className={styles["container__buttons--visualizar-button"]}>
                    <Link to="/servidores">Voltar</Link>
                </button>
                <button className={styles["container__buttons--visualizar-button"]}>Mesclar Arquivos</button>
                <button className={styles["container__buttons--visualizar-button"]}>Visualizar Arquivos</button>
            </div>
        </section>
    );
}