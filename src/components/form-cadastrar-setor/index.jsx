import "./style.css"
import * as Dialog from "@radix-ui/react-dialog";

export function FormCadastrarSetor() {
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
                        <label htmlFor="sigla" className='form__dialog__label'>Sigla</label>
                        <input type="text" name="sigla" id="sigla" className='form__dialog__input' />
                    </div>
                    <div>
                        <label htmlFor="funcao" className='form__dialog__label'>Função</label>
                        <input type="text" name="funcao" id="funcao" className='form__dialog__input' />
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}