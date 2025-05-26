import styles from "./style.module.css"
import { useState } from "react"
import { BarraLateral } from "../../components/comuns/barra-lateral"
import { Header } from "../../components/comuns/header"
import { MainArquivados } from "../../components/main-arquivados"

export function Arquivados() {
    const [menu, setMenu] = useState(false)
    const [filtro, setFiltro] = useState("servidores")

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

            <section className="container__conteudo-principal">
                <Header
                    titulo="Arquivados"
                />

                <div className={styles["navigation__list__buttons"]}>
                    <div className={styles["navigation__container--button"]}>
                        <div className={
                            filtro === "servidores" ? styles["container__input--ativo"] : styles["container__input--nao-ativo"]
                        }>

                            <label htmlFor="servidores">
                                <input
                                    type="radio"
                                    name="link-checado"
                                    id="servidores"
                                    value="servidores"
                                    checked={filtro === "servidores"}
                                    onChange={handleFiltro}
                                    className={styles["ativo-input"]}
                                />
                                Servidores
                            </label>
                        </div>

                        <div className={
                            filtro === "estagiarios" ? styles["container__input--ativo"] : styles["container__input--nao-ativo"]
                        }>

                            <label htmlFor="estagiarios">
                                <input
                                    type="radio"
                                    name="link-checado"
                                    id="estagiarios"
                                    value="estagiarios"
                                    checked={filtro === "estagiarios"}
                                    onChange={handleFiltro}
                                    className={styles["ativo-input"]}
                                />
                                Estagiários
                            </label>
                        </div>
                    </div>
                </div>

                <MainArquivados funcionarios={filtro} />
            </section>
        </section>
    )
}
