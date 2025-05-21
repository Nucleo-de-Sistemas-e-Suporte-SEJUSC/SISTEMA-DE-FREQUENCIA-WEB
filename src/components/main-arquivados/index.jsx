import styles from "./style.module.css"
import { CardBuscaServidores } from "../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores";
import { api } from "../../api/axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

export function MainArquivados(props) {
    //<button className={`${styles["card__details__atualizar__button"]} ${styles["card__details__button"]}`}>Atualizar</button>
    //<button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]}`}>Histórico</button>
    const { funcionarios } = props
    const [funcionariosArquivados, setFuncionariosArquivados] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pesquisa, setPesquisa] = useState("");

    async function pegaFuncionariosArquivadosAPI() {
        try {
            setIsLoading(true)
            const dados = await api.get("/servidores/arquivados")
            const { servidores } = dados.data
            console.log(servidores)
            setFuncionariosArquivados(servidores)
          
        } catch(e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function ativaFuncionariosAPI(idServidor) {
        try {
            
            const usuario = JSON.parse(localStorage.getItem("usuario"))
            const dados = await api.patch(`/servidores/${idServidor}/atualizar-status`)
            const { mensagem,servidor_ativado: servidorAtivado } = await dados.data

            toast.success(mensagem, {
                duration: 4000,
                icon: false
            })
            
            await historicoLogsDesarArquivar(usuario.nome, servidorAtivado.nome, servidorAtivado.setor)
            window.location.reload()
            return mensagem
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }

    }

    async function historicoLogsDesarArquivar(nome, nomeServidor, setorServidor) {
        const dados = await api.post("/historico-logs", {
            nome: nome,
            acao: "Desarquivar",  
            mensagem: `O usuario de nome ${nome} desarquivou o servidor(a) ${nomeServidor} do setor ${setorServidor}`,
        })
    }

    // Filtra os funcionários conforme a pesquisa
    const funcionariosFiltrados = funcionariosArquivados.filter(func => {
        if (!pesquisa) return true;
        const texto = pesquisa.toLowerCase();
        // Busca por nome ou setor
        return (
            func.nome.toLowerCase().includes(texto) ||
            (func.setor && func.setor.toLowerCase().includes(texto))
        );
    });

    // Função para extrair setor ou funcionário do texto digitado
    function getInfoPesquisa() {
        if (!pesquisa) {
            return `${funcionarios} - Setor: `;
        }
        const setorMatch = pesquisa.match(/setor[:\- ]*([a-zA-ZÀ-ÿ\s]+)/i);
        if (setorMatch && setorMatch[1]) {
            return `${funcionarios} - Setor: ${setorMatch[1].trim()}`;
        }
        return `${pesquisa}`;
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
                        placeholder={`Pesquisa pelos ${funcionarios.toLowerCase()} ou setor`}
                        className={styles["form__visualizar__input"]}
                        value={pesquisa}
                        onChange={e => setPesquisa(e.target.value)}
                    />
                </div>

                <p>{getInfoPesquisa().toLowerCase()}</p>
            </form>

            <div className={styles["container__visualizar__content"]}>
                {funcionariosFiltrados.length === 0 ? (
                    <p style={{ color: "red", margin: "2rem" }}>
                        Nenhum funcionário ou setor encontrado.
                    </p>
                ) : (
                    <>
                        <CardBuscaServidores 
                            funcionarios={funcionariosFiltrados}
                            possuiSelecaoDoMes={false}
                        />
                        <CardVisualizarServidores>
                            {funcionariosFiltrados.map((funcionario, index) => (
                                <details className={styles["card__details"]} key={funcionario.id}>
                                    <summary className={styles["card__summary"]}>{funcionario.nome}</summary>
                                    <p>Arquivado</p>
                                    <div className={styles["card__details__container__button"]}>
                                        
                                        <button className={`${styles["card__details__arquivar__button"]} ${styles["card__details__button"]}`} onClick={() => ativaFuncionariosAPI(funcionario.id)}>Desarquivar</button>
                                    </div>
                                </details>
                            ))}
                        </CardVisualizarServidores>
                    </>
                )}
            </div>

        </section>
    );
}

