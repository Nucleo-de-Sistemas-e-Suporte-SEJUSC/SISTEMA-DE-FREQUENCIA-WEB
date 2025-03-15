import styles from "./style.module.css"
import { CardVisualizarServidores } from "../cards/card-visualizar-servidores"

export function MainHistoricoAlteracao() {
    return (
        <section className={styles["container-historico-visualizacao"]}>
            <form action="#" className={styles["form-historico-alteracao"]}>
                <div className={styles["container__input--historico-alteracao"]}>
                    <label htmlFor="cargo" className={styles["label__historico__alteracao"]}>Cargo</label>
                    <select name="cargo-opcao" id="cargo-opcao" className={styles["input__historico__alteracao"]}>
                        <option value="selecione" selected>Selecione</option>
                        <option value="option 1">Option 1</option>
                        <option value="option 2">Option 2</option>
                        <option value="option 3">Option 3</option>
                        <option value="option 4">Option 4</option>
                    </select>
                </div>
                <div className={styles["container__input--historico-alteracao"]}>
                    <label htmlFor="acao" className={styles["label__historico__alteracao"]}>Ação</label>
                    <select name="acao-opcao" id="acao-opcao" className={styles["input__historico__alteracao"]}>
                        <option value="selecione" selected>Selecione</option>
                        <option value="option 1">Option 1</option>
                        <option value="option 2">Option 2</option>
                        <option value="option 3">Option 3</option>
                        <option value="option 4">Option 4</option>
                    </select>
                </div>
                <div className={styles["container__input--historico-alteracao"]}>
                    <input type="date" name="data-alteracao" id="data-alteracao" className={`${styles["input__historico__alteracao"]} ${styles["input__historico__alteracao--data"]}`}/>
                </div>

                <button className={styles["button__historico-alteracao"]}>Ir</button>
            </form>

            <CardVisualizarServidores>
                <details className={styles["card__details"]}>
                    <summary className={styles["summary"]}>
                        <p>Administrador - <span>Lucas Nather</span></p>

                        <div className={styles["containers_button__historico"]}>
                            <button className={styles["button__arquivar"]}>Arquivou</button>
                            <button className={styles["button__funcionario"]}>Robson Felipe</button>
                        </div>
                    </summary>

                    <p>12/03/2025 - 9:45:37</p>
                </details>
            </CardVisualizarServidores>
        </section>
    )
}