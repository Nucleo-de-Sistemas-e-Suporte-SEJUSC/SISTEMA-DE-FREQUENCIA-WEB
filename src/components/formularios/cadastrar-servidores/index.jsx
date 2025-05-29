import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import './styles.css'

export function CadastrarServidor() {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='dialog-overlay' />
            <Dialog.Content className='dialog-content'>
                <Dialog.DialogTitle className='dialog-title'>Cadastrar Servidor</Dialog.DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="nome-completo" className='form__dialog__label'>Nome Completo*</label>
                        <input
                            type="text"
                            name="nomeCompleto"
                            id="nome-completo"
                            placeholder='José da Silva Vasconelos'
                            {...register('nomeCompleto', { required: true, maxLength: 70 })}
                        />
                    </div>
                    <input type="submit" />
                </form>

                <Dialog.Close asChild>
                    <button type="button" className='dialog-button-cancelar'>Cancelar</button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    )
}