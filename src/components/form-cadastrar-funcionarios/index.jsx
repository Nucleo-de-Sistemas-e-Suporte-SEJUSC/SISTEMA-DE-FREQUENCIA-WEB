import './style.css'
import * as Dialog from "@radix-ui/react-dialog";

export function FormCadastrarFuncionarios() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='DialogOverlay' />
            <Dialog.Content className='DialogContent'>
                <form action="#" className='form__dialog'>
                    <div>
                        <label htmlFor="nome" className='form__dialog__label'>Nome</label>
                        <input type="text" name="nome" id="nome" className='form__dialog__input' />
                    </div>
                    <div>
                        <label htmlFor="setor" className='form__dialog__label'>Setor</label>
                        <input type="text" name="setor" id="setor" className='form__dialog__input' />
                    </div>
                    <div className='container__inputs__horario'>
                        <div>
                            <label htmlFor="horario-entrada" className='form__dialog__label'>Horário Entrada</label>
                            <input type="time" name="horario-entrada" id="horario-entrada" className='form__dialog__input' />
                        </div>

                        <div>
                            <label htmlFor="horario-saida" className='form__dialog__label'>Horário Saída</label>
                            <input type="time" name="horario-saida" id="horario-saida" className='form__dialog__input' />
                        </div>

                        
                    </div>
                    <div>
                        <label htmlFor="funcao" className='form__dialog__label'>Função</label>
                        <input type="text" name="funcao" id="funcao" className='form__dialog__input' />
                    </div>
                    <div>
                        <label htmlFor="matricula" className='form__dialog__label'>Matrícula</label>
                        <textarea name="matricula" id="matricula" className='form__dialog__input'></textarea>
                    </div>
                    <div>
                        <label htmlFor="cargo" className='form__dialog__label'>Cargo</label>
                        <input type="text" name="cargo" id="cargo" className='form__dialog__input' />
                    </div>
                    <div>
                        <label htmlFor="data-nomeacao" className='form__dialog__label'>Data de Nomeação</label>
                        <input type="date" name="data-nomeacao" id="data-nomeacao" className='form__dialog__input' />
                    </div>

                    <div className='container__button__anexar'>
                        <button>Anexar Documentos</button>
                    </div>

                    <div className='container__button__acoes__servidor'>
                        <Dialog.Close asChild>
                            <button className='container__button__cancelar__servidor'>Cancelar</button>
                        </Dialog.Close>
                        <button className='container__button__cadastrar__servidor'>Cadastrar Servidor</button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}