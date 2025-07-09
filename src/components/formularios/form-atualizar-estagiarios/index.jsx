import './style.css'
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from 'sonner';
import { useState } from 'react'; // Importe o useState
import { api } from '../../../api/axios';

export function FormAtualizarEstagiarios({ id, estagiario }) {

    // commit teste
    // Estado para cada campo do formulário
    //console.log(estagiario)
    const [formData, setFormData] = useState({
        nome: estagiario.nome,                  // era nomeCompleto
        cargo: 'estagiário',
        setor: estagiario.setor,
        entrada: estagiario.horario_entrada,               // era horarioEntrada
        saida: estagiario.horario_saida,                 // era horarioSaida
        feriasinicio: '',
        feriasfinal: '',
        // Campos não usados pelo backend:
        // servicoMilitar: '',
        // condicaoJuridica: '',
        // carteiraProfissional: '',
        // carteiraSaude: '',
        // nomeMae: '',
        // nomePai: '',
    });


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
            // Remove campos vazios
            const payloadEstagiario = Object.fromEntries(
                Object.entries({
                    nome: formData.nome.toUpperCase(),
                    cargo: formData.cargo.toUpperCase(),
                    setor: formData.setor.toUpperCase(),
                    horario: `${formData.entrada}-${formData.saida}`,
                    entrada: formData.entrada,
                    saida: formData.saida,
                    feriasinicio: formData.feriasinicio,
                    feriasfinal: formData.feriasfinal,
                }).filter(([_, value]) => value !== '')
            );

            await api.put(`/estagiarios/${id}`, payloadEstagiario);


            window.location.reload();
            toast.success("Cadastrado", {
                description: "Estagiário atualizado com sucesso!",
                duration: 3000
            });

            // Limpa o formulário após envio bem-sucedido
            setFormData({
                nome: '',
                cargo: '',
                setor: '',
                horario: '',
                entrada: '',
                saida: '',
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
                <Dialog.DialogTitle className='dialog-title'>Atualizar Estagiário</Dialog.DialogTitle>
                <form onSubmit={handleSubmit} className='form__dialog'>
                    <div>
                        <label htmlFor="nome" className='form__dialog__label'>Nome Completo*</label>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder='José da Silva Vasconelos'
                            className='form__dialog__input'
                            value={formData.nome}
                            onChange={handleInputChange}
                            maxLength='70'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cargo" className='form__dialog__label'>Cargo*</label>
                        <input
                            type="text"
                            name="cargo"
                            id="cargo"
                            className='form__dialog__input'
                            placeholder='Assessor I'
                            pattern='^[A-Za-zÀ-ÿ\s]+$'
                            title={'\n\nNão é permitido números'}
                            value={formData.cargo}
                            onChange={handleInputChange}
                            maxLength={50}
                            readOnly
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="setor" className='form__dialog__label'>Setor*</label>
                        <input
                            type="text"
                            name="setor"
                            id="setor"
                            className='form__dialog__input'
                            placeholder='ASCOM'
                            title={'\n\nNão é permitido números'}
                            pattern='^[A-Za-zÀ-ÿ\s]+$'
                            value={formData.setor}
                            onChange={handleInputChange}
                            maxLength={6}
                            required
                        />
                    </div>
                    <div className='container__inputs__horario'>
                        <div>
                            <label htmlFor="entrada" className='form__dialog__label'>Horário Entrada</label>
                            <select
                                name="entrada"
                                id="entrada"
                                className='form__dialog__input'
                                value={formData.entrada}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione</option>
                                <option value="08:00">08:00</option>
                                <option value="11:00">11:00</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="saida" className='form__dialog__label'>Horário Saída</label>
                            <select
                                name="saida"
                                id="saida"
                                className='form__dialog__input'
                                value={formData.saida}
                                onChange={handleInputChange}

                            >
                                <option value="">Selecione</option>
                                <option value="14:00">14:00</option>
                                <option value="17:00">17:00</option>
                            </select>

                        </div>
                    </div>
                    <div className='container__inputs__horario'>
                        <div>
                            <label htmlFor="feriasinicio" className='form__dialog__label'>Ferias Início</label>
                            <input
                                type="date"
                                name="feriasinicio"
                                id="feriasinicio"
                                className='form__dialog__input'
                                value={formData.feriasinicio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="feriasfinal" className='form__dialog__label'>Ferias Final</label>
                            <input
                                type="date"
                                name="feriasfinal"
                                id="feriasfinal"
                                className='form__dialog__input'
                                value={formData.feriasfinal}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='container__button__acoes__servidor'>
                        <Dialog.Close asChild>
                            <button type="button" className='container__button__cancelar__servidor'>Cancelar</button>
                        </Dialog.Close>
                        <button type="submit" className='container__button__cadastrar__servidor'>
                            Atualizar Estagiário
                        </button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}