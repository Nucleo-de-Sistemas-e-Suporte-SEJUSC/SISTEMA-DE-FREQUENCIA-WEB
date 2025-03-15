import styles from "./style.module.css"
import { useState } from "react";
import { MainServidores } from "../../components/gerarador-frequencia/main-servidores"
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { Header } from "../../components/comuns/header";
import { Navigation } from "../../components/comuns/navigation";
import { NavLink } from "react-router-dom";

export function GerarServidores() {
    const [menu, setMenu] =  useState(false)

    return (
        <section className={
            menu ? styles["container__principal" ] : styles["container__principal__menu__fechado"]
        } >
            <BarraLateral 
                menuOpen={menu}
                handleMenu={setMenu}
            />

            <section>
                <Header 
                    titulo="Gerador de Frequência"
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
                            to="/visualizar/servidores" 
                        >
                            Visualizar
                        </NavLink>
                    </div>
                </Navigation>
                <MainServidores />
            </section> 
        </section>
    )
}