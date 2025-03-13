import "./style.css"
import { Link } from "react-router-dom";
import { meses } from "../../utils/meses";
import { CardBuscaServidores } from "../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores";

export function MainFrequenciaMensal() {
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
                    <CardBuscaServidores 
                        meses={meses} 
                        mes={mes}
                    />

                    <CardVisualizarServidores />
                </div>
    
            </section>
        );
}