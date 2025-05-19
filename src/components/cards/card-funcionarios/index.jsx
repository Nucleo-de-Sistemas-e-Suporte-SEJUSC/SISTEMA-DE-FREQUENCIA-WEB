import styles from "./style.module.css"
import { toast } from "sonner"
import Checked from "../../../assets/checked.svg"
import { api } from "../../../api/axios"
import { useState } from "react"

export function CardFuncionarios(props) {
    // <button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]} `}>Histórico</button>
    // <button className={`${styles["card__details__atualizar__button"]} ${styles["card__details__button"]} `}>Atualizar</button>
    
    const [isLoading, setIsLoading] = useState(false)
    const { identificador, nome, quantidadeServidores, isChecked, onChecked, id, onArquivaServidor } = props
    const toggleDetails = (event) => {
        const detailsElement = event.currentTarget.querySelector('details');
        if (detailsElement) {
            detailsElement.open = !detailsElement.open;
        }
    };

    async function arquivaServidor() {
        try {
            setIsLoading(true)
            const usuario = JSON.parse(localStorage.getItem("usuario"))
            const { mensagem, servidorArquivado } = await onArquivaServidor()

            toast.success(mensagem, {
                duration: 4000,
                icon: false
            })

            await historicoLogsArquivar(usuario, servidorArquivado.nome, servidorArquivado.setor)
            window.location.reload()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function historicoLogsArquivar(usuario, nomeServidor, setorServidor) {
        const dados = await api.post("/historico-logs", {
            nome: usuario.nome,
            acao: "Arquivar",
            mensagem: `O usuario de nome ${usuario.nome} arquivou o servidor(a) ${nomeServidor} do setor ${setorServidor}`,
        })
    }

    return (
        <section
            className={styles["card__servidores"]}
            onClick={toggleDetails} // Adiciona o evento de clique
        >
            <details className={styles["card__details"]}>
                <summary className={styles["card__summary"]} onClick={(e) => e.stopPropagation()}>
                    {nome}
                </summary>
                {quantidadeServidores > 0 && <p>{quantidadeServidores} {identificador ? 'Estagiários' : 'Servidores'}</p>}
                {quantidadeServidores === 0 && <p>Nenhum servidor</p>}

                <div className={styles["card__details__container__button"]}>
                    
                    <button className={`${styles["card__details__arquivar__button"]} ${styles["card__details__button"]} `} onClick={arquivaServidor}>Arquivar</button>
                </div>
            </details>

            <div
                className={styles["container-selecionar"]}
                onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique afete o card
                    onChecked({ target: { checked: !isChecked } }); // Alterna o estado do checkbox
                }}
            >
                <input
                    type="checkbox"
                    name="selecionar"
                    id={`selecionar-${id}`}
                    className={styles["container-selecionar__input"]}
                    checked={isChecked}
                    onChange={(e) => e.stopPropagation()} // Impede que o clique no input afete o card
                />
                <div className={styles["container-selecionar__label"]}>
                    <img
                        src={Checked}
                        className={isChecked ? styles["icon-check-visible"] : styles["icon-check-hidden"]}
                        alt=""
                    />
                    <label htmlFor={`selecionar-${id}`}>
                        {isChecked ? "Selecionado" : "Selecionar"}
                    </label>
                </div>
            </div>
        </section>
    )
}