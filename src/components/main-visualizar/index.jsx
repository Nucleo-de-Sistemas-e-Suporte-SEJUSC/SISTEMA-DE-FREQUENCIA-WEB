import { Link } from "react-router-dom";
import { CardBuscaServidores } from "../card-busca-servidores";
import { CardVisualizarServidores } from "../card-visualizar-servidores";
import { meses } from "../main/utils/meses";
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
                        placeholder="Pesquisa pelo servidor ou setor"
                        className={styles["form__visualizar__input"]}
                    />
                </div>

                <p>Servidores - Setor: GTI / Mês: Fevereiro </p>
            </form>

            <div className={styles["container__visualizar__content"]}>
               <CardBuscaServidores meses={meses} mes={mes}/>

               <CardVisualizarServidores />
            </div>

            <div className={styles["container__buttons--visualizar"]}>
                <button className={styles["container__buttons--visualizar-button"]}>
                    <Link to="/gerar">Voltar</Link>
                </button>
                <button className={styles["container__buttons--visualizar-button"]}>Mesclar Arquivos</button>
                <button className={styles["container__buttons--visualizar-button"]}>Visualizar Arquivos</button>
            </div>
        </section>
    );
}