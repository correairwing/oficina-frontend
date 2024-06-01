"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

const ServicoForm = ({ atualizarLista }) => {
    const [clientes, setClientes] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('ORCAMENTO');

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cliente/');
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/servico/', {
                clienteId,
                descricao,
                status
            });
            alert('Serviço criado com sucesso!');
            setClienteId('');
            setDescricao('');
            setStatus('ORCAMENTO');
            atualizarLista();
        } catch (error) {
            console.error('Erro ao criar serviço:', error);
            alert('Erro ao criar serviço');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cliente">
                    Cliente
                </label>
                <select
                    id="cliente"
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="">Selecione um cliente</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricao">
                    Descrição do Serviço
                </label>
                <input
                    type="text"
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="ORCAMENTO">Orçamento</option>
                    <option value="ANDAMENTO">Andamento</option>
                    <option value="FINALIZADO">Finalizado</option>
                </select>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Criar Serviço
                </button>
            </div>
        </form>
    );
};

export default ServicoForm;
