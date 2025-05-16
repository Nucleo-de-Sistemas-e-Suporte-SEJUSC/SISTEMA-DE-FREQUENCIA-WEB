import styles from "./style.module.css"
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores"
import { api} from "../../api/axios"
import { useEffect, useState } from "react"

export function MainHistoricoAlteracao() {
    const [historico, setHistorico] = useState([])
    const [historicoFiltrado, setHistoricoFiltrado] = useState([])
    const [acao, setAcao] = useState("Selecione")
    
    async function pegaHistoricoLogsAPI() {

        const dados = await api.get("/historico-logs")
        const { historico } = await dados.data
        
        const filtroDoHistorico = await filtrarHistorioPelaAcao(acao, historico)
        
        if(filtroDoHistorico === null) {
            setHistorico(historico)
            return
        } else {
            setHistorico(filtroDoHistorico)
        }

    
    }

    function formataData(data) {
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })

        return dataFormatada
    }

    async function filtrarHistorioPelaAcao(acao, historicoDeAlteracao) {
        if(acao === "Selecione") return null

        setHistorico(historicoDeAlteracao)
        const filtro = historicoDeAlteracao.filter(historico => historico.acao === acao)
        return filtro
    }

    useEffect(() => {
        pegaHistoricoLogsAPI()
    }, [acao])

    
    return (
        <section className={styles["container-historico-visualizacao"]}>
            <form action="#" className={styles["form-historico-alteracao"]}>
                <div className={styles["container__input--historico-alteracao"]}>
                    <label htmlFor="acao" className={styles["label__historico__alteracao"]}>Ação</label>
                    <select name="acao-opcao" id="acao-opcao" className={styles["input__historico__alteracao"]} defaultValue={acao} onChange={(e) => setAcao(e.target.value)}>
                        <option value="Selecione" selected>Selecione</option>
                        <option value="Arquivar">Arquivar</option>
                        <option value="Desarquivar">Desarquivar</option>
                        <option value="Gerar">Gerar Frequência</option>
                    </select>
                </div>

                <button className={styles["button__historico-alteracao"]}>Ir</button>
            </form>

            <CardVisualizarServidores>
                {
                    historico.map(historico => {
                        return (
                            <details className={styles["card__details"]}  key={historico.id}>
                                <summary className={styles["summary"]}>
                                        <p>
                                            {historico.mensagem}
                                        </p>
                                    </summary>

                                    <p>{formataData(historico.data_criacao)}</p>
                            </details>
                        )
                    })
                }
            </CardVisualizarServidores>
        </section>
    )
}