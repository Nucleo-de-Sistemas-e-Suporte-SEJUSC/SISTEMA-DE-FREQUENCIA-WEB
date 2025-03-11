import "./style.css"
import GeradorFrequencia from "../../assets/icones-menu/tabela-de-edicao.svg"
import ControleDePonto from "../../assets/icones-menu/marca-correta.svg"
import Arquivados from "../../assets/icones-menu/pasta.svg"
import Histórico from "../../assets/icones-menu/historia.svg"
import Frequência from "../../assets/icones-menu/folha.svg"
import Férias from "../../assets/icones-menu/ferias-de-verao.svg"
import Admin from "../../assets/icones-menu/admin.svg"

export function BarraLateral(props) {
    const { menuOpen, handleMenu } =  props

    return (
        <aside className="barra-lateral">

            <div>
                <div 
                    className="icone-hamburguer"
                    onClick={() => handleMenu(!menuOpen)}
                >Menu</div>
                <div>
                    <div className="container__buttons__menu">
                        <img src={GeradorFrequencia} alt="" />
                        {
                            menuOpen && ( <p>Gerador de Frequência</p> )
                        }
                    </div>
                    <div className="container__buttons__menu">
                        <img src={ControleDePonto} alt="" />
                        {
                            menuOpen && ( <p>Controle de Ponto</p> )
                        }
                    </div>
                    <div className="container__buttons__menu">
                        <img src={Arquivados} alt="" />
                        {
                            menuOpen && ( <p>Arquivados</p>)
                        }
                        
                    </div>
                    <div className="container__buttons__menu">
                        <img src={Histórico} alt="" />
                        {
                            menuOpen && (  <p>Histórico</p>)
                        }
                       
                    </div>
                    <div className="container__buttons__menu">
                        <img src={Frequência} alt="" />
                        {
                            menuOpen && ( <p>Frequência</p> )
                        }
                    
                    </div>
                    <div className="container__buttons__menu">
                        <img src={Férias} alt="" />
                        {
                            menuOpen && ( <p>Férias</p>)
                        }
                       
                    </div>
                </div>
               
            </div>

            <div className="container__buttons__menu container__buttons__menu__admin">
                <img src={Admin} alt="" />
                {
                    menuOpen && ( <p>Administrador</p>)
                }
                    
            </div>
        </aside>
    )
}