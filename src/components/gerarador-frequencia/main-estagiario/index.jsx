import "./style.css"
import { useEffect, useState } from "react";
import { meses } from "../../../utils/meses";
import { CardFuncionarios } from "../../cards/card-funcionarios";
import { api } from "../../../api/axios";

export function MainEstagiario() {
    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]

    const [filtro, setFiltro] = useState("setor")
    const [estagiarios, setEstagiarios] = useState([])
    const [estagiariosFiltrados, setEstagiariosFiltrados] = useState([])
    const [setores, setSetores] = useState([])
    const [setoresFiltrados, setSetoresFiltrados] = useState([])
    const [checkedSetores, setCheckedSetores] = useState({});
    const [checkedEstagiarios, setCheckedEstagiarios] = useState({});
    const [filtroNomes, setFiltroNomes] = useState("")
    const [filtroSetor, setFiltroSetor] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [mesEscolhido, setMesEscolhido] = useState(mes)

    // Busca estagiários da API
    async function pegaEstagiariosAPI() {
        const dados = await api.get("/estagiarios")
        const { estagiarios } = await dados.data
        setEstagiarios(estagiarios)
        setEstagiariosFiltrados(estagiarios) // Inicializa com todos os estagiários
    }

    // Busca setores da API
    async function pegaSetoresAPI() {
        const dados = await api.get("/setor/estagiarios")
        const { setores } = await dados.data
        setSetores(setores)
        setSetoresFiltrados(setores) // Inicializa com todos os setores
    }

    // Filtra estagiários por nome
    function filtrarEstagiarios(nome) {
        if (!nome) {
            setEstagiariosFiltrados(estagiarios)
            return
        }
        
        const filtrados = estagiarios.filter(estagiario =>
            estagiario.nome.toLowerCase().includes(nome.toLowerCase())
        )
        setEstagiariosFiltrados(filtrados)
    }

    // Filtra setores por nome
    function filtrarSetores(nomeSetor) {
        if (!nomeSetor) {
            setSetoresFiltrados(setores)
            return
        }
        
        const filtrados = setores.filter(setor =>
            setor.lotacao.toLowerCase().includes(nomeSetor.toLowerCase())
        )
        setSetoresFiltrados(filtrados)
    }

    // Manipula seleção de checkboxes
    const handleCheckboxChange = (id, type, valor) => {
        if (type === "setor") {
            setCheckedSetores(prevState => ({
                ...prevState,
                setor: valor,
                [id]: !prevState[id]
            }));
            setCheckedEstagiarios({});
        } else if (type === "estagiario") {
            setCheckedEstagiarios(prevState => ({
                ...prevState,
                [id]: !prevState[id]
            }));
            setCheckedSetores({});
        }
    };

    // Atualiza lista de estagiários filtrados quando o filtro ou lista original muda
    useEffect(() => {
        filtrarEstagiarios(filtroNomes)
    }, [filtroNomes, estagiarios])

    // Atualiza lista de setores filtrados quando o filtro ou lista original muda
    useEffect(() => {
        filtrarSetores(filtroSetor)
    }, [filtroSetor, setores])

    // Carrega dados iniciais
    useEffect(() => {
        pegaEstagiariosAPI()
        pegaSetoresAPI()
    }, [])

    function handleFiltro(event) {
        setFiltro(event.target.value)
    }

    function handleMesEscolhido(event) {
        setMesEscolhido(event.target.value)
    }

    function filtrarSetores(termo) {
        if (!termo) {
            setSetoresFiltrados(setores) 
            return
        }
        
        const filtrados = setores.filter(setor => 
            setor.lotacao.toLowerCase().includes(termo.toLowerCase())
        )
        setSetoresFiltrados(filtrados)
    }

   

    async function converteSetoresParaPdfAPI() {
            try {
                // Obtém o setor selecionado (por exemplo, "GTI")
                const setorSelecionado = Object.keys(checkedSetores);
                if (!setorSelecionado) {
                    console.error("Nenhum setor selecionado.");
                    return;
                }
        
                setIsLoading(true);
                // Faz a chamada para gerar os PDFs e criar o ZIP
                const responseGeracao = await api.post(`/setor/estagiar/pdf`, {
                    setor: checkedSetores.setor, 
                    mes: mesEscolhido,
                });

            } catch (e) {
                console.error("Erro ao converter setores para PDF:", e);
            } finally {
                setIsLoading(false);
            }
        }

        async function gerarZipSetoresAPI() {
            setIsLoading(true);
            try {
                // Pegando os setores selecionados (ajuste conforme sua lógica)
                const setoresSelecionados = Object.keys(checkedSetores);
                if (!setoresSelecionados || setoresSelecionados.length === 0) {
                    alert("Nenhum setor selecionado.");
                    return false;
                }
        
                const responseGeracao = await api.post("/setor/estagiar/pdf", {
                    setor: setoresSelecionados, // ou ajuste conforme esperado pelo backend
                    mes: mesEscolhido,
                });
        
                if (responseGeracao.status === 200) {
                    return true;
                } else {
                    alert("Erro ao gerar o arquivo ZIP.");
                    return false;
                }
            } catch (e) {
                alert("Erro inesperado ao gerar o ZIP.");
                console.error("Error => ", e);
                return false;
            } finally {
                setIsLoading(false);
            }
        }

        async function baixarZipSetoresAPI() {
            setIsLoading(true);
            try {
                const response = await api.get(`/setor/estagiar/pdf/download-zip/${mesEscolhido}`, {
                    responseType: "blob"
                });
                if (response.status === 200) {
                    const blob = new Blob([response.data], { type: "application/zip" });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `frequencia_setores_${mesEscolhido}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                } else {
                    alert("Erro ao baixar o arquivo ZIP.");
                }
            } catch (e) {
                alert("Erro inesperado ao baixar o ZIP.");
                console.error("Error => ", e);
            } finally {
                setIsLoading(false);
            }
        }

        async function handleGerarSetores() {
            const gerado = await gerarZipSetoresAPI();
            if (gerado) {
                await baixarZipSetoresAPI();
            }
        }
        
        async function gerarZipEstagiariosAPI() {
            setIsLoading(true);
            try {
                const idServidores = Object.keys(checkedEstagiarios);
                const responseGeracao = await api.post("/estagiario/pdf", {
                    mes: mesEscolhido,
                    estagiarios: idServidores
                });
                if (responseGeracao.status === 200) {
                    // Não depende mais de zip_path
                    console.log("to aquiiiiii 2")
                    return true;
                } else {
                    alert("Erro ao gerar o arquivo ZIP.");
                    console.error(error);
                    return false;
                }
            } catch (e) {
                alert("Erro inesperado ao gerar o ZIP.");
                console.error("Error => ", e);
                return false;
            } finally {
                setIsLoading(false);
            }
        }
    
        async function baixarZipEstagiariosAPI() {
            setIsLoading(true);

            try {
                const response = await api.get(`/estagiarios/pdf/download-zip/${mesEscolhido}`, {
                    responseType: "blob"
                });
                if (response.status === 200) {
                    const blob = new Blob([response.data], { type: "application/zip" });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `frequencia_mensal_${mesEscolhido}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                } else {
                    alert("Erro ao baixar o arquivo ZIP.");
                }
            } catch (e) {
                alert("Erro inesperado ao baixar o ZIP.");
                console.error("Error => ", e);
            } finally {
                setIsLoading(false);
            }
        }
    
        async function handleGerarEstagiarios() {
            const gerado = await gerarZipEstagiariosAPI();
            if (gerado) {
                await baixarZipEstagiariosAPI();
            }
        }

    return (
        <main>
            <form action="#" className="form__filtro">
                <label htmlFor="selecione">Selecione o mês: </label>

                <div className="form__inputs__container">
                    <div>
                        <input 
                            type="radio" 
                            value="setor"
                            name="fitro" 
                            id="filtro"
                            checked={filtro === "setor"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="fitro" className="form__filtro__label">Setor</label>
                    </div>

                    <div>
                        <input 
                            type="radio" 
                            value="estagiario"
                            id="filtro" 
                            name="fitro" 
                            checked={filtro === "estagiario"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="fitro" className="form__filtro__label">Estagiário</label>
                    </div>

                    <div className="form__filtro__select__container">
                        <select name="meses" id="meses" className="form__filtro__select" defaultValue={mes} onChange={handleMesEscolhido}>
                            { meses.map((mes, index) => {
                                return <option key={index} value={mes}>{mes}</option>
                            }) }
                        </select>
                    </div>
                </div>
            </form>

            {filtro === "setor" && (
                <section className="container__pesquisa__gerador">
                    <form action="#" className="filtros">
                        <div className="filtros__container">
                            <input
                                type="text"
                                name="setor"
                                id="setor"
                                placeholder="Pesquisa pelo setor"
                                className="filtros__input"
                                value={filtroSetor}
                                onChange={(e) => {
                                    setFiltroSetor(e.target.value)
                                    // A filtragem agora é feita no useEffect
                                }}
                            />
                        </div>
                    </form>
                </section>
            )}

            {filtro === 'estagiario' && (
                <section className="container__pesquisa__gerador">
                    <form action="#" className="filtros">
                        <div className="filtros__container">
                            <input
                                type="search"
                                name="estagiario"
                                id="estagiario"
                                placeholder="Pesquisa pelo estagiario"
                                className="filtros__input"
                                value={filtroNomes}
                                onChange={e => {
                                    setFiltroNomes(e.target.value)
                                    // A filtragem agora é feita no useEffect
                                }}
                            />
                        </div>
                    </form>
                </section>
            )}
            {filtro === 'estagiario' && (
                <section className="container__servidores">
                    {estagiariosFiltrados.map(estagiario => (
                        <CardFuncionarios
                            nome={estagiario.nome} 
                            id={estagiario.id}
                            key={estagiario.id}
                            isChecked={!!checkedEstagiarios[estagiario.id]}
                            onChecked={() => handleCheckboxChange(estagiario.id, "estagiario")}
                        />
                    ))}
                </section>
            )}

            {filtro === 'setor' && (
                <section className="container__servidores">
                    {setoresFiltrados.map(setor => (
                        <CardFuncionarios 
                            key={setor.id} 
                            nome={setor.lotacao}
                            id={setor.id}
                            quantidadeServidores={setor.quantidade}
                            isChecked={!!checkedSetores[setor.id]}
                            onChecked={() => handleCheckboxChange(setor.id, "setor", setor.lotacao)}
                        />
                    ))}
                </section>
            )}

            <section className="container__cadastrar__button">

                <div className="container__gerar__button">
                <button disabled={isLoading} onClick={ () => {  filtro === 'estagiario' ?  handleGerarEstagiarios() :  handleGerarSetores() }} className="button__gerar__servidor">Gerar  selecionados </button>
                    <button>Gerar todos os { filtro === 'estagiario' ? "estagiários" : "setores" } </button>
                </div>
            </section>
        </main>
    )
}