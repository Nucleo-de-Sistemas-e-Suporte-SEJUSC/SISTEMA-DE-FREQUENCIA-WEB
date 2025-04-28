import './style.css'
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from 'sonner';
import { useState } from 'react'; // Importe o useState
import { api } from '../../../api/axios';

export function FormCadastrarFuncionarios() {

    // Estado para cada campo do formulário
    const [formData, setFormData] = useState({
        nome: '',
        setor: '',
        horarioEntrada: '',
        horarioSaida: '',
        funcao: '',
        matricula: '',
        cargo: '',
        dataNomeacao: ''
    });

    async function cadastrarServidorAPI() {
        const response = await api.post("/servidores", {
            nome: formData.nome,
            setor: formData.setor.toUpperCase(),
            entrada: formData.horarioEntrada,
            saida: formData.horarioSaida,
            horario: `${formData.horarioEntrada} as ${formData.horarioSaida}`,
            funcao: formData.funcao,
            matricula: formData.matricula,
            cargo: formData.cargo,
        })

        const data = await response.data
    }


    // Função para atualizar o estado quando os inputs mudam
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validação básica
        if (!formData.nome || !formData.setor) {
            toast.error("Erro", {
                description: "Nome e Setor são obrigatórios!",
                duration: 3000
            });
            return;
        }

        // Aqui você pode adicionar a lógica para enviar os dados
        console.log('Dados do formulário:', formData);
        
        toast.success("Cadastrado", {
            description: "Servidor cadastrado com sucesso!",
            duration: 3000
        });

        // Limpa o formulário após o envio
        setFormData({
            nome: '',
            setor: '',
            horarioEntrada: '',
            horarioSaida: '',
            funcao: '',
            matricula: '',
            cargo: '',
            dataNomeacao: ''
        });
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='DialogOverlay' />
            <Dialog.Content className='DialogContent'>
                <form onSubmit={handleSubmit} className='form__dialog'>
                    <div>
                        <label htmlFor="nome" className='form__dialog__label'>Nome</label>
                        <input 
                            type="text" 
                            name="nome" 
                            id="nome" 
                            className='form__dialog__input'
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="setor" className='form__dialog__label'>Setor</label>
                        <input 
                            type="text" 
                            name="setor" 
                            id="setor" 
                            className='form__dialog__input'
                            value={formData.setor}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='container__inputs__horario'>
                        <div>
                            <label htmlFor="horario-entrada" className='form__dialog__label'>Horário Entrada</label>
                            <input 
                                type="time" 
                                name="horarioEntrada" 
                                id="horario-entrada" 
                                className='form__dialog__input'
                                value={formData.horarioEntrada}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="horario-saida" className='form__dialog__label'>Horário Saída</label>
                            <input 
                                type="time" 
                                name="horarioSaida" 
                                id="horario-saida" 
                                className='form__dialog__input'
                                value={formData.horarioSaida}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="funcao" className='form__dialog__label'>Função</label>
                        <input 
                            type="text" 
                            name="funcao" 
                            id="funcao" 
                            className='form__dialog__input'
                            value={formData.funcao}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="matricula" className='form__dialog__label'>Matrícula</label>
                        <textarea 
                            name="matricula" 
                            id="matricula" 
                            className='form__dialog__input'
                            value={formData.matricula}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="cargo" className='form__dialog__label'>Cargo</label>
                        <input 
                            type="text" 
                            name="cargo" 
                            id="cargo" 
                            className='form__dialog__input'
                            value={formData.cargo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="data-nomeacao" className='form__dialog__label'>Data de Nomeação</label>
                        <input 
                            type="date" 
                            name="dataNomeacao" 
                            id="data-nomeacao" 
                            className='form__dialog__input'
                            value={formData.dataNomeacao}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='container__button__anexar'>
                        <button type="button">Anexar Documentos</button>
                    </div>

                    <div className='container__button__acoes__servidor'>
                        <Dialog.Close asChild>
                            <button type="button" className='container__button__cancelar__servidor'>Cancelar</button>
                        </Dialog.Close>
                        <button type="submit" className='container__button__cadastrar__servidor' onClick={cadastrarServidorAPI}>
                            Cadastrar Servidor
                        </button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}