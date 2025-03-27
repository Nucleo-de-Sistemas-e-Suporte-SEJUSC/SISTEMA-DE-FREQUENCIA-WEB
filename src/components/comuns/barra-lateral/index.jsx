import styles from "./style.module.css"
import { NavLink } from "react-router-dom"
import Porta from "../../../assets/icones-menu/porta.svg"
import FrequenciaGerador from "../../../assets/icones-menu/frequencia-gerador.svg"
import FrequenciaLog from "../../../assets/icones-menu/frequencia-log.svg"
import Frequencia from "../../../assets/icones-menu/frequencia.svg"
import Perfil from "../../../assets/icones-menu/perfil.svg"
import Relogio from "../../../assets/icones-menu/relogio.svg"
import Servidores from "../../../assets/icones-menu/servidores.svg"
import Menu from "../../../assets/icones-menu/menu.svg"


export function BarraLateral(props) {
    const { menuOpen, handleMenu } =  props

    return (
        <aside className={menuOpen ? styles["barra-lateral"] : styles["barra-lateral-fechada"]}>

            <div>
                <div>
                    <img 
                            className={`${styles["icone-hamburguer"]} `} 
                            src={Menu} 
                            alt="" 
                            onClick={() => handleMenu(!menuOpen)} 
                        />
                </div>

                <div>
                    <NavLink to="/servidores" className={({isActive}) =>
                        isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
                    }>
                        <div >
                            <img src={FrequenciaGerador} alt="" className={styles["container__buttons__menu-img"]}/>
                            {
                                menuOpen && ( <p>Gerador de Frequência</p> )
                            }
                        </div>
                    </NavLink>
                    
                    <NavLink to="/arquivados-ativos" className={({isActive}) =>
                        isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
                    }>
                        <div>
                            <img src={Servidores} alt="" className={styles["container__buttons__menu-img"]}/>
                            {
                                menuOpen && ( <p>Funcionários</p>)
                            }
                        
                        </div>
                    </NavLink>
                   
                    <NavLink to="/frequencia/mensal" className={({isActive}) =>
                        isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
                    }>
                        <div>
                            <img src={Frequencia} alt="" className={styles["container__buttons__menu-img"]}/>
                            {
                                menuOpen && ( <p>Frequência</p> )
                            }
                        
                        </div>
                    </NavLink>
                   
                    <NavLink to="/historico-alteracao" className={({isActive}) =>
                        isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
                    }>
                        <div>
                            <img src={FrequenciaLog} alt="" className={styles["container__buttons__menu-img"]}/>
                            {
                                menuOpen && ( <p>Alterações</p>)
                            }
                        
                        </div>
                    </NavLink>

                    <NavLink to="/naoencontrado" className={({isActive}) =>
                        isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
                    }>
                        <div>
                            <img src={Relogio} alt="" className={styles["container__buttons__menu-img"]}/>
                            {
                                menuOpen && ( <p>Controle de Ponto</p> )
                            }
                        </div>
                    </NavLink>
                   
                </div>
                
            </div>

            <div className={styles["container__administrador__links"]}>
                <div className={styles["container__administrador__links__admin"]}>
                    <NavLink to="/" className={({isActive}) =>
                        isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
                    }>
                        <div className={`${styles["container__buttons__menu__admin"]}`}>
                            <img src={Perfil} alt="" className={styles["container__buttons__menu-img"]}/>
                            {
                                menuOpen && ( <p>Administrador</p>)
                            }
                        </div>
                    </NavLink>
                </div>

                {
                    menuOpen && ( 
                        <div>
                            <img src={Porta} alt="" className={styles["container__buttons__menu-img"]} />
                        </div>
                    )
                }
            </div>

            
        </aside>
    )
}