import './style.css'
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from 'sonner';
import { useState } from 'react'; // Importe o useState
import { api } from '../../../api/axios';

export function FormCadastrarFuncionarios() {

    // Estado para cada campo do formulário
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        matricula: '',
        dataDoNascimento: '',
        estadoCivil: '',
        nacionalidade: '',
        naturalidade: '',
        servicoMilitar: '',
        cpf: '',
        rg: '',
        pisPasep: '',
        sexo: '',
        tituloEleitor: '',
        cargo: '',
        setor: '',
        horarioEntrada: '',
        horarioSaida: '',
        dataAdmissao: '',
        condicaoJuridica: '',
        carteiraProfissional: '',
        carteiraSaude: '',
        nomeMae: '',
        nomePai: '',
        feriasinicio: '',
        feriasfinal: '',
    });

    console.log(typeof formData.dataAdmissao)


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
            const response = await api.post("/criar/servidores", {
                nome: formData.nomeCompleto.toUpperCase(),
                matricula: formData.matricula,
                data_nascimento: formData.dataDoNascimento,
                estado_civil: formData.estadoCivil.toUpperCase(),
                nacionalidade: formData.nacionalidade.toUpperCase(),
                naturalidade: formData.naturalidade.toUpperCase(),
                servicoMilitar: formData.servicoMilitar,
                cpf: formData.cpf,
                rg: formData.identidade,
                pis: formData.pisPasep,
                sexo: formData.sexo.toUpperCase(),
                titulo_eleitor: formData.tituloEleitor,
                cargo: formData.cargo.toUpperCase(),
                setor: formData.setor.toUpperCase(),
                horario: `${formData.horarioEntrada}-${formData.horarioSaida}`,
                entrada: formData.horarioEntrada,
                saida: formData.horarioSaida,
                dataAdmissao: formData.dataAdmissao
                //feriasinicio: formData.feriasinicio,
                //feriasfinal: formData.feriasfinal,
            });

            toast.success("Cadastrado", {
                description: "Servidor cadastrado com sucesso!",
                duration: 3000
            });

            // Limpa o formulário após envio bem-sucedido
            setFormData({
                nomeCompleto: '',
                matricula: '',
                dataDoNascimento: '',
                estadoCivil: '',
                nacionalidade: '',
                naturalidade: '',
                servicoMilitar: '',
                cpf: '',
                rg: '',
                pisPasep: '',
                sexo: '',
                tituloEleitor: '',
                cargo: '',
                condicaoJuridica: '',
                carteiraProfissional: '',
                carteiraSaude: '',
                nomeMae: '',
                nomePai: '',
                setor: '',
                horarioEntrada: '',
                horarioSaida: '',
                feriasinicio: '',
                feriasfinal: '',
                dataAdmissao: ''
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
                <form onSubmit={handleSubmit} className='form__dialog'>
                    <div>
                        <label htmlFor="nome-completo" className='form__dialog__label'>Nome Completo*</label>
                        <input
                            type="text"
                            name="nomeCompleto"
                            id="nome-completo"
                            placeholder='José da Silva Vasconelos'
                            className='form__dialog__input'
                            value={formData.nomeCompleto}
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
                            pattern='^\d{3}\.\d{3}-\d\s[A-Z]$'
                            placeholder='123.456-7 A'
                            className='form__dialog__input'
                            value={formData.matricula}
                            onChange={handleInputChange}
                            maxLength={11}
                        />
                    </div>
                    <div>
                        <label htmlFor="data-do-nascimento" className='form__dialog__label'>Data do Nascimento*</label>
                        <input
                            type="date"
                            name="dataDoNascimento"
                            id="data-do-nascimento"
                            className='form__dialog__input'
                            value={formData.dataDoNascimento}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="estado-civil" className='form__dialog__label'>Estado Civil*</label>
                        <select
                            name="estadoCivil"
                            id="estado-civil"
                            className='form__dialog__input'
                            value={formData.estadoCivil}
                            onChange={handleInputChange}
                            required
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
                        <label htmlFor="servico-militar" className='form__dialog__label'>Serviço Militar</label>
                        <input
                            type="text"
                            name="servicoMilitar"
                            id="servico-militar"
                            pattern='^\d{3}\.\d{3}\.\d{3}-\d{1}$'
                            placeholder='123.456.789-0'
                            title={'\n\n123.456.789-0'}
                            className='form__dialog__input'
                            value={formData.servicoMilitar}
                            onChange={handleInputChange}
                            maxLength={15}
                        />
                    </div>
                    <div>
                        <label htmlFor="cpf" className='form__dialog__label'>CPF*</label>
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            pattern='^\d{3}\.\d{3}\.\d{3}-\d{2}$'
                            placeholder='123.456.789-10'
                            title={'\n\n123.456.789-10'}
                            className='form__dialog__input'
                            value={formData.cpf}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="rg" className='form__dialog__label'>RG*</label>
                        <input
                            type="text"
                            name="rg"
                            id="rg"
                            pattern='^\d{7}-\d{1}$'
                            placeholder='1234567-8'
                            title={'\n\n1234567-8'}
                            className='form__dialog__input'
                            value={formData.rg}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="pis-pasep" className='form__dialog__label'>PIS/PASEP</label>
                        <input
                            type="text"
                            name="pisPasep"
                            id="pis-pasep"
                            pattern='^\d{3}\.\d{5}\.\d{2}-\d{1}$'
                            placeholder='123.45678.90-1'
                            title={'\n\n123.45678.90-1'}
                            className='form__dialog__input'
                            value={formData.pisPasep}
                            onChange={handleInputChange}
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
                        <label htmlFor="titulo-eleitor" className='form__dialog__label'>Título de Eleitor*</label>
                        <input
                            type="text"
                            name="tituloEleitor"
                            id="titulo-eleitor"
                            pattern='^\d{12}$'
                            placeholder='123456789012'
                            className='form__dialog__input'
                            value={formData.tituloEleitor}
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
                        <label htmlFor="dataNomeacao" className='form__dialog__label'>Data de Admissão*</label>
                        <input
                            type="date"
                            name="dataAdmissao"
                            id="data-nomeacao"
                            className='form__dialog__input'
                            value={formData.dataAdmissao}
                            onChange={handleInputChange}
                            required
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