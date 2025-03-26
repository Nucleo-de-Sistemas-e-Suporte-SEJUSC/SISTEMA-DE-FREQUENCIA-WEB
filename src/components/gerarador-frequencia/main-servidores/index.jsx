import "./style.css"
import { useEffect, useState } from "react";
import { meses } from "../../../utils/meses";
import { testeServidores, testeSetor } from "../../../utils/teste";
import { CardFuncionarios } from "../../cards/card-funcionarios";
import { api } from "../../../api/axios";

export function MainServidores() {
    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]

    const [filtro, setFiltro] = useState("setor")
    const [servidores, setServidores] = useState([])
    const [checkedSetores, setCheckedSetores] = useState({});
    const [checkedServidores, setCheckedServidores] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [mesEscolhido, setMesEscolhido] = useState(mes)

    async function pegaServidoresAPI() {
        const resposta = await api.get("/servidores")
        const { servidores } = await resposta.data

        setServidores(servidores)
    }


    async function converteServidoresParaPdfAPI() {
       try {
            setIsLoading(true)
            const idServidores = Object.keys(checkedServidores)
            const resposta = await api.post(`/servidores/pdf`, {
                mes: mesEscolhido,
                funcionarios: idServidores 
            })
       } catch(e) {
            console.error("Error => ", e)
       } finally {
        setIsLoading(false)
       }
    }

    useEffect(() => {
        pegaServidoresAPI()
    }, [])

    const contagemSetores = Object.values(
        servidores.reduce((acc, { setor }) => {
          if (!acc[setor]) {
            acc[setor] = { setor, quantidade: 0 };
          }
          acc[setor].quantidade++;
          return acc;
        }, {})
      );

    const setoresOrdenados = contagemSetores.sort(((a,b) => a.setor.localeCompare(b.setor)))

    const handleCheckboxChange = (id, type) => {
        if (type === "setor") {
            setCheckedSetores(prevState => ({
                ...prevState,
                [id]: !prevState[id]
            }));
            setCheckedServidores({});
        } else if (type === "servidor") {
            setCheckedServidores(prevState => ({
                ...prevState,
                [id]: !prevState[id]
            }));
            setCheckedSetores({});
        }
    };

    function handleFiltro(event) {
        setFiltro(event.target.value)
    }

    function handleMesEscolhido(event) {
        setMesEscolhido(event.target.value)
    }

    function filtraSetores(setor) {
        const filtraSetor = testeServidores.filter(servidor => servidor.setor === setor)
        return filtraSetor.length
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
                                        />
                                    </div>
                        </form>
                    </section>
                )
            }

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
                                    nome={servidor.nome} 
                                    id={servidor.id}
                                    isChecked={!!checkedServidores[servidor.id]}
                                    onChecked={() => handleCheckboxChange(servidor.id, "servidor")}
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

                            setoresOrdenados.map(setor => {
                                const quantidadeDeServidoresNoSetor = filtraSetores(setor.nome)
                                return <CardFuncionarios 
                                    key={setor.id} 
                                    nome={setor.setor}
                                    id={setor.setor}
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
                    <button disabled={isLoading} onClick={() => converteServidoresParaPdfAPI()}>Gerar  { filtro === 'servidor' ? "servidores" : "setores" } selecionados </button>
                    <button>Gerar todos os { filtro === 'servidor' ? "servidores" : "setores" } </button>
                </div>
            </section>
        </main>
    )
}