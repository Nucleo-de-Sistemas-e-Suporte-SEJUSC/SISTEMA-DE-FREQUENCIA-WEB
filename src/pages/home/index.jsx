import styles from "./style.module.css"
import { useEffect, useState } from "react";
import { BarraLateral } from "../../components/comuns/barra-lateral";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/user-auth";

export function Home() {
    const [menu, setMenu] =  useState(false);
    const navigate = useNavigate();

    const nome = localStorage.getItem("nome");
    const role = localStorage.getItem("role");

    console.log("nome => ", nome)
    console.log("role => ", role)

    if(!nome || !role) {
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