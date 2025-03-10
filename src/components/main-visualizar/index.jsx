import { Link } from "react-router-dom";
import { meses } from "../main/utils/meses";
import "./style.css";

export function MainVisualizar(props) {
    const { nome, setor } = props;

    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]

    return (
        <section className="container__visualizar">

            <form action="#" className="form__visualizar">
                <div className="form__visualizar__container">
                    <input
                        type="search"
                        name="pesquisa"
                        id="pesquisa"
                        placeholder="Pesquisa pelo servidor ou setor"
                        className="form__visualizar__input"
                    />
                </div>

                <p>Servidores - Setor: GTI / Mês: Fevereiro </p>
            </form>

            <div className="container__visualizar__content">
                <div className="container__visualizar__header">
                    <div className="card__container__details">
                        <details className="card__details">
                            <summary className="card__summary">{ nome }</summary>
                            <p>{ setor }</p>
                        </details>
                    </div>

                    <div className="form__filtro__select__container form__filtro__select__container--visualizar">
                        <label htmlFor="selecione">Selecione o mês:</label>
                        <select name="meses" id="meses" className="form__filtro__select form__siltro__select--visualizar" defaultValue={mes}>
                            { meses.map((mes, index) => {
                                return <option key={index} value={mes}>{mes}</option>
                            }) }
                        </select>
                    </div>

                    <div className="container__button__form--visualizar">
                        <button>Ir</button>
                    </div>
                    
                </div>

                <div className="container__visualizar__info">
                    <div className="card__servidores--visualizar">
                        <div className="card__container__details">
                            <details className="card__details">
                                <summary className="card__summary">{ nome }</summary>
                                <p>{ setor }</p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container__buttons--visualizar">
                <button className="container__buttons--visualizar-button">
                    <Link to="/">Voltar</Link>
                </button>
                <button className="container__buttons--visualizar-button">Mesclar Arquivos</button>
                <button className="container__buttons--visualizar-button">Visualizar Arquivos</button>
            </div>
        </section>
    );
}