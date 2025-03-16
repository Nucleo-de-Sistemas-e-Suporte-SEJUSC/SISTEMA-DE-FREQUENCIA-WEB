import "./style.css"
import { useState } from "react";
import { MainVisualizarServidores } from "../../components/visualizar/main-servidores";
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { Header } from "../../components/comuns/header";
import { Navigation } from "../../components/comuns/navigation";
import { NavLink } from "react-router-dom";
import SetaVoltar from "../../assets/voltar.svg"

export function VisualizarServidor() {
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

            <section>
                <Header 
                    titulo="Visualização de Frequência"
                 />
                 <Navigation>
                    <div className={"navigation__list__buttons"}>
                        <div>
                            <NavLink
                                to="/servidores"
                                className="link active"
                            >
                                Servidores
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/estagiarios"
                                className="link"
                            >
                                Estagiários
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <NavLink 
                            className="link__visualizar"
                            to="/servidores" 
                        >
                            <img src={SetaVoltar} alt="" className="seta"/>
                            Voltar
                        </NavLink>
                    </div>
                </Navigation>
                <MainVisualizarServidores />
            </section>
        </section>
    )
}