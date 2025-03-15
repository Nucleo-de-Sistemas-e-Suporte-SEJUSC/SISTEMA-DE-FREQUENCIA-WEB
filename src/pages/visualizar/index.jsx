import "./style.css"
import { useState } from "react";
import { MainVisualizar } from "../../components/main-visualizar";
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { Header } from "../../components/comuns/header";
import { Navigation } from "../../components/comuns/navigation";

export function Visualizar() {
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
                    cabecalhoLogin={false}
                    titulo="Visualização de Frequência"
                 />
                <Navigation
                    estaNaPaginaVizualizar={true}  
                />
                <MainVisualizar />
            </section>
        </section>
    )
}