import "./style.css"
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { meses } from "../../../utils/meses";
import { CardFuncionarios } from "../../cards/card-funcionarios";
import { api } from "../../../api/axios";

export function MainEstagiario() {
    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]


    const [filtro, setFiltro] = useState("setor")
    const [estagiarios, setEstagiarios] = useState([])
    const [setores, setSetores] = useState([])
    const [checkedSetores, setCheckedSetores] = useState({});
    const [checkedEstagiarios, setCheckedEstagiarios] = useState({});
    const [filtroNomes, setFiltroNomes] = useState("")
    const [filtroSetor, setFiltroSetor] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [mesEscolhido, setMesEscolhido] = useState(mes)

    async function pegaEstagiariosAPI() {
        const dados = await api.get("/estagiarios")
        const { estagiarios } = await dados.data

        setEstagiarios(estagiarios)
    }

    async function pegaSetoresAPI() {
        const dados = await api.get("/setor/estagiarios")
        const { setores } = await dados.data

        setSetores(setores)
    }

    const handleCheckboxChange = (id, type) => {
        if (type === "setor") {
            setCheckedSetores(prevState => ({
                ...prevState,
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

    useEffect(() => {
        pegaEstagiariosAPI()
    }, [])

    useEffect(() => {
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
            setSetoresFiltrados(todosSetores) 
            return
        }
        
        const filtrados = todosSetores.filter(setor => 
            setor.lotacao.toLowerCase().includes(termo.toLowerCase())
        )
        setSetoresFiltrados(filtrados)
    }

      async function converteEstagiariosParaPdfAPI() {
            try {
                const idServidores = Object.keys(checkedEstagiarios);
                setIsLoading(true);
           
                // Faz a chamada para gerar os PDFs e criar o ZIP
                await api.post(`/estagiario/pdf`, {
                    mes: mesEscolhido,
                    estagiarios: idServidores
                });

        
            } catch (e) {
                console.error("Error => ", e);
            } finally {
                setIsLoading(false);
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

            {
                filtro === "setor" && (
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
                                                filtrarSetores(e.target.value)
                                            }}
                                        />
                                    </div>
                        </form>
                    </section>
                )
            }

            {
                filtro === 'estagiario' && (
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
                                    onChange={e => setFiltroNomes(e.target.value)}
                                />
                            </div>
                        </form>
                    </section>
                )
            }

            {
                filtro === 'estagiario' && (
                    <section className="container__servidores">
                        {
                            estagiarios.map(estagiario => {
                                return <CardFuncionarios
                                    nome={estagiario.nome} 
                                    id={estagiario.id}
                                    key={estagiario.id}
                                    isChecked={!!checkedEstagiarios[estagiario.id]}
                                    onChecked={() => handleCheckboxChange(estagiario.id, "estagiario")}
                                />
                            })
                        }
                    </section>
                )
            }

            {
                filtro === 'setor' && (
                    <section className="container__servidores">
                        {

                            setores.map(setor => {
                                return <CardFuncionarios 
                                    key={setor.id} 
                                    nome={setor.lotacao}
                                    id={setor.id}
                                    quantidadeServidores={setor.quantidade}
                                    isChecked={!!checkedSetores[setor.id]}
                                    onChecked={() => handleCheckboxChange(setor.id, "setor")}
                                />
                            })
                        }
                    </section>
                )
            }

            <section className="container__cadastrar__button">

                <div className="container__gerar__button">
                    <button disabled={isLoading} onClick={ () => {  filtro === 'estagiario' &&  converteEstagiariosParaPdfAPI()}} className="button__gerar__servidor">Gerar  { filtro === 'estagiario' ? "estagiários" : "setores" } </button>
                    <button>Gerar todos os { filtro === 'estagiario' ? "estagiários" : "setores" } </button>
                </div>
            </section>
        </main>
    )
}