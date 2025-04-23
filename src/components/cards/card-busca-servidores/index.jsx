
import styles from "./style.module.css"

export function CardBuscaServidores(props) {
    const { meses, mes, funcionarios, onMesChange, possuiSelecaoDoMes } = props;

    return (
        <div className={styles["container__visualizar__funcionarios"]}>
            {/* Lista de funcionários */}
            <div className={styles["card__container__details"]}>
                {funcionarios.map((funcionario, index) => (
                    <details key={index} className={styles["card__details"]}>
                        <summary className={styles["card__summary"]}>
                            {funcionario.nome}
                        </summary>
                        <p>{funcionario.setor}</p>
                    </details>
                ))}
            </div>

            {/* Selector de Mês */}

            {
                possuiSelecaoDoMes && (
                    <div className={styles["form__filtro__select__container"]}>
                        <label htmlFor="meses">Selecione o mês:</label>
                        <select 
                            name="meses" 
                            id="meses" 
                            className="form__filtro__select form__siltro__select--visualizar"
                            value={mes} // Controlado pelo estado mesSelecionado
                            onChange={(e) => onMesChange(e.target.value)}
                        >
                            {meses.map((mesOption, index) => (
                                <option key={index} value={mesOption}>{mesOption}</option>
                            ))}
                        </select>
                    </div>
                )
            } 
        </div>
    );
}