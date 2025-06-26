import './style.css'
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from 'sonner';
import { useState } from 'react'; // Importe o useState
import { api } from '../../../api/axios';

export function FormCadastrarFuncionarios() {

    // commit teste
    // Estado para cada campo do formulário
    const [formData, setFormData] = useState({
        nome: '',                  // era nomeCompleto
        matricula: '',
        data_nascimento: '',       // era dataDoNascimento
        estado_civil: '',          // era estadoCivil
        nacionalidade: '',
        naturalidade: '',
        identidade: '',            // era rg
        cpf: '',
        pis: '',                   // era pisPasep
        sexo: '',
        titulo_eleitor: '',        // era tituloEleitor
        cargo: '',
        setor: '',
        entrada: '',               // era horarioEntrada
        saida: '',                 // era horarioSaida
        data_admissao: '',
        // Campos não usados pelo backend:
        // servicoMilitar: '',
        // condicaoJuridica: '',
        // carteiraProfissional: '',
        // carteiraSaude: '',
        // nomeMae: '',
        // nomePai: '',
    });

    //pattern='^\d{3}\.\d{3}-\d\s[A-Z]$'

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
            await api.post("/criar/servidores", {
                nome: formData.nome.toUpperCase(),
                matricula: formData.matricula,
                data_nascimento: formData.data_nascimento,
                estado_civil: formData.estado_civil.toUpperCase(),
                nacionalidade: formData.nacionalidade.toUpperCase(),
                naturalidade: formData.naturalidade.toUpperCase(),
                cpf: formData.cpf,
                identidade: formData.identidade,
                pis: formData.pis,
                sexo: formData.sexo.toUpperCase(),
                titulo_eleitor: formData.titulo_eleitor,
                cargo: formData.cargo.toUpperCase(),
                setor: formData.setor.toUpperCase(),
                horario: `${formData.entrada}-${formData.saida}`,
                entrada: formData.entrada,
                saida: formData.saida,
                data_admissao: formData.data_admissao,
            });


            toast.success("Cadastrado", {
                description: "Servidor cadastrado com sucesso!",
                duration: 3000
            });

            // Limpa o formulário após envio bem-sucedido
            setFormData({
                nome: '',
                matricula: '',
                data_nascimento: '',
                estado_civil: '',
                nacionalidade: '',
                naturalidade: '',
                cpf: '',
                identidade: '',
                pis: '',
                sexo: '',
                titulo_eleitor: '',
                cargo: '',
                setor: '',
                horario: '',
                entrada: '',
                saida: '',
                data_admissao: '',
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
                <Dialog.DialogTitle className='dialog-title'>Cadastrar Servidor</Dialog.DialogTitle>
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
                        <label htmlFor="matricula" className='form__dialog__label'>Matrícula</label>
                        <input
                            type="text"
                            name="matricula"
                            id="matricula"
                            title={'\n\n123.456-7 A'}
                            placeholder='123.456-7 A'
                            className='form__dialog__input'
                            value={formData.matricula}
                            onChange={handleInputChange}
                            maxLength={11}
                        />
                    </div>
                    <div>
                        <label htmlFor="data_nascimento" className='form__dialog__label'>Data do Nascimento*</label>
                        <input
                            type="date"
                            name="data_nascimento"
                            id="data_nascimento"
                            className='form__dialog__input'
                            value={formData.data_nascimento}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="estado_civil" className='form__dialog__label'>Estado Civil*</label>
                        <select
                            name="estado_civil"
                            id="estado_civil"
                            className='form__dialog__input'
                            value={formData.estado_civil}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione</option>
                            <option value="solteiro">SOLTEIRO</option>
                            <option value="casado">CASADO</option>
                            <option value="divorcido">DIVORCIADO</option>
                            <option value="viuvo">VIUVO</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nacionalidade" className='form__dialog__label'>Nacionalidade*</label>
                        <input
                            type="text"
                            name="nacionalidade"
                            id="nacionalidade"
                            className='form__dialog__input'
                            placeholder='Brasileira'
                            value={formData.nacionalidade}
                            onChange={handleInputChange}
                            maxLength={40}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="naturalidade" className='form__dialog__label'>Naturalidade*</label>
                        <input
                            type="text"
                            name="naturalidade"
                            id="naturalidade"
                            pattern='^[A-Za-zÀ-ÿ\s]+\/[A-Za-z]{2}$'
                            title={'\n\nMato Grosso do Sul/MS'}
                            placeholder='Mato Grosso do Sul/MS'
                            className='form__dialog__input'
                            value={formData.naturalidade}
                            onChange={handleInputChange}
                            maxLength={40}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cpf" className='form__dialog__label'>CPF*</label>
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            pattern="^\d{11}$"
                            placeholder='123.456.789-10'
                            title={'\n\n123.456.789-10'}
                            className='form__dialog__input'
                            value={formData.cpf}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="identidade" className='form__dialog__label'>Identidade*</label>
                        <input
                            type="text"
                            name="identidade"
                            id="identidade"
                            
                            placeholder='1234567-8'
                            title={'\n\n1234567-8'}
                            className='form__dialog__input'
                            value={formData.identidade}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="pis" className='form__dialog__label'>PIS*</label>
                        <input
                            type="text"
                            name="pis"
                            id="pis"
                            pattern='^\d{3}\.\d{5}\.\d{2}-\d{1}$'
                            placeholder='123.45678.90-1'
                            title={'\n\n123.45678.90-1'}
                            className='form__dialog__input'
                            value={formData.pis}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sexo" className='form__dialog__label'>Sexo*</label>
                        <select
                            name="sexo"
                            id="sexo"
                            className='form__dialog__input'
                            value={formData.sexo}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="MASCULINO">MASCULINO</option>
                            <option value="FEMININO">FEMININO</option>
                            <option value="OUTRO">OUTRO</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="titulo_eleitor" className='form__dialog__label'>Título de Eleitor*</label>
                        <input
                            type="text"
                            name="titulo_eleitor"
                            id="titulo_eleitor"
                            pattern='^\d{12}$'
                            placeholder='123456789012'
                            className='form__dialog__input'
                            value={formData.titulo_eleitor}
                            onChange={handleInputChange}
                            maxLength={12}
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
                            value={formData.setor}
                            onChange={handleInputChange}
                            maxLength={70}
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
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="08:00">08:00</option>
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
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="14:00">14:00</option>
                                <option value="17:00">17:00</option>
                            </select>

                        </div>
                    </div>
                    <div>
                        <label htmlFor="data_admissao" className='form__dialog__label'>Data de Admissão*</label>
                        <input
                            type="date"
                            name="data_admissao"
                            id="data_admissao"
                            className='form__dialog__input'
                            value={formData.data_admissao}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='container__button__acoes__servidor'>
                        <Dialog.Close asChild>
                            <button type="button" className='container__button__cancelar__servidor'>Cancelar</button>
                        </Dialog.Close>
                        <button type="submit" className='container__button__cadastrar__servidor'>
                            Cadastrar Servidor
                        </button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}