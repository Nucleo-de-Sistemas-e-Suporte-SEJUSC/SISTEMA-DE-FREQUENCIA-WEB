import styles from "./style.module.css"
import { useState } from "react"
import { BarraLateral } from "../../components/comuns/barra-lateral"
import { Header } from "../../components/comuns/header"
import { MainFrequenciaMensal } from "../../components/main-frequencia-mensal"

export function FrequenciaMensal() {
    const [menu, setMenu] =  useState(false)
    const [filtro, setFiltro] = useState("Servidores")

    function handleFiltro(event) {
        setFiltro(event.target.value)
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
                <Header
                    titulo="Frequência Mensal"
                />

                <div className={styles["navigation__list__buttons"]}>
                    <div className={styles["navigation__container--button"]}>
                        <div className={
                            filtro === "Servidores" ? styles["container__input--ativo"] : styles["container__input--nao-ativo"]
                        }>
                            <input
                                type="radio"
                                name="link-checado"
                                id="servidores"
                                value="Servidores"
                                checked={filtro === "Servidores"}
                                onChange={handleFiltro}
                                className={styles["ativo-input"]}
                            />
                            <label htmlFor="servidores">Servidores</label>
                        </div>

                        <div className={
                            filtro === "Estagiarios" ? styles["container__input--ativo"] : styles["container__input--nao-ativo"]
                        }>
                            <input
                                type="radio"
                                name="link-checado"
                                id="estagiarios"
                                value="Estagiarios"
                                checked={filtro === "Estagiarios"}
                                onChange={handleFiltro}
                                className={styles["ativo-input"]}
                            />
                            <label htmlFor="estagiarios">Estagiários</label>
                        </div>
                    </div>
                </div>

                <MainFrequenciaMensal funcionarios={filtro} />
            </section>
        </section>
    )
}
