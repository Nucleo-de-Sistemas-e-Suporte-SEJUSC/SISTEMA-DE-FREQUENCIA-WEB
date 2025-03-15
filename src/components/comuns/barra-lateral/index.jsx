import "./style.css"
import { NavLink } from "react-router-dom"
import GeradorFrequencia from "../../../assets/icones-menu/tabela-de-edicao.svg"
import ControleDePonto from "../../../assets/icones-menu/marca-correta.svg"
import Arquivados from "../../../assets/icones-menu/pasta.svg"
import Histórico from "../../../assets/icones-menu/historia.svg"
import Frequência from "../../../assets/icones-menu/folha.svg"
import Férias from "../../../assets/icones-menu/ferias-de-verao.svg"
import Admin from "../../../assets/icones-menu/admin.svg"
import MenuHamburguer from "../../../assets/icones-menu/menu-ham.svg"
import HistoricoAlteracao from "../../../assets/icones-menu/historico.svg"

export function BarraLateral(props) {
    const { menuOpen, handleMenu } =  props

    return (
        <aside className="barra-lateral">

            <div>
                <img 
                    className="icone-hamburguer"
                    src={MenuHamburguer} 
                    alt="" 
                    onClick={() => handleMenu(!menuOpen)} 
                />

                <div>
                    <NavLink to="/servidores" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div >
                            <img src={GeradorFrequencia} alt="" className="container__buttons__menu-img"/>
                            {
                                menuOpen && ( <p>Gerador de Frequência</p> )
                            }
                        </div>
                    </NavLink>
                    <NavLink to="/naoencontrado" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={ControleDePonto} alt="" className="container__buttons__menu-img"/>
                            {
                                menuOpen && ( <p>Controle de Ponto</p> )
                            }
                        </div>
                    </NavLink>
                    <NavLink to="/arquivados" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={Arquivados} alt="" className="container__buttons__menu-img"/>
                            {
                                menuOpen && ( <p>Arquivados</p>)
                            }
                        
                        </div>
                    </NavLink>
                    <NavLink to="/naoencontrado" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={Histórico} alt="" className="container__buttons__menu-img"/>
                            {
                                menuOpen && (  <p>Histórico</p>)
                            }
                        
                        </div>
                    </NavLink>
                    <NavLink to="/frequencia/mensal" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={Frequência} alt="" className="container__buttons__menu-img"/>
                            {
                                menuOpen && ( <p>Frequência</p> )
                            }
                        
                        </div>
                    </NavLink>
                    <NavLink to="/naoencontrado" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={Férias} alt="" className="container__buttons__menu-img"/>
                            {
                                menuOpen && ( <p>Férias</p>)
                            }
                        
                        </div>
                    </NavLink>
                    <NavLink to="/historico-alteracao" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={HistoricoAlteracao} alt="" className="container__buttons__menu-img"/>
                            {
                                menuOpen && ( <p>Histórico de Alteração</p>)
                            }
                        
                        </div>
                    </NavLink>
                </div>
               
            </div>

            <div className="container__buttons__menu--hamburger container__buttons__menu__admin">
                <img src={Admin} alt="" className="container__buttons__menu-img"/>
                {
                    menuOpen && ( <p>Administrador</p>)
                }
                    
            </div>
        </aside>
    )
}