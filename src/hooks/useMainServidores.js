import { useEffect, useState } from "react";
import { api } from "../api/axios";

const arrayOfMonths = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro"
];

export function useMainServidores() {
	const data = new Date()
	const actualMonth = data.getMonth()
	const month = arrayOfMonths[actualMonth]

	const [isLoading, setIsLoading] = useState(false)
	const [servidores, setServidores] = useState({
		todosServidores: [],
		servidoresFiltrados: []
	})
	const [setores, setSetores] = useState({
		todosSetores: [],
		setoresFiltrados: []
	})
	const [filtroNomes, setFiltroNomes] = useState("")
	const [opcoesDeFiltro, setOpcoesDeFiltro] = useState({
		checkboxFiltro: 'setor',
		searchFiltro: '',
		month: month
	})

	useEffect(() => {
		const buscaListaDeSetoresApi = async () => {
			try {
				const response = await api.get('/buscar_setor');
				const setores = response.data.setores;
				setSetores(() => ({
					todosSetores: setores,
					setoresFiltrados: setores
				}));

			} catch (error) {
				console.error("Erro ao buscar setores:", error);
			}
		};

		buscaListaDeSetoresApi()
	}, [])

	useEffect(() => {
		const buscaListaDeServidoresApi = async () => {
			try {

				const resposta = await api.get(`/servidores`, {
					params: {
						nome: filtroNomes
					}
				})
				const servidores = resposta.data.servidores
				setServidores(() => ({
					todosServidores: servidores,
					servidoresFiltrados: servidores
				}))
			} catch (error) {
				console.log("Erro ao buscar servidores", error)
			}
		}

		buscaListaDeServidoresApi()
	}, [])

	const handleCheckboxChange = (target) => {
		setOpcoesDeFiltro((prev) => ({ ...prev, checkboxFiltro: target.value }))
	}

	const handleSearchChange = (target) => {
		setOpcoesDeFiltro((prev) => ({
			...prev, searchFiltro: target.value
		}))

		if (!target.value) {
			setSetores(prev => ({
				...prev,
				todosSetores: setores.todosSetores
			}));
			setServidores(prev => ({
				...prev,
				todosServidores: servidores.todosServidores
			}))
			return;
		}

		if (opcoesDeFiltro.checkboxFiltro === 'setor') {
			const setoresFiltrados = setores.todosSetores.filter(setor =>
				setor.setor.toLowerCase().includes(target.value.toLowerCase())
			);
			setSetores(prev => ({
				...prev,
				setoresFiltrados: setoresFiltrados
			}));
		}

		if (opcoesDeFiltro.checkboxFiltro === 'servidor') {
			const servidoresFiltrados = servidores.todosServidores.filter(servidor =>
				servidor.nome.toLowerCase().includes(target.value.toLowerCase())
			);

			setServidores(prev => ({
				...prev,
				servidoresFiltrados: servidoresFiltrados
			}))
		}
	}

	const handleSelectedMonth = (target) => {
		setOpcoesDeFiltro((prev) => ({ ...prev, month: target.value }))
	}

	return {
		isLoading,
		month,
		arrayOfMonths,
		opcoesDeFiltro,
		setores,
		filtroNomes,
		servidores,
		setIsLoading,
		setFiltroNomes,
		handleCheckboxChange,
		handleSearchChange,
		handleSelectedMonth
	}

}