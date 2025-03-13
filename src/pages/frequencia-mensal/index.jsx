import "./style.css"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { BarraLateral } from "../../components/comuns/barra-lateral"
import { Header } from "../../components/comuns/header"
import { MainFrequenciaMensal } from "../../components/main-frequencia-mensal"

export function FrequenciaMensal() {
    const [menu, setMenu] =  useState(false)

    return (
        <section className={
            menu ? "container__principal" : "container__principal__menu__fechado"
        }>
            <BarraLateral
                menuOpen={menu}
                handleMenu={setMenu}
            />

            <section>
                <Header
                    cabecalhoLogin={false} 
                    titulo="Frequência Mensal"
                />

                <div className={"navigation__list__buttons"}>
                        <div>
                            <NavLink
                                to="#"
                                className={({ isActive }) =>
                                    isActive ? "link active" : "link"
                                }
                            >
                                Servidores
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="#"
                                className={({ isActive }) =>
                                    isActive ? "link active" : "link"
                                }
                            >
                                Estagiários
                            </NavLink>
                        </div>
                </div>

                <MainFrequenciaMensal />
            </section>
        </section>
    )
}
