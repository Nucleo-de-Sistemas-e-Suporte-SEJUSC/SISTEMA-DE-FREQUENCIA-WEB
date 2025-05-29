import { Link } from "react-router-dom";
import { meses } from "../../../utils/meses";
import { CardBuscaServidores } from "../../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../../cards/card-visualizar-servidores";
import styles from "./style.module.css";
import { api } from "../../../api/axios";
import { useEffect, useState } from "react";

export function MainVisualizarEstagiarios() {
        const data = new Date();
        const mesAtual = data.getMonth();
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(false);
        const [estagiarios, setEstagiarios] = useState([]);
        const [estagiariosFiltrados, setEstagiariosFiltrados] = useState([]);
        const [mesSelecionado, setMesSelecionado] = useState(meses[mesAtual]);
        const [termoBusca, setTermoBusca] = useState("");

        async function listaEstagiariosPDF() {
                setLoading(true);
                setError(null);
                try {
                    const dados = await api.get("/estagiarios/pdfs");
                    const { estagiarios_pdf: estagiariosPDF } = dados.data;


                    // Junta todos os setores em um único objeto
                    const setoresComEstagiarios = {};
                    estagiariosPDF.forEach(item => {
                        console.log(Object.entries(item))
                        for (const [setor, conteudo] of Object.entries(item)) {
                            if (conteudo.estagiario) {
                                setoresComEstagiarios[setor] = conteudo;
                            }
                        }
                    });

                    setEstagiarios([setoresComEstagiarios]);
                    filtrarEstagiarios([setoresComEstagiarios], mesSelecionado);
                } catch (error) {
                    setError("Erro ao carregar dados dos estagiários");
                } finally {
                    setLoading(false);
                }
            }


        function transformarDados(data, mesFiltro) {
                const resultado = [];
                if (!Array.isArray(data)) return resultado;
        
                for (const item of data) {
                if (!item || typeof item !== 'object') continue;
        
                for (const [setor, conteudo] of Object.entries(item)) {
                        if (conteudo?.estagiario?.[mesFiltro]) {
                        for (const [nomeEstagiario, dadosEstagiario] of Object.entries(conteudo.estagiario[mesFiltro])) {
                                resultado.push({
                                        nome: nomeEstagiario,
                                        setor: setor,
                                        arquivos: dadosEstagiario.arquivos || [],
                                        mes: mesFiltro
                                });
                        }
                        }
                }
                }

                return resultado;
        }

        function filtrarEstagiarios(data, mes) {
                const estagiariosTransformados = transformarDados(data, mes);
                setEstagiariosFiltrados(estagiariosTransformados);
                setMesSelecionado(mes);
        }

        // Busca dados apenas uma vez (no mount)
        useEffect(() => {
                listaEstagiariosPDF();
        }, []);

        // Filtra estagiários pelo termo de busca
        const estagiariosFiltradosComBusca = estagiariosFiltrados.filter(estagiario => {
                const termo = termoBusca.toLowerCase();
                return (
                estagiario.nome.toLowerCase().includes(termo) ||
                estagiario.setor.toLowerCase().includes(termo)
                )
        });


    async function buscarPDF(setor, mes, nome) {
        try {
            const response = await api.get('/estagiarios/pdf/view', {
                params: {setor, mes, nome},
                responseType: 'blob',
            })

            const blob = new Blob([response.data], {type: 'application/pdf'})
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
                        placeholder="Pesquisa pelo estagiário ou setor"
                        className={styles["form__visualizar__input"]}
                        value={termoBusca}
                        onChange={e => setTermoBusca(e.target.value)}
                    />
                </div>
                <p>Estagiários / Mês: {mesSelecionado}</p>
            </form>

            <div className={styles["container__visualizar__content"]}>
                <CardBuscaServidores 
                    meses={meses} 
                    mes={mesSelecionado}
                    visualizar="visualizar"
                    funcionarios={estagiariosFiltrados}
                    onMesChange={(novoMes) => filtrarEstagiarios(estagiarios, novoMes, setorSelecionado)}
                    onSetorChange={(novoSetor) => filtrarEstagiarios(estagiarios, mesSelecionado, novoSetor)}
                />

                <CardVisualizarServidores>
                    {estagiariosFiltradosComBusca.length > 0 ? (
                        estagiariosFiltradosComBusca.map((estagiario, index) => (
                            <details key={index} className={styles["card__details"]}>
                                <summary className={styles["card__summary"]}>
                                    {estagiario.nome}
                                </summary>
                                <p>{estagiario.setor}</p>
                                <div className={styles["card__content"]}>
                                    {estagiario.arquivos.map((arquivo, i) => (
                                        <div key={i}>
                                            <button
                                                onClick={() => buscarPDF(estagiario.setor, estagiario.mes, estagiario.nome)}
                                                className={styles["card__link"]}
                                            >
                                                {arquivo}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        ))
                    ) : (
                        <p>Nenhum estagiário encontrado</p>
                    )}
                </CardVisualizarServidores>
            </div>
        </section>
    );
}