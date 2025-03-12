import "./style.css"
import GeradorFrequencia from "../../assets/icones-menu/tabela-de-edicao.svg"
import ControleDePonto from "../../assets/icones-menu/marca-correta.svg"
import Arquivados from "../../assets/icones-menu/pasta.svg"
import Histórico from "../../assets/icones-menu/historia.svg"
import Frequência from "../../assets/icones-menu/folha.svg"
import Férias from "../../assets/icones-menu/ferias-de-verao.svg"
import Admin from "../../assets/icones-menu/admin.svg"
import MenuHamburguer from "../../assets/icones-menu/menu-ham.svg"
import { NavLink } from "react-router-dom"

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
                    <NavLink to="/gerar" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div >
                            <img src={GeradorFrequencia} alt="" />
                            {
                                menuOpen && ( <p>Gerador de Frequência</p> )
                            }
                        </div>
                    </NavLink>
                    <NavLink to="/" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={ControleDePonto} alt="" />
                            {
                                menuOpen && ( <p>Controle de Ponto</p> )
                            }
                        </div>
                    </NavLink>
                    <NavLink to="/" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={Arquivados} alt="" />
                            {
                                menuOpen && ( <p>Arquivados</p>)
                            }
                        
                        </div>
                    </NavLink>
                    <NavLink to="/" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={Histórico} alt="" />
                            {
                                menuOpen && (  <p>Histórico</p>)
                            }
                        
                        </div>
                    </NavLink>
                    <NavLink to="/" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={Frequência} alt="" />
                            {
                                menuOpen && ( <p>Frequência</p> )
                            }
                        
                        </div>
                    </NavLink>
                    <NavLink to="/" className={({isActive}) =>
                        isActive ? "container__buttons__menu--hamburger" : "container__buttons__menu--hamburger--nao-ativo"
                    }>
                        <div>
                            <img src={Férias} alt="" />
                            {
                                menuOpen && ( <p>Férias</p>)
                            }
                        
                        </div>
                    </NavLink>
                </div>
               
            </div>

            <div className="container__buttons__menu--hamburger container__buttons__menu__admin">
                <img src={Admin} alt="" />
                {
                    menuOpen && ( <p>Administrador</p>)
                }
                    
            </div>
        </aside>
    )
}