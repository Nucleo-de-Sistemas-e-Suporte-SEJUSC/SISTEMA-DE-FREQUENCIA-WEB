import styles from "./style.module.css"
import { BarraLateral } from "../../components/barra-lateral";
import { Header} from "../../components/header";
import { Main } from "../../components/main";
import { Navigation } from "../../components/navigation";
import { useState } from "react";


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
                    cabecalhoLogin={false}
                    titulo="Gerador de Frequência"
                 />
                <Navigation />
                <Main />
            </section> 
        </section>
    )
}