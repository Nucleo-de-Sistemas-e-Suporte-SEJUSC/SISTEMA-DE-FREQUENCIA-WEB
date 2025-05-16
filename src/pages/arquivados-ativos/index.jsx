import styles from "./style.module.css"
import { useState } from "react";
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { NavLink } from "react-router-dom";
import { Header } from "../../components/comuns/header";

export function ArquivadosAtivos() {
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
                    titulo="Arquivos de Funcionários"
                />
                
                <main>
                    <NavLink to="/arquivados">
                        <button className={styles["botao__arquivados__ativo"]}>Arquivados</button>
                    </NavLink>

                </main>
            </section>
        </section>
    )
}