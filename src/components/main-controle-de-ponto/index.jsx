import { NavLink } from "react-router-dom";
import styles from "./style.module.css"
import * as Dialog from "@radix-ui/react-dialog"
import { Faltas } from "../faltas";

export function MainControleDePonto() {
    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    const hora = data.getHours()
    const minutos = data.getMinutes()

    return (
        <section className={styles["container__links__navegacao"]}>
            <div >
                <NavLink className={styles["links__navegacao"]}>
                    Geral
                </NavLink>
                <NavLink className={styles["links__navegacao"]}>
                    Servidores
                </NavLink>
                <NavLink className={styles["links__navegacao"]}>
                    Estagiários
                </NavLink>
            </div>

            <div className={styles["container__horario"]}>
                <p className={styles["p-controle"]}>Dia: {dia}/{mes}/{ano}</p>
                <p className={styles["p-controle"]}>Horario: {hora}:{minutos}</p>
            </div>

            <div className={styles["container__dados"]}>
                <p className={styles["p-controle"]}>Servidores Presentes:</p>
                <p className={styles["p-controle"]}>Estagiarios Presentes:</p>
            </div>

            <div className={styles["container__dados"]}>
                <p className={styles["p-controle"]}>Servidores Validados(entre 7:45 e 8:15/ 10:45 e 11:15):</p>
                <p className={styles["p-controle"]}>Estagiarios Validados:</p>
            </div>

            <div className={styles["container__dados"]}>
                <p className={styles["p-controle"]}>Servidores Atrasados(entrada após 8:15/11:15):</p>
                <p className={styles["p-controle"]}>Estagiarios Atrasados:</p>
            </div>

            <div className={styles["container__dados"]}>
                <p className={styles["p-controle"]}>Servidores que Faltaram:</p>
                <p className={styles["p-controle"]}>Estagiarios que Faltaram:</p>
            </div>


            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className={styles["button-ponto"]}>
                        Faltas
                    </button>
                </Dialog.Trigger>

                <Faltas />
            </Dialog.Root>

            <div>
                <button  className={styles["button-ponto"]}>
                    Gerar Relatório Mensal por Setor
                </button>
            </div>
        </section>
    )
}