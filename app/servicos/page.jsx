"use client"

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ServicosPage = () => {
    const [servicos, setServicos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('ORCAMENTO');
    const [valor, setValor] = useState('');
    const [clienteId, setClienteId] = useState('');

    useEffect(() => {
        fetchServicos();
        fetchClientes();
    }, []);

    const fetchServicos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/servicos/');
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    };

    const fetchClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cliente/');
            setClientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    const handleCadastro = async (event) => {
        event.preventDefault();
        const parsedValor = parseFloat(valor);
        const parsedClienteId = parseInt(clienteId, 10);

        try {
            console.log("Enviando dados do serviço:", { descricao, status, valor: parsedValor, clienteId: parsedClienteId });
            const response = await axios.post('http://localhost:8080/api/servicos/', {
                descricao,
                status,
                valor: parsedValor,
                cliente: { id: parsedClienteId }
            });
            setServicos([...servicos, response.data]);
            setDescricao('');
            setStatus('ORCAMENTO');
            setValor('');
            setClienteId('');
        } catch (error) {
            console.error('Erro ao cadastrar serviço:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Serviços</h1>
            <form onSubmit={handleCadastro} className="mb-4">
                <div className="mb-2">
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <input
                        type="text"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="ORCAMENTO">Orçamento</option>
                        <option value="ANDAMENTO">Andamento</option>
                        <option value="FINALIZADO">Finalizado</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor</label>
                    <input
                        type="number"
                        id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="clienteId" className="block text-sm font-medium text-gray-700">Cliente</label>
                    <select
                        id="clienteId"
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    Cadastrar Serviço
                </button>
            </form>
            <ul>
                {servicos.map(servico => (
                    <li key={servico.id} className="mb-2">
                        <div className="p-4 border rounded-md shadow-sm">
                            <p><strong>Descrição:</strong> {servico.descricao}</p>
                            <p><strong>Status:</strong> {servico.status}</p>
                            <p><strong>Valor:</strong> {servico.valor}</p>
                            <p><strong>Cliente:</strong> {servico.cliente.nome}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServicosPage;

