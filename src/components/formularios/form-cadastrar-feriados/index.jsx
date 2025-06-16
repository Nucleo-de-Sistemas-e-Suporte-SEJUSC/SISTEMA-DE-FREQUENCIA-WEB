import './style.css'
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from 'sonner';
import { useState } from 'react'; // Importe o useState
import { api } from '../../../api/axios';

export function FormCadastrarFeriados() {

    // commit teste
    // Estado para cada campo do formulário
    const [formData, setFormData] = useState({
        dataFeriado: '',
        dataFacultativo: '',
        descricao: '',
        estado: 'AM'
    });

    //console.log(Boolean(formData.dataFacultativo))


    // Função para atualizar o estado quando os inputs mudam
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/feriados-municipais", {
                data: formData.dataFeriado,
                ponto_facultativo: Boolean(formData.dataFacultativo),
                descricao: formData.descricao,
                estado: formData.estado,
            });


            toast.success("Cadastrado", {
                description: "Feriado cadastrado com sucesso!",
                duration: 3000
            });

            // Limpa o formulário após envio bem-sucedido
            setFormData({
                dataFeriado: '',
                dataFacultativo: '',
                descricao: '',
                estado: ''
            });

        } catch (error) {
            const message = error?.response?.data?.erro || error.message || 'Erro desconhecido';
            toast.error("Erro ao cadastrar", {
                description: message,
                duration: 4000
            });
        }
    };
    
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='DialogOverlay' />
            <Dialog.Content className='DialogContent'>
                <Dialog.DialogTitle className='dialog-title'>Cadastrar Feriados/Pontos Facultativos</Dialog.DialogTitle>
                <form onSubmit={handleSubmit} className='form__dialog'>
                    <div>
                        <label htmlFor="dataFeriado" className='form__dialog__label'>Data*</label>
                        <input
                            type="date"
                            name="dataFeriado"
                            id="dataFeriado"
                            className='form__dialog__input'
                            value={formData.dataFeriado}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dataFacultativo" className='form__dialog__label'>Ponto Facultativo*</label>
                        <select
                            name="dataFacultativo"
                            id="dataFacultativo"
                            className='form__dialog__input'
                            value={formData.dataFacultativo}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="true">SIM</option>
                            <option value="false">NÃO</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="descricao" className='form__dialog__label'>Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            id="descricao"
                            className='form__dialog__input'
                            placeholder='Feriado Municipal'
                            value={formData.descricao}
                            onChange={handleInputChange}
                            maxLength={70}
                        />
                    </div>
                    <div>
                        <label htmlFor="estado" className='form__dialog__label'>Estado*</label>
                        <input
                            type="text"
                            name="estado"
                            id="estado"
                            className='form__dialog__input'
                            placeholder='Feriado Municipal'
                            value='AM'
                            readOnly
                            maxLength={70}
                            required
                        />
                    </div>
                    <div className='container__button__acoes__servidor'>
                        <Dialog.Close asChild>
                            <button type="button" className='container__button__cancelar__servidor'>Cancelar</button>
                        </Dialog.Close>
                        <button type="submit" className='container__button__cadastrar__servidor'>
                            Cadastrar Feriados
                        </button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}