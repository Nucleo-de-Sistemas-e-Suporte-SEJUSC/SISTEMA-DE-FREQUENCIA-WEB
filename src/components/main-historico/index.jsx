import styles from "./style.module.css"
import * as Dialog from "@radix-ui/react-dialog";
import { CardBuscaServidores } from "../cards/card-busca-servidores";
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores";
import { FormularioAtualizarHistorico } from "../formularios/formulario-atualizar-historico";

export function MainHistorico(props) {
    const { funcionarios } = props

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

                <p>{funcionarios} - Setor: GTI / Mês: Fevereiro  </p>
            </form>

            <div className={styles["container__visualizar__content"]}>
                <CardBuscaServidores
                    possuiSelecaoDoMes={false}
                />

                <CardVisualizarServidores>
                    <details className={styles["card__details"]}>
                        <summary className={styles["summary"]}>
                            <p>MARCOS LUIZ PEREIRA DOS SANTOS</p>
                        </summary>

                        <p>Arquivado: xx/xx/xxxx</p>

                        <div className={styles["containers_button__historico"]}>
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <button className={styles["details__amarelo"]}>Atualizar</button>
                                    </Dialog.Trigger>

                                    <FormularioAtualizarHistorico />
                                </Dialog.Root>
                                <button className={styles["details__lilas"]}>Histórico</button>
                        </div>

                    </details>
                </CardVisualizarServidores>
            </div>

        </section>
    );
}