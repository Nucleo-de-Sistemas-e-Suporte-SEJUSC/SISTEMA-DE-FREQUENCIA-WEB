import styles from "./style.module.css"
import { toast } from "sonner"
import Checked from "../../../assets/checked.svg"

export function CardFuncionarios(props) {
    
    const { nome, quantidadeServidores, isChecked, onChecked, id  } = props

    return (
        <section className={styles["card__servidores"]}>
            <details className={styles["card__details"]}>
                <summary className={styles["card__summary"]}>{ nome }</summary>
                { quantidadeServidores > 0 && <p>{quantidadeServidores} Servidores</p> }
                { quantidadeServidores === 0 && <p>Nenhum servidor</p> }

                <div className={styles["card__details__container__button"]}>
                    <button className={`${styles["card__details__historico__button"]} ${styles["card__details__button"]} `}>Histórico</button>
                    <button className={`${styles["card__details__atualizar__button"]} ${styles["card__details__button"]} `}>Atualizar</button>
                    <button className={`${styles["card__details__arquivar__button"]} ${styles["card__details__button"]} `} onClick={() => {
                         toast.error("Arquivar Servidor", {
                            description: "Esta ação moverá o Servidor para os Arquivados",
                            duration: 15000,
                            cancel: {
                                label: "X"
                            },
                            action: {
                                label: "Arquivar"
                            }
                        })
                    }}>Arquivar</button>
                </div>
            </details>

            <div className={styles["container-selecionar"]}>
                <input 
                    type="checkbox" 
                    name="selecionar" 
                    id={`selecionar-${id}`} 
                    className={styles["container-selecionar__input"]} 
                    checked={isChecked}
                    onChange={onChecked}
                />
                <div className={styles["container-selecionar__label"]}>
                    <img src={Checked} className={isChecked ? styles['icon-check-visible'] : styles['icon-check-hidden']} alt="" />

                    <label htmlFor={`selecionar-${id}`}>
                        { isChecked ? "Selecionado" : "Selecionar" }
                    </label>
                </div>
            </div>
        </section>
    )
}