import "./style.css"
import { useEffect, useState } from "react";
import { meses } from "../../../utils/meses";
import { CardFuncionarios } from "../../cards/card-funcionarios";
import { api } from "../../../api/axios";
import { pegaSetoresAPI } from "../../../api/setores/pega-setores";
import { pegaServidoresAPI } from "../../../api/servidores/pega-servidores";
import * as Dialog from '@radix-ui/react-dialog';
import { FormCadastrarFuncionarios } from "../../formularios/form-cadastrar-funcionarios";

export function MainServidores() {
    //<button>Gerar todos os { filtro === 'servidor' ? "servidores" : "setores" } </button>
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

    useEffect(() => {
        pegaServidoresAPI(filtroNomes,setServidores )
    }, [filtroNomes])

    useEffect(() => {
        pegaSetoresAPI(setTodosSetores, setSetoresFiltrados) 
    }, [])

    async function converteServidoresParaPdfAPI() {
        setIsLoading(true);
        try {
            const idServidores = Object.keys(checkedServidores); 
            console.log(idServidores)
            const responseGeracao = await api.post("/servidores/pdf",{
                funcionarios: idServidores,
                mes: mesEscolhido
            });
            
            if (responseGeracao.status === 200) {
                //console.log("to aquiiiiii 2")
                return true;
            }else{
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


    async function baixarServidoresZip(){
        setIsLoading(true);
        try{
            console.log("to aqui 1111|")
            const response = await api.get(`/servidores/pdf/download-zip/${mesEscolhido}`, { responseType: 'blob' });
           console.log("to aqui 2222")
         if(response.status === 200){
            console.log("to aqui 3333")   
            const blob = new Blob([response.data], {type: 'application/zip'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `frequencia_mensal_${mesEscolhido}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }else{
            alert("erro ao baixar arquivo zip.");
        }
    } catch (e) {
        alert("Erro ao baixar ZIP: ");
    } finally {
        setIsLoading(false);
    }
}

    async function handleGerarServidores(){
        const gerado = await converteServidoresParaPdfAPI();
        if(gerado){
            await baixarServidoresZip();
        }
    }
    async function converteSetoresParaPdfAPI() {
        try {
            // Obtém o setor selecionado (por exemplo, "GTI")
            const setorSelecionado = Object.keys(checkedSetores);
            if (!setorSelecionado) {
                console.error("Nenhum setor selecionado.");
                return;
            }            

            console.log(setorSelecionado[1], mesEscolhido)
    
            setIsLoading(true);
            // Faz a chamada para gerar os PDFs e criar o ZIP
            const responseGeracao = await api.post(`/setores/pdf`, {
                setor: setorSelecionado[1], 
                mes: mesEscolhido,
            });
    
            await downloadSetorZip(setorSelecionado[1], mesEscolhido);
        } catch (e) {
            console.error("Erro ao converter setores para PDF:", e);
        } finally {
            setIsLoading(false);
        }
    }

    async function downloadSetorZip(setor, mesEscolhido) {
        try {
            setIsLoading(true);
    
            // Faz uma chamada para baixar o arquivo ZIP
            await api.get(`/setores/pdf/download-zip/${setor}/${mesEscolhido}`, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/zip' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `frequencia_mensal_${setor}_${mesEscolhido}.zip`;
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
    
    const handleCheckboxChange = (id, type, valor) => {
        if (type === "setor") {
            setCheckedSetores(prevState => ({
                ...prevState,
                [valor]: !prevState[valor],
                [id]: !prevState[id]
                
            }));
            setCheckedServidores({});
        } else if (type === "servidor") {
            
            setCheckedServidores(prevState => ({
                ...prevState,
                //nome: valor,
                [id]: !prevState[id],
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
                         <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button className="button__cadastrar__servidor">
                                    Cadastrar Servidor
                                </button>
                            </Dialog.Trigger>

                            <FormCadastrarFuncionarios />
                        </Dialog.Root>


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
                                        onChecked={() => handleCheckboxChange(servidor.id, "servidor", servidor.nome)}
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
                    <button disabled={isLoading} onClick={ () => {  filtro === 'servidor' ?  handleGerarServidores() :  converteSetoresParaPdfAPI() }} className="button__gerar__servidor">Gerar selecionados </button>
                </div>
            </section>
        </main>
    )
}