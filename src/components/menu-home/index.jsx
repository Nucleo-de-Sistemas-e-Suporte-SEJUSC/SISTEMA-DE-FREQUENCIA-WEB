import { Link } from "react-router-dom"
import "./style.css"

export function MenuHome() {
    return (
        <section className="container__menu__home">
            <h2 className="titulo__menu__home">Menu</h2>

            <div className="container__menu__buttons">
                <button>
                    <Link to="/gerar">Gerador de Frequência</Link>
                </button>
                <button>Histórico</button>
                <button>Sistema de Ponto</button>
                <button>Frequência</button>
                <button>Arquivados</button>
                <button>Férias</button>
            </div>
        </section>
    )
}