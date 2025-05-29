import "./style.css"
import { useState } from "react";
import { MainVisualizarEstagiarios } from "../../components/visualizar/main-estagiario";
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { Header } from "../../components/comuns/header";
import { Navigation } from "../../components/comuns/navigation";
import { NavLink } from "react-router-dom";
import SetaVoltar from "../../assets/voltar.svg"

export function VisualizarEstagiario() {
    const [menu, setMenu] =  useState(false)

    return (
        <section className={
            menu ? "container__principal" : "container__principal__menu__fechado"
        }
        >
             <BarraLateral
                menuOpen={menu}
                handleMenu={setMenu}
            />

            <section className="container__conteudo-principal">
                <Header 
                    titulo="Visualização de Frequência"
                 />
                 <Navigation>
                <div className={"navigation__list__buttons"}>
                        <div>
                            <NavLink
                                to="/visualizar/servidores"
                                className="link"
                            >
                                Servidores
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/visualizar/estagiarios"
                                className="link active"
                            >
                                Estagiários
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <NavLink 
                            className="link__visualizar"
                            to="/estagiarios" 
                        >
                            <img src={SetaVoltar} alt="" className="seta"/>
                            Voltar
                        </NavLink>
                    </div>
                </Navigation>
                <MainVisualizarEstagiarios />
            </section>
        </section>
    )
}