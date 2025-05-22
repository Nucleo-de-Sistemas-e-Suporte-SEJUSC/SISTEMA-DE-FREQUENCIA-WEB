import styles from "./style.module.css"
import { useState } from "react";
import { MainEstagiario } from "../../components/gerarador-frequencia/main-estagiario";
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { Header } from "../../components/comuns/header";
import { Navigation } from "../../components/comuns/navigation";
import { NavLink } from "react-router-dom";
import SetaVisualizar from "../../assets/seta-visualizar.svg"

export function GerarEstagiarios() {
    const [menu, setMenu] =  useState(false)

    return (
        <div className={
            menu ? styles["container__principal"] : styles["container__principal__menu__fechado"]
        } >
            <BarraLateral 
                menuOpen={menu}
                handleMenu={setMenu}
            />

            <div className={styles["container__conteudo-principal"]}>
                <Header 
                    titulo="Gerador de Frequência"
                 />
                <Navigation>
                <div className={"navigation__list__buttons"}>
                        <div>
                            <NavLink
                                to="/servidores"
                                className="link"
                            >
                                Servidores
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/estagiarios"
                                className="link active"
                            >
                                Estagiários
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <NavLink 
                            className="link__visualizar"
                            to="/visualizar/estagiarios" 
                        >
                            Visualizar
                            <img src={SetaVisualizar} alt="" className="seta"/>
                        </NavLink>
                    </div>
                </Navigation>
                <MainEstagiario />
            </div> 
        </div>
    )
}