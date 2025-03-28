import styles from "./style.module.css"
import { useEffect, useState } from "react";
import { BarraLateral } from "../../components/comuns/barra-lateral";

import { useNavigate } from 'react-router-dom';

export function Home() {
    const [menu, setMenu] =  useState(false);
    const navigate = useNavigate();

    const matriculaSalva = localStorage.getItem("matricula");
    const senhaSalva = localStorage.getItem("senha");

    //console.log(matriculaSalva);
    //console.log(senhaSalva);

    if(!matriculaSalva || !senhaSalva) {
        useEffect(() => {
            navigate("/");
        }, [])
    }

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