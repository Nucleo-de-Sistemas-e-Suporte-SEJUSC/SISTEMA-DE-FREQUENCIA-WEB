import './style.css'
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from 'sonner';
import { useState } from 'react'; // Importe o useState
import { api } from '../../../api/axios';

export function FormCadastrarFuncionarios() {

    // Estado para cada campo do formulário
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        mudancaDeNome: '',
        matricula: '',
        condicaoJuridica: '',
        dataDoNascimento: '',
        estadoCivil: '',
        naturalidade: '',
        nacionalidade: '',
        carteiraProfissional: '',
        servicoMilitar: '',
        cpf: '',
        identidade: '',
        pisPasep: '',
        carteiraSaude: '',
        sexo: '',
        tituloEleitor: '',
        nomeMae: '',
        nomePai: '',
        setor: '',
        horarioEntrada: '',
        horarioSaida: '',
        feriasinicio: '',
        feriasfinal: '',
        funcao: '',
        cargo: '',
        dataNomeacao: ''
    });


    // Função para atualizar o estado quando os inputs mudam
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/servidores", {
                nome: formData.nomeCompleto,
                setor: formData.setor.toUpperCase(),
                entrada: formData.horarioEntrada,
                saida: formData.horarioSaida,
                feriasinicio: formData.feriasinicio,
                feriasfinal: formData.feriasfinal,
                funcao: formData.funcao,
                matricula: formData.matricula,
                horario: `${formData.horarioEntrada}-${formData.horarioSaida}`,
                cargo: formData.cargo,
                data_nascimento: formData.dataDoNascimento,
                sexo: formData.sexo,
                estado_civil: formData.estadoCivil,
                identidade: formData.identidade,
                nacionalidade: formData.nacionalidade,
                titulo_eleitor: formData.tituloEleitor,
                cpf: formData.tituloEleitor,
                pis: formData.pisPasep
            })
    
            const data = await response.data

            toast.success("Cadastrado", {
                description: "Servidor cadastrado com sucesso!",
                duration: 3000
            });
            
        } catch (error) {
            toast.error(error.status, {
                description: error.message,
                duration: 3000
            });
        }
        /*
        setFormData({
            nomeCompleto: '',
            mudancaDeNome: '',
            matricula: '',
            condicaoJuridica: '',
            dataDoNascimento: '',
            estadoCivil: '',
            naturalidade: '',
            nacionalidade: '',
            carteiraProfissional: '',
            servicoMilitar: '',
            cpf: '',
            identidade: '',
            pisPasep: '',
            carteiraSaude: '',
            sexo: '',
            tituloEleitor: '',
            nomeMae: '',
            nomePai: '',
            setor: '',
            horarioEntrada: '',
            horarioSaida: '',
            funcao: '',
            cargo: '',
            dataNomeacao: ''
        });
        */
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='DialogOverlay' />
            <Dialog.Content className='DialogContent'>
                <form onSubmit={handleSubmit} className='form__dialog'>
                    <div>
                        <label htmlFor="nome-completo" className='form__dialog__label'>Nome Completo</label>
                        <input
                            type="text"
                            name="nomeCompleto"
                            id="nome-completo"
                            className='form__dialog__input'
                            value={formData.nomeCompleto}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="mudanca-de-nome" className='form__dialog__label'>Mudança de Nome</label>
                        <input
                            type="text"
                            name="mudancaDeNome"
                            id="mudanca-de-nome"
                            className='form__dialog__input'
                            value={formData.mudancaDeNome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="matricula" className='form__dialog__label'>Matrícula</label>
                        <input
                            type="text"
                            name="matricula"
                            id="matricula"
                            className='form__dialog__input'
                            value={formData.matricula}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="condicao-juridica" className='form__dialog__label'>Condicao Jurídica</label>
                        <select
                            name="condicaoJuridica"
                            id="condicao-juridica"
                            className='form__dialog__input'
                            value={formData.condicaoJuridica}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione</option>
                            <option value="regular">regular</option>
                            <option value="irregular">positivo</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="data-do-nascimento" className='form__dialog__label'>Data do Nascimento</label>
                        <input
                            type="date"
                            name="dataDoNascimento"
                            id="data-do-nascimento"
                            className='form__dialog__input'
                            value={formData.dataDoNascimento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="estado-civil" className='form__dialog__label'>Estado Civil</label>
                        <select
                            name="estadoCivil"
                            id="estado-civil"
                            className='form__dialog__input'
                            value={formData.estadoCivil}
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
                        <label htmlFor="naturalidade" className='form__dialog__label'>Naturalidade</label>
                        <input
                            type="text"
                            name="naturalidade"
                            id="naturalidade"
                            className='form__dialog__input'
                            value={formData.naturalidade}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="nacionalidade" className='form__dialog__label'>Nacionalidade</label>
                        <input
                            type="text"
                            name="nacionalidade"
                            id="nacionalidade"
                            className='form__dialog__input'
                            value={formData.nacionalidade}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="carteira-profissional" className='form__dialog__label'>Carteira Profissional</label>
                        <input
                            type="text"
                            name="carteiraProfissional"
                            id="carteira-profissional"
                            className='form__dialog__input'
                            value={formData.carteiraProfissional}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="servico-militar" className='form__dialog__label'>Serviço Militar</label>
                        <input
                            type="text"
                            name="servicoMilitar"
                            id="servico-militar"
                            className='form__dialog__input'
                            value={formData.servicoMilitar}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="cpf" className='form__dialog__label'>CPF</label>
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            className='form__dialog__input'
                            value={formData.cpf}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="identidade" className='form__dialog__label'>Identidade (RG)</label>
                        <input
                            type="text"
                            name="identidade"
                            id="identidade"
                            className='form__dialog__input'
                            value={formData.identidade}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="pis-pasep" className='form__dialog__label'>PIS/PASEP</label>
                        <input
                            type="text"
                            name="pisPasep"
                            id="pis-pasep"
                            className='form__dialog__input'
                            value={formData.pisPasep}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="carteira-saude" className='form__dialog__label'>Carteira de Saúde</label>
                        <input
                            type="text"
                            name="carteiraSaude"
                            id="carteira-saude"
                            className='form__dialog__input'
                            value={formData.carteiraSaude}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="sexo" className='form__dialog__label'>Sexo</label>
                        <select
                            name="sexo"
                            id="sexo"
                            className='form__dialog__input'
                            value={formData.sexo}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione</option>
                            <option value="masculino">MASCULINO</option>
                            <option value="feminino">FEMININO</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="titulo-eleitor" className='form__dialog__label'>Título de Eleitor</label>
                        <input
                            type="text"
                            name="tituloEleitor"
                            id="titulo-eleitor"
                            className='form__dialog__input'
                            value={formData.tituloEleitor}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="nome-mae" className='form__dialog__label'>Nome da Mãe</label>
                        <input
                            type="text"
                            name="nomeMae"
                            id="nome-mae"
                            className='form__dialog__input'
                            value={formData.nomeMae}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="nome-pai" className='form__dialog__label'>Nome do Pai</label>
                        <input
                            type="text"
                            name="nomePai"
                            id="nome-pai"
                            className='form__dialog__input'
                            value={formData.nomePai}
                            onChange={handleInputChange}
                        />
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
                        <label htmlFor="setor" className='form__dialog__label'>Setor</label>
                        <input
                            type="text"
                            name="setor"
                            id="setor"
                            className='form__dialog__input'
                            value={formData.setor}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='container__inputs__horario'>
                        <div>
                            <label htmlFor="horario-entrada" className='form__dialog__label'>Horário Entrada</label>
                             <select
                            name="horarioEntrada"
                            id="horario-entrada"
                            className='form__dialog__input'
                            value={formData.horarioEntrada}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione</option>
                            <option value="08:00">08:00</option>
                            <option value="11:00">11:00</option>
                        </select>
                        </div>
                        <div>
                            <label htmlFor="horario-saida" className='form__dialog__label'>Horário Saída</label>
                            <select
                                name="horarioSaida"
                                id="horario-Saida"
                                className='form__dialog__input'
                                value={formData.horarioSaida}
                                onChange={handleInputChange}

                            >
                            <option value="">Selecione</option>
                            <option value="14:00">14:00</option>
                            <option value="17:00">17:00</option>
                        </select>

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
                        <button type="submit" className='container__button__cadastrar__servidor'>
                            Cadastrar Servidor
                        </button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}