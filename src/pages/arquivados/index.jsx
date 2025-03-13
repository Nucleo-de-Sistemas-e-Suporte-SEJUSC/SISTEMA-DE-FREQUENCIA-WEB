import "./style.css"
import { useState } from "react"
import { BarraLateral } from "../../components/comuns/barra-lateral"
import { Header } from "../../components/comuns/header"
import { MainFrequenciaMensal } from "../../components/main-frequencia-mensal"
import { MainArquivados } from "../../components/main-arquivados"

export function Arquivados() {
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
                    cabecalhoLogin={false} 
                    titulo="Arquivados"
                />

                <div className={"navigation__list__buttons"}>
                    <div>
                        <input 
                            type="radio" 
                            name="link-checado" 
                            id="servidores" 
                            value="Servidores"
                            checked={filtro === "Servidores"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="servidores">Servidores</label>
                        <input 
                            type="radio" 
                            name="link-checado" 
                            id="estagiarios" 
                            value="Estagiarios"
                            checked={filtro === "Estagiarios"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="estagiarios">Estagiarios</label>
                    </div>
                </div>

                <MainArquivados funcionarios={filtro} />
            </section>
        </section>
    )
}
