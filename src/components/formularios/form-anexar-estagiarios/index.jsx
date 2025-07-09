import * as Dialog from '@radix-ui/react-dialog'
import './style.css'

export function FormAnexarEstagiario({ nome }) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='DialogOverlay' />
            <Dialog.Content className='DialogContent'>
                <Dialog.DialogTitle className='dialog-title'>Anexar Arquivos</Dialog.DialogTitle>
                <form className="container_form">
                    <h3>Estagiário: {nome}</h3>
                    <h4>Documentos</h4>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            RH*
                            <input
                                className=""
                                type="file"
                                id="rh"
                                name="rh"
                                required
                            />
                        </label>
                    </div>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            Título de Eleitor*
                            <input
                                className=""
                                type="file"
                                id="titulo_de_eleitor"
                                name="titulo_de_eleitor"
                                required
                            />
                        </label>
                    </div>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            CPF*
                            <input
                                className=""
                                type="file"
                                id="cpf"
                                name="cpf"
                                required
                            />
                        </label>
                    </div>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            PIS/PASED*
                            <input
                                className=""
                                type="file"
                                id="pis_pased"
                                name="pis_pased"
                                required
                            />
                        </label>
                    </div>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            Certidão Reservista (Se Homem)*
                            <input
                                className=""
                                type="file"
                                id="certidao_reservista"
                                name="certidao_reservista"
                                required
                            />
                        </label>
                    </div>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            Comprovante de Escolaridade*
                            <input
                                className=""
                                type="file"
                                id="comprovante_de_escolaridade"
                                name="comprovante_de_escolaridade"
                                required
                            />
                        </label>
                    </div>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            Foto 3x4*
                            <input
                                className=""
                                type="file"
                                id="foto"
                                name="foto"
                                required
                            />
                        </label>
                    </div>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            Certidão de Nascimento*
                            <input
                                className=""
                                type="file"
                                id="certidao_de_ascimento"
                                name="certidao_de_nascimento"
                                required
                            />
                        </label>
                    </div>

                    <div className="container_label">
                        <label
                            className="content_label"
                        >
                            Currículo*
                            <input
                                className=""
                                type="file"
                                id="curriculo"
                                name="curriculo"
                                required
                            />
                        </label>
                    </div>
                    <button className="button_enviar_documento" type="submit">ENVIAR</button>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}