import styles from "./style.module.css"
import { useState } from "react";
import { meses } from "../../utils/meses";
import { testeServidores, testeSetor } from "../../utils/teste";
import * as Dialog from "@radix-ui/react-dialog";
import { FormCadastrarFuncionarios } from "../form-cadastrar-funcionarios";
import { FormCadastrarSetor } from "../form-cadastrar-setor";
import { CardFuncionarios } from "../card-funcionarios";

export function MainEstagiario() {
    const [filtro, setFiltro] = useState("setor")
    const [checkedStates, setCheckedStates] = useState({});

    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]

    const handleCheckboxChange = (id) => {
        setCheckedStates(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    function handleFiltro(event) {
        setFiltro(event.target.value)
    }

    function filtraSetores(setor) {
        const filtraSetor = testeServidores.filter(servidor => servidor.setor === setor)
        return filtraSetor.length
    }

    return (
        <main>
            <form action="#" className={styles["form__filtro"]}>
                <label htmlFor="selecione">Selecione o mês: </label>

                <div className={styles["form__inputs__container"]}>
                    <div>
                        <input 
                            type="radio" 
                            value="setor"
                            name="fitro" 
                            id="filtro"
                            checked={filtro === "setor"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="fitro" className={styles["form__filtro__label"]}>Setor</label>
                    </div>

                    <div>
                        <input 
                            type="radio" 
                            value="estagiario"
                            id="filtro" 
                            name="fitro" 
                            checked={filtro === "estagiario"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="fitro" className={styles["form__filtro__label"]}>Estagiário</label>
                    </div>

                    <div className={styles["form__filtro__select__container"]}>
                        <select name="meses" id="meses" className={styles["form__filtro__select"]} defaultValue={mes}>
                            { meses.map((mes, index) => {
                                return <option key={index} value={mes}>{mes}</option>
                            }) }
                        </select>
                    </div>
                </div>
            </form>

            {
                filtro === "setor" && (
                    <form action="#" className={styles["filtros"]}>
                                <div className={styles["filtros__container"]}>
                                    <input
                                        type="text"
                                        name="setor"
                                        id="setor"
                                        placeholder="Pesquisa pelo setor"
                                        className={styles["filtros__input"]}
                                    />
                                </div>
                    </form>
                )
            }

            {
                filtro === 'estagiario' && (
                    <form action="#" className={styles["filtros"]}>
                        <div className={styles["filtros__container"]}>
                            <input 
                                type="search" 
                                name="estagiario" 
                                id="estagiario" 
                                placeholder="Pesquisa pelo estagiário"
                                className={styles["filtros__input"]}
                            />
                        </div>
                    </form>
                )
            }

            {
                filtro === 'estagiario' && (
                    <section className={styles["container__servidores"]}>
                        {
                            testeServidores.map(servidor => {
                                return <CardFuncionarios 
                                    key={servidor.id} 
                                    nome={servidor.nome} 
                                    id={servidor.id}
                                    isChecked={!!checkedStates[servidor.id]}
                                    onChecked={() => handleCheckboxChange(servidor.id)}
                                />
                            })
                        }
                    </section>
                )
            }

            {
                filtro === 'setor' && (
                    <section className={styles["container__setores"]}>
                        {

                            testeSetor.map(setor => {
                                const quantidadeDeServidoresNoSetor = filtraSetores(setor.nome)
                                return <CardFuncionarios 
                                    key={setor.id} 
                                    nome={setor.nome}
                                    id={setor.id}
                                    quantidadeServidores={quantidadeDeServidoresNoSetor}
                                    isChecked={!!checkedStates[setor.id]}
                                    onChecked={() => handleCheckboxChange(setor.id)}
                                />
                            })
                        }
                    </section>
                )
            }

            <section className={styles["container__cadastrar__button"]}>
                {
                    filtro === "setor" && (
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button>Cadastrar setor</button>
                            </Dialog.Trigger>

                            <FormCadastrarSetor />
                        </Dialog.Root>
                    )
                }

                {
                    filtro === "estagiario" && (
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button>Cadastrar Estagiário</button>
                            </Dialog.Trigger>

                            <FormCadastrarFuncionarios />
                        </Dialog.Root>
                    )
                }

                <div className={styles["container__gerar__button"]}>
                    <button>Gerar  { filtro === 'estagiario' ? "estagiários" : "setores" } </button>
                    <button>Gerar todos os { filtro === 'estagiario' ? "estagiários" : "setores" } </button>
                </div>
            </section>
        </main>
    )
}