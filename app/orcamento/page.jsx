'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Orcamento = () => {
    const router = useRouter();
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [veiculo, setVeiculo] = useState('');
    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [servicos, setServicos] = useState([
        { descricao: '', unidade: '', valor: '', total: '' }
    ]);
    const [totalBruto, setTotalBruto] = useState(0);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cliente');
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    const handleClienteChange = (e) => {
        const clienteId = e.target.value;
        const cliente = clientes.find(c => c.id === parseInt(clienteId));
        setClienteSelecionado(cliente);
        setVeiculo(cliente.veiculo || '');
        setPlaca(cliente.placa || '');
        setMarca(cliente.marca || '');
        setAno(cliente.ano || '');
    };

    const handleAddServico = () => {
        setServicos([...servicos, { descricao: '', unidade: '', valor: '', total: '' }]);
    };

    const handleChangeServico = (index, field, value) => {
        const newServicos = servicos.slice();
        newServicos[index][field] = value;

        if (field === 'valor' || field === 'unidade') {
            const unidade = parseFloat(newServicos[index].unidade) || 0;
            const valor = parseFloat(newServicos[index].valor) || 0;
            newServicos[index].total = (unidade * valor).toFixed(2);
        }

        setServicos(newServicos);
        updateTotalBruto(newServicos);
    };

    const updateTotalBruto = (servicos) => {
        const total = servicos.reduce((acc, servico) => acc + parseFloat(servico.total || 0), 0);
        setTotalBruto(total.toFixed(2));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orcamento = {
            cliente: clienteSelecionado,
            veiculo,
            placa,
            marca,
            ano,
            servicos
        };
        try {
            await axios.post('http://localhost:8080/api/orcamentos', orcamento);
            router.push('/');
        } catch (error) {
            console.error('Erro ao cadastrar orçamento:', error);
        }
    };

    return (
        <div className="p-8 font-sans leading-relaxed">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">ORÇAMENTO</h1>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">MANAUARA DIESEL</h2>
                <p>TEL: (92) 981757896</p>
                <p>(92) 99183-0224</p>
                <p>Av. Atlântica, n° 28</p>
                <p>Raiz</p>
                <p>CEP 69068-020</p>
                <p>Manaus AM</p>
                <p>ammecanica9l@gmail.com</p>
                <p>CNPJ: 44.230.807/0001-96</p>
            </div>
            <div className="mb-8">
                <h3 className="text-xl font-semibold">Cliente:</h3>
                <select
                    value={clienteSelecionado ? clienteSelecionado.id : ''}
                    onChange={handleClienteChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                >
                    <option value="">Selecione um Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
                <p>Fone: {clienteSelecionado ? clienteSelecionado.telefone : ''}</p>
                <p>Veículo:</p>
                <input
                    type="text"
                    value={veiculo}
                    onChange={(e) => setVeiculo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                    placeholder="Veículo"
                />
                <p>Placa:</p>
                <input
                    type="text"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                    placeholder="Placa"
                />
                <p>Marca:</p>
                <input
                    type="text"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                    placeholder="Marca"
                />
                <p>Ano:</p>
                <input
                    type="text"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                    placeholder="Ano"
                />
            </div>
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">SERVIÇOS/PEÇAS:</h3>
                <table className="w-full border-collapse border border-gray-400 mb-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 p-2">ITEM</th>
                            <th className="border border-gray-400 p-2">DESCRIÇÃO</th>
                            <th className="border border-gray-400 p-2">UNI</th>
                            <th className="border border-gray-400 p-2">VALOR</th>
                            <th className="border border-gray-400 p-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map((servico, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 p-2">{index + 1}</td>
                                <td className="border border-gray-400 p-2">
                                    <input
                                        type="text"
                                        value={servico.descricao}
                                        onChange={(e) => handleChangeServico(index, 'descricao', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                                <td className="border border-gray-400 p-2">
                                    <input
                                        type="number"
                                        value={servico.unidade}
                                        onChange={(e) => handleChangeServico(index, 'unidade', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                                <td className="border border-gray-400 p-2">
                                    <input
                                        type="number"
                                        value={servico.valor}
                                        onChange={(e) => handleChangeServico(index, 'valor', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                                <td className="border border-gray-400 p-2">
                                    <input
                                        type="number"
                                        value={servico.total}
                                        onChange={(e) => handleChangeServico(index, 'total', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={handleAddServico}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Adicionar Serviço/Peça
                </button>
                <p className="mt-4">OBS: PAGAMENTO DE 50% NA AUTORIZAÇÃO DO SERVIÇO E O RESTANTE NO ATO DA ENTREGA.</p>
                <h3 className="text-xl font-semibold mt-4">SERVIÇO TOTAL BRUTO: R${totalBruto}</h3>
                <h3 className="text-xl font-semibold">TOTAL LIQUIDO: R${totalBruto}</h3>
            </div>
            <div className="mt-8">
                <p className="border-t border-gray-400 pt-4">_______________________________________</p>
                <p>Am SERVIÇOS DE MECÂNICA DE VEÍCULOS AUTOMOTORES LTDA-ME</p>
                <p>Manaus, {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                Salvar Orçamento
            </button>
        </div>
    );
};

export default Orcamento;
