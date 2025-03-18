import styles from "./style.module.css"
import { useState } from "react";
import { BarraLateral } from "../../components/comuns/barra-lateral";

export function Home() {
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
                <header>
                    <h1 className={styles["home__titulo"]}>Olá, Administrador</h1>
                </header>
    
            </section>
        </section>
    )
}