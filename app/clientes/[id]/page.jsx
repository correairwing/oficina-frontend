'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const ClienteDetalhes = ({ params }) => {
    const { id } = params;
    const [cliente, setCliente] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchCliente();
        fetchServicos();
    }, []);

    const fetchCliente = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cliente/${id}`);
            setCliente(response.data);
            setNome(response.data.nome);
            setCpf(response.data.cpf);
            setTelefone(response.data.telefone);
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
        }
    };

    const fetchServicos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/servicos/cliente/${id}`);
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços do cliente:', error);
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/cliente/${id}`, {
                nome,
                cpf,
                telefone
            });
            setIsEditing(false);
            fetchCliente();
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
    };

    const handleDelete = async () => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                await axios.delete(`http://localhost:8080/api/cliente/${id}`);
                router.push('/clientes');
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
            }
        }
    };

    if (!cliente) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalhes do Cliente</h1>
            {isEditing ? (
                <div className="mb-4">
                    <div className="mb-2">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input
                            type="text"
                            id="telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
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
                    <p><strong>Nome:</strong> {cliente.nome}</p>
                    <p><strong>CPF:</strong> {cliente.cpf}</p>
                    <p><strong>Telefone:</strong> {cliente.telefone}</p>
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
            <h2 className="text-xl font-bold mb-4">Serviços</h2>
            <ul>
                {servicos.map(servico => (
                    <li key={servico.id} className="mb-2 text-blue-500 underline" >
                        <Link href={`/servicos/${servico.id}`}>
                            {servico.descricao}
                        </Link>
                        <p><strong>Status:</strong> {servico.status}</p>
                        <p><strong>Valor:</strong> {servico.valor}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteDetalhes;
