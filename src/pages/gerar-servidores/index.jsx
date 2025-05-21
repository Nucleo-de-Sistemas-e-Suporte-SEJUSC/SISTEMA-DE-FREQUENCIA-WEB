import styles from "./style.module.css"
import { useState } from "react";
import { MainServidores } from "../../components/gerarador-frequencia/main-servidores"
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { Header } from "../../components/comuns/header";
import { Navigation } from "../../components/comuns/navigation";
import { NavLink } from "react-router-dom";
import SetaVisualizar from "../../assets/seta-visualizar.svg"

export function GerarServidores() {
	const [menu, setMenu] = useState(false)

	return (
		<section className={
			menu ? styles["container__principal"] : styles["container__principal__menu__fechado"]
		} >
			<BarraLateral
				menuOpen={menu}
				handleMenu={setMenu}
			/>

			<section className={styles["container__conteudo-principal"]}>
				<Header
					titulo="Gerador de Frequência"
				/>
				<Navigation>
					<div className={"navigation__list__buttons"}>
						<div>
							<NavLink
								to="/servidores"
								className="link active"
							>
								Servidores
							</NavLink>
						</div>
						<div>
							<NavLink
								to="/estagiarios"
								className="link"
							>
								Estagiários
							</NavLink>
						</div>
					</div>
					<div>
						<NavLink
							className="link__visualizar"
							to="/visualizar/servidores"
						>
							Visualizar
							<img src={SetaVisualizar} alt="" className="seta" />
						</NavLink>
					</div>
				</Navigation>
				<MainServidores />
			</section>

		</section>
	)
}