import "./style.css"
import { useEffect, useState } from "react";
import { meses } from "../../../utils/meses";
import { CardFuncionarios } from "../../cards/card-funcionarios";
import { api } from "../../../api/axios";
import { toast } from "sonner";

export function MainServidores() {
    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]

    const [isLoading, setIsLoading] = useState(false)
    const [filtro, setFiltro] = useState("setor")
    const [servidores, setServidores] = useState([])
    const [todosSetores, setTodosSetores] = useState([]) 
    const [mensagemServidores, setMensagemServidores] = useState("")
    const [setoresFiltrados, setSetoresFiltrados] = useState([]) 
    const [checkedSetores, setCheckedSetores] = useState({})
    const [checkedServidores, setCheckedServidores] = useState({})
    const [mesEscolhido, setMesEscolhido] = useState(mes)
    const [filtroNomes, setFiltroNomes] = useState("")
    const [filtroSetor, setFiltroSetor] = useState("")

    async function pegaServidoresAPI() {
        const resposta = await api.get(`/servidores`, {
            params: {
                nome: filtroNomes
            }
        })
        const { servidores } = await resposta.data
        setServidores(servidores)
    }

    async function pegaSetoresAPI() {
        const resposta = await api.get('/buscar_setor')
        const { setores } = await resposta.data
        setTodosSetores(setores)
        setSetoresFiltrados(setores)
    }

    console.log(checkedServidores)
    async function converteServidoresParaPdfAPI() {
       try {
            const idServidores = Object.keys(checkedServidores)
            setIsLoading(true)
            const dados = await api.post(`/servidores/pdf`, {
                mes: mesEscolhido,
                funcionarios: idServidores 
            },
            {
                responseType: 'blob',
            }
        )
        .then(response =>{
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `servidores.pdf`
            a.click()
            window.URL.revokeObjectURL(url)
        })
           
        setCheckedServidores({})
       } catch(e) {
            console.error("Error => ", e)
            throw new Error("Erro aqui => ", e)
       } finally {
        setIsLoading(false)
       }
    }

    async function converteSetoresParaPdfAPI() {
        try {
            setIsLoading(true)
            const resposta = await api.post("/setores/pdf", {
                mes: mesEscolhido,
                setor: checkedSetores.setor
            })
            await resposta.data
            
        } catch(e) {
            console.error("Error => ", e)
        } finally {
            setIsLoading(false)
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
        } catch(e) {
            console.error("Error => ", e)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        pegaServidoresAPI()
    }, [filtroNomes])


    useEffect(() => {
        pegaSetoresAPI()
    }, [])

    const handleCheckboxChange = (id, type, valor) => {
        if (type === "setor") {
            setCheckedSetores(prevState => ({
                ...prevState,
                setor: id,
                [id]: !prevState[id]
                
            }));
        } else if (type === "servidor") {
            setCheckedServidores(prevState => ({
                ...prevState,
                [id]: !prevState[id]
            }));
        }
    };

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
            setor.setor.toLowerCase().includes(termo.toLowerCase())
        )
        setSetoresFiltrados(filtrados)
    }


    return (
        <main>
            <form action="#" className="form__filtro">
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
                            checked={filtro === "setor"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="fitro" className="form__filtro__label">Setores</label>
                    </div>

                    <div>
                        <input 
                            type="radio" 
                            value="servidor"
                            id="filtro" 
                            name="fitro" 
                            checked={filtro === "servidor"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="fitro" className="form__filtro__label">Servidores</label>
                    </div>

                    <div className="form__filtro__select__container">
                        <select name="meses" id="meses" className="form__filtro__select" defaultValue={mes} onChange={handleMesEscolhido}>
                            { meses.map((mes, index) => {
                                return <option key={index} value={mes} >{mes}</option>
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
                                    filtrarSetores(e.target.value)
                                }}
                            />
                        </div>
                    </form>
                </section>
            )}

            {
                filtro === 'servidor' && (
                    <section className="container__pesquisa__gerador">

                        <form action="#" className="filtros">
                            <div className="filtros__container">
                                <input
                                    type="search"
                                    name="servidor"
                                    id="servidor"
                                    placeholder="Pesquisa pelo servidor"
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
                filtro === 'servidor' && (
                    <section className="container__servidores">
                        {   

                            servidores.map(servidor => {
                                    return <CardFuncionarios
                                        key={servidor.id}
                                        nome={servidor.nome.toUpperCase()} 
                                        id={servidor.id}
                                        isChecked={!!checkedServidores[servidor.id]}
                                        onChecked={() => handleCheckboxChange(servidor.id, "servidor")}
                                        onArquivaServidor={() => arquivarServidorAPI(servidor.id)}
                                        mensagem={mensagemServidores}
                                    />
                                })


                        }
                    </section>
                )
            }

            {
                filtro === 'setor' && (
                    <section className="container__servidores">
                        {setoresFiltrados.map(setor => (
                            <CardFuncionarios 
                                key={setor.id} 
                                nome={setor.setor}
                                id={setor.setor} 
                                quantidadeServidores={setor.quantidade}
                                isChecked={!!checkedSetores[setor.setor]}
                                onChecked={() => handleCheckboxChange(setor.setor, "setor")}
                            />
                        ))}
                    </section>
            )}

            <section className="container__cadastrar__button">
            

                <div className="container__gerar__button">
                    <button disabled={isLoading} onClick={ () => {  filtro === 'servidor' ?  converteServidoresParaPdfAPI() :  converteSetoresParaPdfAPI() }} className="button__gerar__servidor">Gerar  { filtro === 'servidor' ? "servidores" : "setores" } selecionados </button>
                    <button>Gerar todos os { filtro === 'servidor' ? "servidores" : "setores" } </button>
                </div>
            </section>
        </main>
    )
}