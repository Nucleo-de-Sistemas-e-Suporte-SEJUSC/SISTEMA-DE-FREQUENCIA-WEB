import styles from "./style.module.css"
import { CardBuscaServidores } from "../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores";
import { api } from "../../api/axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

export function MainArquivados(props) {
        const { funcionarios } = props
        const [funcionariosArquivados, setFuncionariosArquivados] = useState([])
        const [mensagem, setMensagem] = useState("")
        const [isLoading, setIsLoading] = useState(false)

        async function pegaFuncionariosArquivadosAPI() {
            try {
                setIsLoading(true)
                const dados = await api.get("/servidores/arquivados")
                const { servidores } = dados.data

                setFuncionariosArquivados(servidores)
              
            } catch(e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }
        }

        async function ativaFuncionariosAPI(idServidor) {
            try {
                const dados = await api.patch(`/servidores/${idServidor}/atualizar-status`)
                const { mensagem } = dados.data
                setMensagem(mensagem)
                window.location.reload()
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }

        }

        useEffect(() => {
            pegaFuncionariosArquivadosAPI()
        }, [])
    
        return (
            <section className={styles["container__visualizar"]}>
    
                <form action="#" className={styles["form__visualizar"]}>
                    <div className={styles["form__visualizar__container"]}>
                        <input
                            type="text"
                            name="pesquisa"
                            id="pesquisa"
                            placeholder={`Pesquisa pelos ${funcionarios} ou setor`}
                            className={styles["form__visualizar__input"]}
                        />
                    </div>
    
                    <p>{ funcionarios } - Setor: GTI / Mês: Fevereiro </p>
                </form>
    
                <div className={styles["container__visualizar__content"]}>
                    <CardBuscaServidores 
                        funcionarios={funcionariosArquivados}
                        possuiSelecaoDoMes={false}
                    />

                    <CardVisualizarServidores>
                        {
                            funcionariosArquivados.map((funcionario, index) => {
                                return (
                                    <details className={styles["card__details"]} key={funcionario.id}>
                                        <summary className={styles["card__summary"]}>{funcionario.nome}</summary>
                                        <p>Arquivado</p>
            
                                        <div className={styles["card__details__container__button"]}>
                                            <button className={`${styles["card__details__atualizar__button"]} ${styles["card__details__button"]} `}>Atualizar</button>
                                            <button className={`${styles["card__details__arquivar__button"]} ${styles["card__details__button"]}`} onClick={() => {
                                                ativaFuncionariosAPI(funcionario.id)
                                                toast.success(mensagem, {
                                                    duration: 4000,
                                                    icon: false
                                                })
                                            }} >Desarquivar</button>
                                            <button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]} `}>Histórico</button>
                                        </div>
                                    </details>            
                                )
                            })
                        }
                    </CardVisualizarServidores>
                </div>
    
            </section>
        );
}

