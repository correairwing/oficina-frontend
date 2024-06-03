'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ServicoDetalhes = ({ params }) => {
    const { id } = params;
    const [servico, setServico] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [valor, setValor] = useState('');
    const [clienteId, setClienteId] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchServico();
        fetchClientes();
    }, []);

    const fetchServico = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/servicos/${id}`);
            setServico(response.data);
            setDescricao(response.data.descricao);
            setStatus(response.data.status);
            setValor(response.data.valor);
            setClienteId(response.data.cliente.id);
        } catch (error) {
            console.error('Erro ao buscar serviço:', error);
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

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/servicos/${id}`, {
                descricao,
                status,
                valor: parseFloat(valor),
                cliente: { id: parseInt(clienteId, 10) }
            });
            setIsEditing(false);
            fetchServico();
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
        }
    };

    const handleDelete = async () => {
        if (confirm('Tem certeza que deseja excluir este serviço?')) {
            try {
                await axios.delete(`http://localhost:8080/api/servicos/${id}`);
                router.push('/servicos');
            } catch (error) {
                console.error('Erro ao excluir serviço:', error);
            }
        }
    };

    if (!servico) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalhes do Serviço</h1>
            {isEditing ? (
                <div className="mb-4">
                    <div className="mb-2">
                        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                        <input
                            type="text"
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="clienteId" className="block text-sm font-medium text-gray-700">Cliente</label>
                        <select
                            id="clienteId"
                            value={clienteId}
                            onChange={(e) => setClienteId(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Salvar
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>
            ) : (
                <div className="mb-4">
                    <p><strong>Descrição:</strong> {servico.descricao}</p>
                    <p><strong>Status:</strong> {servico.status}</p>
                    <p><strong>Valor:</strong> {servico.valor}</p>
                    <p><strong>Cliente:</strong> {servico.cliente.nome}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Excluir
                    </button>
                </div>
            )}
        </div>
    );
};

export default ServicoDetalhes;
