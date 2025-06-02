import "./style.css"
import { useState } from "react";
import { CardFuncionarios } from "../../cards/card-funcionarios";
import { api } from "../../../api/axios";
import { useMainServidores } from "../../../hooks/useMainServidores";

export function MainServidores() {
	const {
		isLoading,
		month,
		arrayOfMonths,
		opcoesDeFiltro,
		setores,
		servidores,
		setIsLoading,
		handleCheckboxChange,
		handleSearchChange,
		handleSelectedMonth
	} = useMainServidores()

	const [mensagemServidores, setMensagemServidores] = useState("")
	const [checkedSetores, setCheckedSetores] = useState({})
	const [checkedServidores, setCheckedServidores] = useState({})

	async function converteServidoresParaPdfAPI() {
		setIsLoading(true);
		try {
			const idServidores = Object.keys(checkedServidores);
			const responseGeracao = await api.post("/servidores/pdf", {
				funcionarios: idServidores,
				mes: opcoesDeFiltro.month
			});

			if (responseGeracao.status === 200) {
				return true;
			} else {
				alert("erro ao gerar arquivo zip.");
				console.log(error);
				return false;
			}
		} catch (e) {
			alert("Erro ao gerar PDF: ");
			console.error("Error => ", e);
		} finally {
			setIsLoading(false);
		}
	}

	async function baixarServidoresZip() {
		setIsLoading(true);
		try {
			const response = await api.get(`/servidores/pdf/download-zip/${opcoesDeFiltro.month}`, { responseType: 'blob' });
			if (response.status === 200) {
				const blob = new Blob([response.data], { type: 'application/zip' });
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = `frequencia_mensal_${opcoesDeFiltro.month}.zip`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			} else {
				alert("erro ao baixar arquivo zip.");
			}
		} catch (e) {
			alert("Erro ao baixar ZIP: ");
		} finally {
			setIsLoading(false);
		}
	}

	async function handleGerarServidores() {
		const gerado = await converteServidoresParaPdfAPI();
		if (gerado) {
			await baixarServidoresZip();
		}
	}

	async function converteSetoresParaPdfAPI() {
		try {
			const setoresSelecionados = Object.keys(checkedSetores);
			if (!setoresSelecionados || setoresSelecionados.length === 0) {
				console.error("Nenhum setor selecionado.");
				return;
			}

			setIsLoading(true);

			const setoresSelecionadosFormatados =
				setoresSelecionados.map((setorSelecionado) => (setorSelecionado.toLowerCase()))

			// Chama a API para gerar os PDFs e o ZIP
			await api.post(`/setores/pdf`, {
				setores: setoresSelecionadosFormatados,
				mes: opcoesDeFiltro.month,
			});

			console.log(setoresSelecionadosFormatados)

			// Se for mais de um setor, chama a rota de multissetores
			if (setoresSelecionados.length > 1) {
				await downloadMultissetoresZip(opcoesDeFiltro.month);
			} else {
				await downloadSetorZip(setoresSelecionadosFormatados[0], opcoesDeFiltro.month);
			}

		} catch (e) {
			console.error("Erro ao converter setores para PDF:", e);
		} finally {
			setIsLoading(false);
		}
	}

	async function downloadSetorZip(setor, mesEscolhido) {
		console.log(`/setores/pdf/download-zip/${setor.replace(/\//g, '_')}/${mesEscolhido}`)
		try {
			setIsLoading(true);
			await api.get(`/setores/pdf/download-zip/${setor.replace(/\//g, '_')}/${mesEscolhido}`, { responseType: 'blob' })
				.then(response => {
					const blob = new Blob([response.data], { type: 'application/zip' });
					const url = window.URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `frequencia_mensal_${setor.replace(/\//g, '_')}_${mesEscolhido}.zip`;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					window.URL.revokeObjectURL(url);
				})
				.catch(error => {
					console.error('Erro ao baixar o arquivo ZIP:', error);
				});
		} catch (e) {
			console.error("Erro ao baixar ZIP:", e);
		} finally {
			setIsLoading(false);
		}
	}

	async function downloadMultissetoresZip(mesEscolhido) {
		try {
			setIsLoading(true);
			await api.get(`/setores/pdf/download-zip-multissetores/${mesEscolhido}`, { responseType: 'blob' })
				.then(response => {
					const blob = new Blob([response.data], { type: 'application/zip' });
					const url = window.URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `frequencias_multissetores_${mesEscolhido}.zip`;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					window.URL.revokeObjectURL(url);
				})
				.catch(error => {
					console.error('Erro ao baixar o arquivo ZIP multissetores:', error);
				});
		} catch (e) {
			console.error("Erro ao baixar ZIP multissetores:", e);
		} finally {
			setIsLoading(false);
		}
	}

	async function arquivarServidorAPI(idServidor) {
		try {
			setIsLoading(true)
			const resposta = await api.patch(`/servidores/${idServidor}/arquivar`)
			const { mensagem, servidor_arquivado: servidorArquivado } = await resposta.data

			return {
				mensagem,
				servidorArquivado
			}
		} catch (e) {
			console.error("Error => ", e)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSelectedCheckboxChange = (id, type, valor) => {
		if (type === "setor") {
			setCheckedSetores(prevState => {
				const novoEstado = { ...prevState };

				// Toggle
				const novoValor = !prevState[valor];

				if (novoValor) {
					novoEstado[valor] = true;
					novoEstado[id] = true;
				} else {
					delete novoEstado[valor];
					delete novoEstado[id];
				}

				return novoEstado;
			});

			setCheckedServidores({});
		} else if (type === "servidor") {
			setCheckedServidores(prevState => {
				const novoEstado = { ...prevState };
				const novoValor = !prevState[id];

				if (novoValor) {
					novoEstado[id] = true;
				} else {
					delete novoEstado[id];
				}

				return novoEstado;
			});

			setCheckedSetores({});
		}
	};

	return (
		<main className="main__servidores">

			<form className="form__filtro">
				<div>
					<label htmlFor="selecione" className="form__filtro__label">Selecione o mês: </label>
				</div>

				<div className="form__inputs__container">
					<div>
						<input
							type="radio"
							value="setor"
							name="fitro"
							id="filtro"
							checked={opcoesDeFiltro.checkboxFiltro === "setor"}
							onChange={({ target }) => handleCheckboxChange(target)}
						/>
						<label htmlFor="fitro" className="form__filtro__label">Setor</label>
					</div>

					<div>
						<input
							type="radio"
							value="servidor"
							id="filtro"
							name="fitro"
							checked={opcoesDeFiltro.checkboxFiltro === "servidor"}
							onChange={({ target }) => handleCheckboxChange(target)}
						/>
						<label htmlFor="fitro" className="form__filtro__label">Servidor</label>
					</div>

					<div className="form__filtro__select__container">
						<select name="meses" id="meses" className="form__filtro__select" value={opcoesDeFiltro.month} onChange={({ target }) => handleSelectedMonth(target)}>
							{arrayOfMonths.map((mes, index) => {
								return <option key={index} value={mes}>{mes}</option>
							})}
						</select>
					</div>
				</div>
			</form>

			{opcoesDeFiltro.checkboxFiltro === "setor" && (
				<div className="container__pesquisa__gerador">
					<form className="filtros">
						<div className="filtros__container">
							<input
								type="text"
								name="setor"
								id="setor"
								placeholder="Pesquisa pelo setor"
								className="filtros__input"
								value={opcoesDeFiltro.searchFiltro}
								onChange={({ target }) => handleSearchChange(target)}
							/>
						</div>
					</form>
				</div>
			)}

			{opcoesDeFiltro.checkboxFiltro === 'setor' && (
				<div className="container__servidores">
					{setores.setoresFiltrados.map(setor => (
						<CardFuncionarios
							key={setor.id}
							nome={setor.setor}
							id={setor.setor}
							quantidadeServidores={setor.quantidade}
							isChecked={!!checkedSetores[setor.setor]}
							onChecked={() => handleSelectedCheckboxChange(setor.setor, "setor", setor.setor)}
						/>
					))}
				</div>
			)}

			{opcoesDeFiltro.checkboxFiltro === 'servidor' && (
				<div className="container__pesquisa__gerador">

					<form className="filtros">
						<div className="filtros__container">
							<input
								type="search"
								name="servidor"
								id="servidor"
								placeholder="Pesquisa pelo servidor"
								className="filtros__input"
								value={opcoesDeFiltro.searchFiltro}
								onChange={({ target }) => handleSearchChange(target)}
							/>
						</div>
					</form>
				</div>
			)}

			{opcoesDeFiltro.checkboxFiltro === 'servidor' && (
				<div className="container__servidores">
					{servidores.servidoresFiltrados.map(servidor => {
						return <CardFuncionarios
							key={servidor.id}
							nome={servidor.nome.toUpperCase()}
							id={servidor.id}
							checkboxFiltro={opcoesDeFiltro.checkboxFiltro}
							isChecked={!!checkedServidores[servidor.id]}
							onChecked={() => handleSelectedCheckboxChange(servidor.id, "servidor", servidor.nome)}
							onArquivaServidor={() => arquivarServidorAPI(servidor.id)}
							mensagem={mensagemServidores}
						/>
					})}
				</div>
			)}

			<div className="container__cadastrar__button">
				<div className="container__gerar__button">
					<button disabled={isLoading} onClick={() => { opcoesDeFiltro.checkboxFiltro === 'servidor' ? handleGerarServidores() : converteSetoresParaPdfAPI() }} className="button__gerar__servidor">Gerar selecionados</button>
				</div>
			</div>
		</main>
	)
}