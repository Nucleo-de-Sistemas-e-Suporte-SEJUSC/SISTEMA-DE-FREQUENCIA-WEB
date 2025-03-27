import styles from "./style.module.css"
import { useState } from "react";
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { Header } from "../../components/comuns/header";
import { MainControleDePonto } from "../../components/main-controle-de-ponto";

export function ControleDePonto() {
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
                    titulo="Controle de Ponto"
                />
                
                <MainControleDePonto />
            </section>
        </section>
    )
}