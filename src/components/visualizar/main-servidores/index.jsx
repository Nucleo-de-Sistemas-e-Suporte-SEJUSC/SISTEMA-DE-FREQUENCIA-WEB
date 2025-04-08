import { Link } from "react-router-dom";
import { meses } from "../../../utils/meses";
import { CardBuscaServidores } from "../../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../../cards/card-visualizar-servidores";
import styles from "./style.module.css";
import { api } from "../../../api/axios";
import { useEffect, useState } from "react";

export function MainVisualizarServidores() {
    const data = new Date();
    const mesAtual = data.getMonth();
    const mes = meses[mesAtual];
    const [servidores, setServidores] = useState([]);
    const [servidoresFiltrados, setServidoresFiltrados] = useState([]);
    const [mesSelecionado, setMesSelecionado] = useState(mes);

    console.log(mesSelecionado)

    async function listaServidoresPDF() {
        const dados = await api.get("/servidores/pdfs");
        const { servidores_pdf: servidoresPDF } = await dados.data;
        setServidores(servidoresPDF);
        filtrarServidoresPorMes(servidoresPDF, mesSelecionado);
    }

    function transformarDados(data, mesFiltro) {
        const resultado = [];
        for (const setorObj of data) {
            for (const [setor, conteudo] of Object.entries(setorObj)) {
                
                if (conteudo.servidor && conteudo.servidor[mesSelecionado]) {
                    for (const [nomeServidor, dadosServidor] of Object.entries(conteudo.servidor[mesFiltro])) {
                        resultado.push({
                            nome: nomeServidor,
                            setor: setor,
                            arquivos: dadosServidor.arquivos,
                            mes: mesSelecionado
                        });
                    }
                }
            }
        }
        
        return resultado;
    }

    function filtrarServidoresPorMes(data, mes) {
        const servidoresTransformados = transformarDados(data, mes);
        setServidoresFiltrados(servidoresTransformados);
        setMesSelecionado(mes);
    }

    useEffect(() => {
        listaServidoresPDF();
    }, [mesSelecionado]);

    return (
        <section className={styles["container__visualizar"]}>
            <form action="#" className={styles["form__visualizar"]}>
                <div className={styles["form__visualizar__container"]}>
                    <input
                        type="text"
                        name="pesquisa"
                        id="pesquisa"
                        placeholder="Pesquisa pelo servidor ou setor"
                        className={styles["form__visualizar__input"]}
                    />
                </div>

                <p>Servidores - Mês: {mesSelecionado}</p>
            </form>

            <div className={styles["container__visualizar__content"]}>
                <CardBuscaServidores 
                    meses={meses} 
                    mes={mes}
                    visualizar="visualizar"
                    funcionarios={servidoresFiltrados}
                    onMesChange={(novoMes) => filtrarServidoresPorMes(servidores, mesSelecionado)}
                />

                <CardVisualizarServidores>
                    {servidoresFiltrados.map((servidor, index) => (
                        <details key={index} className={styles["card__details"]}>
                            <summary className={styles["card__summary"]}>
                                {servidor.nome}
                            </summary>
                            <p>{servidor.setor}</p>
                            <div className={styles["card__content"]}>
                                {servidor.arquivos.map((arquivo, i) => (
                                    <div key={i}>
                                        <Link 
                                            to={`/visualizar/${encodeURIComponent(arquivo)}`} 
                                            className={styles["card__link"]}
                                        >
                                            {arquivo}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </details>
                    ))}
                </CardVisualizarServidores>
            </div>

            <div className={styles["container__buttons--visualizar"]}>
                <button className={styles["container__buttons--visualizar-button"]}>
                    Mesclar Arquivos
                </button>
                <button className={styles["container__buttons--visualizar-button"]}>
                    Visualizar Arquivos
                </button>
            </div>
        </section>
    );
}