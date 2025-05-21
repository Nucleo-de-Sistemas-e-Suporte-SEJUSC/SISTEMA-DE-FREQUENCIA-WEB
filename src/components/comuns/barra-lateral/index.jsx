import styles from "./style.module.css"
import { NavLink, useNavigate } from "react-router-dom"
import Porta from "../../../assets/icones-menu/porta.svg"
import FrequenciaGerador from "../../../assets/icones-menu/frequencia-gerador.svg"
import FrequenciaLog from "../../../assets/icones-menu/frequencia-log.svg"
import Perfil from "../../../assets/icones-menu/perfil.svg"
import Servidores from "../../../assets/icones-menu/servidores.svg"
import { useEffect, useState } from "react";

export function BarraLateral(props) {
	const { menuOpen, handleMenu } = props
	const navigate = useNavigate()

	// Adicione este estado para armazenar o nome do usuário
	const [dadosDoUsuario, setDadosDoUsuario] = useState("");

	useEffect(() => {
		const usuario = JSON.parse(localStorage.getItem("usuario"));
		if (usuario && usuario.nome) {
			setDadosDoUsuario(usuario);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("usuario")
		navigate("/")
	}

	return (
		<aside className={menuOpen ? styles["barra-lateral"] : styles["barra-lateral-fechada"]}>

			<div>
				<div className={styles["container__administrador__links"]}>
					<div className={styles["container__administrador__links__admin"]}>
						<div>
							<div className={`${styles["container__buttons__menu__admin"]}`}>
								<img onClick={() => handleMenu(!menuOpen)} src={Perfil} alt="" className={styles["container__buttons__menu-img"]} />

							</div>
						</div>
					</div>

					<div>
						{
							menuOpen && (<p>{dadosDoUsuario.cargo || "Usuário"}</p>)
						}
					</div>

					<div className={styles["container__buttons__menu--hamburger--nao-ativo"]}>
						{
							menuOpen && (
								<img src={Porta} alt="" className={styles["container__buttons__menu-img"]} onClick={handleLogout} />
							)
						}
					</div>
				</div>

				<div>
					<NavLink to="/servidores" className={({ isActive }) =>
						isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
					}>
						<div >
							<img src={FrequenciaGerador} alt="" className={styles["container__buttons__menu-img"]} />
							{
								menuOpen && (<p>Gerador de Frequência</p>)
							}
						</div>
					</NavLink>

					<NavLink to="/arquivados-ativos" className={({ isActive }) =>
						isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
					}>
						<div>
							<img src={Servidores} alt="" className={styles["container__buttons__menu-img"]} />
							{
								menuOpen && (<p>Funcionários</p>)
							}

						</div>
					</NavLink>

					{/* <NavLink to="/frequencia/mensal" className={({isActive}) =>
                        isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
                    }>
                        <div>
                            <img src={Frequencia} alt="" className={styles["container__buttons__menu-img"]}/>
                            {
                                menuOpen && ( <p>Frequência</p> )
                            }
                        
                        </div>
                    </NavLink> */}

					<NavLink to="/historico-alteracao" className={({ isActive }) =>
						isActive ? styles["container__buttons__menu--hamburger"] : styles["container__buttons__menu--hamburger--nao-ativo"]
					}>
						<div>
							<img src={FrequenciaLog} alt="" className={styles["container__buttons__menu-img"]} />
							{
								menuOpen && (<p>Alterações</p>)
							}

						</div>
					</NavLink>


				</div>

			</div>




		</aside>
	)
}