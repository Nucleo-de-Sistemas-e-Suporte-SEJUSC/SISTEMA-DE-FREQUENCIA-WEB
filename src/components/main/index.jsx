import "./style.css"
import { useState } from "react";
import { CardServidores } from "./card-servidores";
import { meses } from "./utils/meses";
import { testeServidores, testeSetor } from "./utils/teste";
import * as Dialog from "@radix-ui/react-dialog";
import { FormCadastrarFuncionarios } from "../form-cadastrar-funcionarios";
import { FormCadastrarSetor } from "../form-cadastrar-setor";
import { toast } from "sonner";

export function Main() {
    const [filtro, setFiltro] = useState("setor")
    const [checkedStates, setCheckedStates] = useState({});

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

    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]

    return (
        <main>
            <form action="#" className="form__filtro">
                <label htmlFor="selecione">Selecione o mês: </label>

                <div className="form__inputs__container">
                    <div>
                        <input 
                            type="radio" 
                            value="setor"
                            name="fitro" 
                            id="filtro"
                            checked={filtro === "setor"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="fitro" className="form__filtro__label">Setor</label>
                    </div>

                    <div>
                        <input 
                            type="radio" 
                            value="servidor"
                            id="filtro" 
                            name="fitro" 
                            checked={filtro === "servidor"}
                            onChange={handleFiltro}
                        />
                        <label htmlFor="fitro" className="form__filtro__label">Servidor</label>
                    </div>

                    <div className="form__filtro__select__container">
                        <select name="meses" id="meses" className="form__filtro__select" defaultValue={mes}>
                            { meses.map((mes, index) => {
                                return <option key={index} value={mes}>{mes}</option>
                            }) }
                        </select>
                    </div>
                </div>
            </form>

            {
                filtro === "setor" && (
                    <form action="#" className="filtros">
                                <div className="filtros__container">
                                    <input
                                        type="search"
                                        name="setor"
                                        id="setor"
                                        placeholder="Pesquisa pelo setor"
                                        className="filtros__input"
                                    />
                                </div>
                    </form>
                )
            }

            {
                filtro === 'servidor' && (
                    <form action="#" className="filtros">
                        <div className="filtros__container">
                            <input 
                                type="search" 
                                name="servidor" 
                                id="servidor" 
                                placeholder="Pesquisa pelo servidor"
                                className="filtros__input"
                            />
                        </div>
                    </form>
                )
            }

            {
                filtro === 'servidor' && (
                    <section className="container__servidores">
                        {
                            testeServidores.map(servidor => {
                                return <CardServidores 
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
                    <section className="container__setores">
                        {

                            testeSetor.map(setor => {
                                const quantidadeDeServidoresNoSetor = filtraSetores(setor.nome)
                                return <CardServidores 
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

            <section className="container__cadastrar__button">
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
                    filtro === "servidor" && (
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button>Cadastrar servidor</button>
                            </Dialog.Trigger>

                            <FormCadastrarFuncionarios />
                        </Dialog.Root>
                    )
                }

                <div className="container__gerar__button">
                    <button>Gerar servidores selecionados</button>
                    <button>Gerar todos os servidores</button>
                </div>
            </section>
        </main>
    )
}