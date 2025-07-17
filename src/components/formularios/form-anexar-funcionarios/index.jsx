import React from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import './style.css'
import { toast } from 'sonner';
import { api } from '../../../api/axios';

export function FormAnexarFuncionario({ nome, id }) {
    const [uploadData, setUploadData] = React.useState({
        tiposDocumento: [],
        funcionarioId: id,
        files: []
    });

    const { files, funcionarioId, tiposDocumento } = uploadData

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!files) return

        const formData = new FormData()
        files.forEach((file, index) => {
            formData.append('files', file);
            formData.append('tipos_documento', tiposDocumento[index] || 'Não especificado');
        });
        if (funcionarioId) formData.append('funcionario_id', funcionarioId)
        if (tiposDocumento) formData.append('tipo_documento', tiposDocumento)

        try {
            await api.post('/documentos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            toast.success('Upload realizado com sucesso!')
            setUploadData(() => ({
                tipoDocumento: null,
                funcionarioId: null,
                files: null
            }))
            window.location.reload();
        } catch (error) {
            const message = error.response?.data?.error || 'Erro desconhecido'
            toast.error(`Erro: ${message}`)
            console.error(error)
        }

    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='DialogOverlay' />
            <Dialog.Content className='DialogContent'>
                <Dialog.DialogTitle className='dialog-title'>Anexar Arquivos</Dialog.DialogTitle>
                <form onSubmit={handleSubmit} className="container_form">
                    <h3>Funcionário: {nome}</h3>
                    <h4>Documentos</h4>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            RH
                            <input
                                className=""
                                type="file"
                                name="rh"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'rh']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            Título de Eleitor
                            <input
                                className=""
                                type="file"
                                name="titulo_de_eleitor"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'titulo_de_eleitor']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            CPF
                            <input
                                className=""
                                type="file"
                                name="cpf"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'cpf']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            PIS/PASED
                            <input
                                className=""
                                type="file"
                                name="pis_pased"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'pis_pased']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            Certidão Reservista (Se Homem)
                            <input
                                className=""
                                type="file"
                                name="certidao_reservista"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'certidao_reservista']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            Comprovante de Escolaridade
                            <input
                                className=""
                                type="file"
                                name="comprovante_de_escolaridade"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'comprovante_de_escolaridade']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            Foto 3x4
                            <input
                                className=""
                                type="file"
                                name="foto"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'foto']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            Certidão de Nascimento
                            <input
                                className=""
                                type="file"
                                name="certidao_de_nascimento"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'certidao_de_ascimento']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="container_label">

                        <label
                            className="content_label"
                        >
                            Currículo
                            <input
                                className=""
                                type="file"
                                name="curriculo"
                                onChange={({ currentTarget }) => {
                                    const newFile = currentTarget.files?.[0];
                                    if (newFile) {
                                        setUploadData((prevValues) => ({
                                            ...prevValues,
                                            files: [...prevValues.files, newFile],
                                            tiposDocumento: [...prevValues.tiposDocumento, 'curriculo']
                                        }));
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <button className="button_enviar_documento" type="submit">ENVIAR</button>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}