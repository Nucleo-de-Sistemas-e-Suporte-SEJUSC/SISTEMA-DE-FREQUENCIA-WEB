import { NavLink } from "react-router-dom";
import "./navigation.css";

export function Navigation({ estaNaPaginaVizualizar = false }) {

    return (
        <section className="container__navigation">
            <nav className="navigation">
                <div className="navigation__list">
                    <div className="navigation__list__buttons">
                        <div>
                            <NavLink
                                to="/gerar"
                                className={({ isActive }) =>
                                    isActive ? "link active" : "link"
                                }
                            >
                                Servidores
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "link active" : "link"
                                }
                            >
                                Estagiários
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <NavLink 
                            className="link__visualizar"
                            to={ estaNaPaginaVizualizar ? "/gerar" : "/visualizar" } 
                        >
                            { estaNaPaginaVizualizar ? "Voltar" : "Visualizar" }
                        </NavLink>
                    </div>
                </div>
            </nav>
        </section>
    );
}