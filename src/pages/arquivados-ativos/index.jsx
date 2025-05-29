import styles from "./style.module.css"
import { useState } from "react";
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { NavLink } from "react-router-dom";
import { Header } from "../../components/comuns/header";
import * as Dialog from '@radix-ui/react-dialog';
import { FormCadastrarFuncionarios } from "../../components/formularios/form-cadastrar-funcionarios";

export function ArquivadosAtivos() {
    const [menu, setMenu] = useState(false)

    return (
        <section className={
            menu ? "container__principal" : "container__principal__menu__fechado"
        }>
            <BarraLateral
                menuOpen={menu}
                handleMenu={setMenu}
            />

            <section>
                <Header
                    titulo="Arquivos de Funcionários"
                />

                <main>
                    <NavLink to="/arquivados">
                        <button className={styles["botao__arquivados__ativo"]}>Arquivados</button>
                    </NavLink>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className={styles["button__cadastrar__servidor"]}>
                                Cadastrar Servidor
                            </button>
                        </Dialog.Trigger>

                        <FormCadastrarFuncionarios />
                    </Dialog.Root>
                </main>
            </section>
        </section>
    )
}