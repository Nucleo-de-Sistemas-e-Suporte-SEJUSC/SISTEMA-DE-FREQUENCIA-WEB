import "./style.css"
import React from "react";
import { BarraLateral } from "../../components/comuns/barra-lateral";
import { NavLink } from "react-router-dom";
import { Header } from "../../components/comuns/header";
import * as Dialog from '@radix-ui/react-dialog';
import { FormCadastrarFuncionarios } from "../../components/formularios/form-cadastrar-funcionarios";
import { FormCadastrarEstagiarios } from "../../components/formularios/form-cadastrar-estagiarios";
import { FormCadastrarFeriados } from "../../components/formularios/form-cadastrar-feriados";
import { Modal } from "../../components/modal";
import { toast } from "sonner";
import { api } from "../../api/axios";

export function ArquivadosAtivos() {
    const [menu, setMenu] = React.useState(false)
    const [isDialogFuncionariosOpen, setIsDialogFuncionariosOpen] = React.useState(false);
    const [isDialogEstagiariosOpen, setIsDialogEstagiariosOpen] = React.useState(false);
    const [uploadData, setUploadData] = React.useState({
        openModal: false,
        tipoDocumento: null,
        funcionarioId: null,
        estagiarioId: null,
        file: null
    });

    //console.log(uploadData)

    const { file, funcionarioId, estagiarioId, tipoDocumento, openModal } = uploadData

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        if (funcionarioId) formData.append('funcionario_id', funcionarioId)
        if (estagiarioId) formData.append('estagiario_id', estagiarioId)
        if (estagiarioId) formData.append('estagiario_id', estagiarioId)
        if (tipoDocumento) formData.append('tipo_documento', tipoDocumento)

        try {
            const response = await api.post('documentos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            toast.success('Upload realizado com sucesso!')
            setUploadData(() => ({
                openModal: false,
                tipoDocumento: null,
                funcionarioId: null,
                estagiarioId: null,
                file: null
            }))
        } catch (error) {
            const message = error.response?.data?.error || 'Erro desconhecido'
            toast.error(`Erro: ${message}`)
            console.error(error)
        }

    }

    return (
        <section className={
            menu ? "container__principal" : "container__principal__menu__fechado"
        }>

            {openModal && (
                <Modal onClick={() => setUploadData(() => ({
                    openModal: false,
                    tipoDocumento: null,
                    funcionarioId: null,
                    estagiarioId: null,
                    file: null
                }))}>
                    <form onSubmit={handleSubmit} className="container_form">
                        <h3>Deseja anexar algum arquivo?</h3>
                        <div>
                            <label htmlFor="tipoDocumento" className="container_label">Tipo do Documento*</label>
                            <select
                                name="tipoDocumento"
                                id="tipoDocumento"
                                className='form__dialog__input'
                                value={tipoDocumento}
                                onChange={({ currentTarget }) => setUploadData((prevValues) => ({
                                    ...prevValues,
                                    tipoDocumento: currentTarget.value
                                }))}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="CURRICULO">CURRICULO</option>
                                <option value="RG">RG</option>
                                <option value="CNH">CNH</option>
                            </select>
                        </div>

                        <div className="container_label">
                            <label
                                className="content_label"
                            >
                                <input
                                    className=""
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={({ currentTarget }) => setUploadData((prevValues) => ({
                                        ...prevValues,
                                        file: currentTarget.files?.[0] || null
                                    }))}
                                    required
                                />
                            </label>
                        </div>
                        <button className="button_enviar_documento" type="submit">ENVIAR</button>
                    </form>
                </Modal>
            )}

            <BarraLateral
                menuOpen={menu}
                handleMenu={setMenu}
            />

            <section>
                <Header
                    titulo="Arquivos de Funcionários"
                />

                <main className="container_arquivados_ativo">
                    <NavLink to="/arquivados">
                        <button className="botao__arquivados__ativo">Arquivados</button>
                    </NavLink>

                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className="button__cadastrar__servidor">
                                Cadastrar Feriados
                            </button>
                        </Dialog.Trigger>

                        <FormCadastrarFeriados />
                    </Dialog.Root>

                    <Dialog.Root open={isDialogFuncionariosOpen} onOpenChange={setIsDialogFuncionariosOpen}>
                        <Dialog.Trigger asChild>
                            <button className="button__cadastrar__servidor">
                                Cadastrar Servidor
                            </button>
                        </Dialog.Trigger>

                        <FormCadastrarFuncionarios
                            setUploadData={setUploadData}
                            setIsDialogFuncionariosOpen={setIsDialogFuncionariosOpen}
                        />
                    </Dialog.Root>

                    <Dialog.Root open={isDialogEstagiariosOpen} onOpenChange={setIsDialogEstagiariosOpen}>
                        <Dialog.Trigger asChild>
                            <button className="button__cadastrar__servidor">
                                Cadastrar Estagiário
                            </button>
                        </Dialog.Trigger>

                        <FormCadastrarEstagiarios 
                            setUploadData={setUploadData}
                            setIsDialogEstagiariosOpen={setIsDialogEstagiariosOpen}
                        />
                    </Dialog.Root>
                </main>
            </section>
        </section>
    )
}