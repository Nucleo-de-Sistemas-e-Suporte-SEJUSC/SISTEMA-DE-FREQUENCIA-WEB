import { Link } from "react-router-dom";
import { BuscaServidores } from "../busca-servidores";
import { meses } from "../main/utils/meses";
import "./style.css";

export function MainVisualizar() {
    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]

    return (
        <section className="container__visualizar">

            <form action="#" className="form__visualizar">
                <div className="form__visualizar__container">
                    <input
                        type="text"
                        name="pesquisa"
                        id="pesquisa"
                        placeholder="Pesquisa pelo servidor ou setor"
                        className="form__visualizar__input"
                    />
                </div>

                <p>Servidores - Setor: GTI / Mês: Fevereiro </p>
            </form>

            <div className="container__visualizar__content">
               <BuscaServidores meses={meses} mes={mes}/>

                <div className="container__visualizar__info">
                    <div className="card__servidores--visualizar">
                        <div className="card__container__details">
                            <details className="card__details">
                                <summary className="card__summary">Lucas</summary>
                                <p>GTI</p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container__buttons--visualizar">
                <button className="container__buttons--visualizar-button">
                    <Link to="/gerar">Voltar</Link>
                </button>
                <button className="container__buttons--visualizar-button">Mesclar Arquivos</button>
                <button className="container__buttons--visualizar-button">Visualizar Arquivos</button>
            </div>
        </section>
    );
}