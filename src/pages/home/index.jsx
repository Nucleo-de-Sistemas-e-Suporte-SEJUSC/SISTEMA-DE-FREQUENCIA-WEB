import styles from "./style.module.css"
import { useEffect, useState } from "react";
import { BarraLateral } from "../../components/comuns/barra-lateral";

import { useNavigate } from 'react-router-dom';
import { useRole } from "../../context/useContext";

export function Home() {
    const [menu, setMenu] =  useState(false);
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario")).nome

    console.log("usuario => ", usuario)

    if(!usuario) {
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
                    <h1 className={styles["home__titulo"]}>Olá, { usuario } </h1>
                </header>
    
            </section>
        </section>
    )
}