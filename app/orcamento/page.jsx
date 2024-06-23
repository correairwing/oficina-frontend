'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const OrcamentoPage = () => {
    const router = useRouter();
    const [clientes, setClientes] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [veiculoId, setVeiculoId] = useState('');
    const [servicos, setServicos] = useState([{ descricao: '', status: 'ORCAMENTO', valor: 0 }]);
    const [totalBruto, setTotalBruto] = useState(0);
    const [totalLiquido, setTotalLiquido] = useState(0);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('/cliente');
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        const fetchVeiculos = async () => {
            try {
                const response = await axios.get('/api/veiculos');
                setVeiculos(response.data);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
            }
        };

        fetchClientes();
        fetchVeiculos();
    }, []);

    const handleServicoChange = (index, key, value) => {
        const newServicos = [...servicos];
        newServicos[index][key] = value;
        setServicos(newServicos);
        calculateTotals(newServicos);
    };

    const calculateTotals = (servicos) => {
        const totalBruto = servicos.reduce((acc, servico) => acc + parseFloat(servico.valor || 0), 0);
        setTotalBruto(totalBruto);
        setTotalLiquido(totalBruto); // Ajuste conforme necessário
    };

    const addServico = () => {
        setServicos([...servicos, { descricao: '', status: 'ORCAMENTO', valor: 0 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orcamento = {
            cliente: { id: clienteId },
            veiculo: { id: veiculoId },
            servicos: servicos,
            totalBruto: totalBruto,
            totalLiquido: totalLiquido
        };

        try {
            const response = await axios.post('/api/orcamentos', orcamento);
            console.log('Orçamento cadastrado com sucesso:', response.data);
            router.push('/orcamentos');
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
            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold">Cliente:</h3>
                    <select
                        value={clienteId}
                        onChange={(e) => setClienteId(e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="">Selecione um Cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold">Veículo:</h3>
                    <select
                        value={veiculoId}
                        onChange={(e) => setVeiculoId(e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="">Selecione um Veículo</option>
                        {veiculos.map(veiculo => (
                            <option key={veiculo.id} value={veiculo.id}>
                                {veiculo.modelo} - {veiculo.placa}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">SERVIÇOS/PEÇAS:</h3>
                    <table className="w-full border-collapse border border-gray-400">
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
                                            onChange={(e) => handleServicoChange(index, 'descricao', e.target.value)}
                                            className="border p-2 w-full"
                                        />
                                    </td>
                                    <td className="border border-gray-400 p-2">1</td>
                                    <td className="border border-gray-400 p-2">
                                        <input
                                            type="number"
                                            value={servico.valor}
                                            onChange={(e) => handleServicoChange(index, 'valor', e.target.value)}
                                            className="border p-2 w-full"
                                        />
                                    </td>
                                    <td className="border border-gray-400 p-2">
                                        {parseFloat(servico.valor).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        type="button"
                        onClick={addServico}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Adicionar Serviço/Peça
                    </button>
                </div>
                <div className="mb-8">
                    <p className="mt-4">OBS: PAGAMENTO DE 50% NA AUTORIZAÇÃO DO SERVIÇO E O RESTANTE NO ATO DA ENTREGA.</p>
                    <h3 className="text-xl font-semibold mt-4">SERVIÇO TOTAL BRUTO: R${totalBruto.toFixed(2)}</h3>
                    <h3 className="text-xl font-semibold">TOTAL LIQUIDO: R${totalLiquido.toFixed(2)}</h3>
                </div>
                <div className="mt-8">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        Cadastrar Orçamento
                    </button>
                </div>
            </form>
        </div>
    );
};

export default dynamic(() => Promise.resolve(OrcamentoPage), { ssr: false });
