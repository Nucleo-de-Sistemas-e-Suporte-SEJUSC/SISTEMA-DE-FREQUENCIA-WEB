import "./style.css"
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

export function FormularioAtualizarHistorico() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
                <form action="#" className='form__dialog'>
                    <div>
                        <label htmlFor="nome" className='form__dialog__label'>Nome</label>
                        <input type="text" name="nome" id="nome" className='form__dialog__input' />
                    </div>
                    <div>
                        <label htmlFor="setor" className='form__dialog__label'>Setor</label>
                        <input type="text" name="setor" id="setor" className='form__dialog__input' />
                    </div>
                    <div>
                        <label htmlFor="matricula" className='form__dialog__label'>Matrícula</label>
                        <input type="text" name="matricula" id="matricula" className='form__dialog__input' />
                    </div>
                    <div>
                        <label htmlFor="data-nomeacao" className='form__dialog__label'>Data Nomeação</label>
                        <input type="date" name="data-nomeacao" id="data-nomeacao" className='form__dialog__input' />
                    </div>

                    <div className='container__button__anexar'>
                        <button>Documentos Anexados</button>
                        <button>Anexar Documentos</button>
                    </div>

                    <div className='container__button__acoes__servidor'>
                        <Dialog.Close asChild>
                            <button className='container__button__cancelar__servidor'>Cancelar</button>
                        </Dialog.Close>

                        <button className='container__button__cadastrar__servidor' onClick={() => {
                             toast.success("Cadastrado", {
                                description: "Servidor atualizado com sucesso!",
                                duration: 3000
                            })
                        }}>Salvar</button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}