import styles from "./style.module.css"
import { useState } from "react"
import { BarraLateral } from "../../components/comuns/barra-lateral"
import { Header } from "../../components/comuns/header"
import { MainHistoricoAlteracao } from "../../components/main-historico-alteracao"

export function HistoricoAlteracao() {
    const [menu, setMenu] =  useState(false)
    
        return (
            <section className={
                menu ? styles["container__principal"] : styles["container__principal__menu__fechado"]
            } >
                <BarraLateral 
                    menuOpen={menu}
                    handleMenu={setMenu}
                />
    
                <section>
                    <Header 
                        titulo="Histórico de Alteração"
                     />
                     <MainHistoricoAlteracao />
                </section> 
            </section>
        )
}