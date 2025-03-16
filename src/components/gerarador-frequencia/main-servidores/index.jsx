import "./style.css"
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { meses } from "../../../utils/meses";
import { testeServidores, testeSetor } from "../../../utils/teste";
import { FormCadastrarSetor } from "../../formularios/form-cadastrar-setor";
import { FormCadastrarFuncionarios } from "../../formularios/form-cadastrar-funcionarios";
import { CardFuncionarios } from "../../cards/card-funcionarios";
import IconeLapis from "../../../assets/lapis.svg"

export function MainServidores() {
    const [filtro, setFiltro] = useState("setor")
    const [checkedSetores, setCheckedSetores] = useState({});
    const [checkedServidores, setCheckedServidores] = useState({});

    const data = new Date()
    const mesAtual = data.getMonth()
    const mes = meses[mesAtual]

    const handleCheckboxChange = (id, type) => {
        if (type === "setor") {
            setCheckedSetores(prevState => ({
                ...prevState,
                [id]: !prevState[id]
            }));
            setCheckedServidores({});
        } else if (type === "servidor") {
            setCheckedServidores(prevState => ({
                ...prevState,
                [id]: !prevState[id]
            }));
            setCheckedSetores({});
        }
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
                    <section className="container__pesquisa__gerador">
                        <div className="modal">
                            <Dialog.Root>
                                <Dialog.Trigger className="botao__modal">
                                    <img src={IconeLapis} alt="" />
                                    <p>Cadastrar setor</p>
                                </Dialog.Trigger>
                                <FormCadastrarSetor />
                            </Dialog.Root>
                        </div>

                        <form action="#" className="filtros">
                                    <div className="filtros__container">
                                        <input
                                            type="text"
                                            name="setor"
                                            id="setor"
                                            placeholder="Pesquisa pelo setor"
                                            className="filtros__input"
                                        />
                                    </div>
                        </form>
                    </section>
                )
            }

            {
                filtro === 'servidor' && (
                    <section className="container__pesquisa__gerador">
                        <div className="modal">
                            <Dialog.Root>
                                <Dialog.Trigger className="botao__modal">
                                    <img src={IconeLapis} alt="" />
                                    <p>Cadastrar servidor</p>
                                </Dialog.Trigger>
                                <FormCadastrarFuncionarios />
                            </Dialog.Root>
                        </div>

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
                    </section>
                )
            }

            {
                filtro === 'servidor' && (
                    <section className="container__servidores">
                        {
                            testeServidores.map(servidor => {
                                return <CardFuncionarios
                                    key={servidor.id}
                                    nome={servidor.nome} 
                                    id={servidor.id}
                                    isChecked={!!checkedServidores[servidor.id]}
                                    onChecked={() => handleCheckboxChange(servidor.id, "servidor")}
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
                                return <CardFuncionarios 
                                    key={setor.id} 
                                    nome={setor.nome}
                                    id={setor.id}
                                    quantidadeServidores={quantidadeDeServidoresNoSetor}
                                    isChecked={!!checkedSetores[setor.id]}
                                    onChecked={() => handleCheckboxChange(setor.id, "setor")}
                                />
                            })
                        }
                    </section>
                )
            }

            <section className="container__cadastrar__button">

                <div className="container__gerar__button">
                    <button>Gerar  { filtro === 'servidor' ? "servidores" : "setores" } </button>
                    <button>Gerar todos os { filtro === 'servidor' ? "servidores" : "setores" } </button>
                </div>
            </section>
        </main>
    )
}