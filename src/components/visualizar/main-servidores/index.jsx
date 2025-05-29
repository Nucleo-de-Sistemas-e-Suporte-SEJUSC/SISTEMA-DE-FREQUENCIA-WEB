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
    const [servidores, setServidores] = useState([]);
    const [servidoresFiltrados, setServidoresFiltrados] = useState([]);
    const [mesSelecionado, setMesSelecionado] = useState(meses[mesAtual]);
    const [termoBusca, setTermoBusca] = useState("");

    async function listaServidoresPDF() {
        const dados = await api.get("/servidores/pdfs");
        const { servidores_pdf: servidoresPDF } = dados.data;
        setServidores(servidoresPDF);
        filtrarServidoresPorMes(servidoresPDF, mesSelecionado);
    }

    function transformarDados(data, mesFiltro) {
        const resultado = [];
        for (const setorObj of data) {

            for (const [setor, conteudo] of Object.entries(setorObj)) {
                // Usar mesFiltro em vez de mesSelecionado
                if (conteudo.servidor && conteudo.servidor[mesFiltro]) {
                    for (const [nomeServidor, dadosServidor] of Object.entries(conteudo.servidor[mesFiltro])) {
                        resultado.push({
                            nome: nomeServidor,
                            setor: setor,
                            arquivos: dadosServidor.arquivos,
                            mes: mesFiltro // Mesma correção aqui
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
        setMesSelecionado(mes); // Atualiza o estado com o novo mês
    }

    // Busca dados apenas uma vez (no mount)
    useEffect(() => {
        listaServidoresPDF();
    }, []);

    // Filtra servidores pelo termo de busca
    const servidoresFiltradosComBusca = servidoresFiltrados.filter(servidor => {
        const termo = termoBusca.toLowerCase();
        return (
            servidor.nome.toLowerCase().includes(termo) ||
            servidor.setor.toLowerCase().includes(termo)
        );
    });

    async function buscarPDF(setor, mes, nome) {
        try {
            const response = await api.get('/servidores/pdf/view', {
                params: { setor, mes, nome },
                responseType: 'blob',
            })

            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.target = '_blank'

            document.body.appendChild(link)
            link.click()
            link.remove()

            setTimeout(() => window.URL.revokeObjectURL(url), 10000)
        } catch (error) {
            alert('Erro ao buscar o PDF, Tente novamente.')
        }
    }

    return (
        <section className={styles["container__visualizar"]}>
            <form className={styles["form__visualizar"]}>
                <div className={styles["form__visualizar__container"]}>
                    <input
                        type="text"
                        placeholder="Pesquisa pelo servidor ou setor"
                        className={styles["form__visualizar__input"]}
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                    />
                </div>
                <p>Servidores / Mês: {mesSelecionado}</p>
            </form>

            <div className={styles["container__visualizar__content"]}>
                <CardBuscaServidores
                    meses={meses}
                    mes={mesSelecionado}
                    visualizar="visualizar"
                    funcionarios={servidoresFiltrados}
                    onMesChange={(novoMes) => filtrarServidoresPorMes(servidores, novoMes)}
                />

                <CardVisualizarServidores>
                    {servidoresFiltradosComBusca.map((servidor, index) => (

                        <details key={index} className={styles["card__details"]}>
                            <summary className={styles["card__summary"]}>
                                {servidor.nome}
                            </summary>
                            <p>{servidor.setor}</p>
                            <div className={styles["card__content"]}>
                                {servidor.arquivos.map((arquivo, i) => (
                                    <div key={i}>
                                        <button
                                            onClick={() => buscarPDF(servidor.setor, servidor.mes, servidor.nome, servidor.id)}
                                            className={styles["card__link"]}
                                        >
                                            {arquivo}
                                        </button>
                                    </div>

                                ))
                                }
                            </div>
                        </details>

                    ))
                    }
                </CardVisualizarServidores>
            </div>
        </section>
    );
}