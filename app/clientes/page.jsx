"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import ClienteForm from '../../components/ClienteForm';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [clienteAtual, setClienteAtual] = useState(null);

    const fetchClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cliente/');
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/cliente/${id}`);
            alert('Cliente excluído com sucesso!');
            fetchClientes();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            alert('Erro ao excluir cliente');
        }
    };

    const handleUpdate = (cliente) => {
        setClienteAtual(cliente);
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
                <ClienteForm clienteAtual={clienteAtual} atualizarLista={fetchClientes} />
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b bg-gray-200">ID</th>
                            <th className="py-2 px-4 border-b bg-gray-200">Nome</th>
                            <th className="py-2 px-4 border-b bg-gray-200">Endereço</th>
                            <th className="py-2 px-4 border-b bg-gray-200">CPF</th>
                            <th className="py-2 px-4 border-b bg-gray-200">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{cliente.id}</td>
                                <td className="py-2 px-4 border-b">{cliente.nome}</td>
                                <td className="py-2 px-4 border-b">{cliente.endereco}</td>
                                <td className="py-2 px-4 border-b">{cliente.cpf}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleUpdate(cliente)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                    >
                                        Atualizar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cliente.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Clientes;
