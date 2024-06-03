"use client"

import { useState, useEffect } from 'react';
import axios from '../../axios'; // Certifique-se de que o Axios está configurado corretamente
import Link from 'next/link';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [clienteEdit, setClienteEdit] = useState(null);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await axios.get('/cliente/'); // Ajuste a URL conforme necessário
            setClientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    const handleSearch = async () => {
        if (searchName.trim() === "") {
            fetchClientes();
        } else {
            try {
                const response = await axios.get(`/cliente/search?name=${searchName}`);
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes pelo nome:', error);
            }
        }
    };

    const handleCadastro = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/cliente/', { nome, cpf, telefone });
            setClientes([...clientes, response.data]);
            setNome("");
            setCpf("");
            setTelefone("");
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir este cliente?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/cliente/${id}`);
            setClientes(clientes.filter(cliente => cliente.id !== id));
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    };

    const handleEdit = (cliente) => {
        setClienteEdit(cliente);
        setNome(cliente.nome);
        setCpf(cliente.cpf);
        setTelefone(cliente.telefone);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const confirmUpdate = window.confirm("Você tem certeza que deseja atualizar este cliente?");
        if (!confirmUpdate) return;

        try {
            const response = await axios.put(`/cliente/`, { ...clienteEdit, nome, cpf, telefone });
            setClientes(clientes.map(cliente => cliente.id === clienteEdit.id ? response.data : cliente));
            setClienteEdit(null);
            setNome("");
            setCpf("");
            setTelefone("");
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Buscar por nome"
                    className="border p-2"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">Buscar</button>
            </div>

            <h2 className="text-xl font-bold mb-4">Cadastrar Novo Cliente</h2>
            <form onSubmit={clienteEdit ? handleUpdate : handleCadastro} className="mb-4">
                <div className="mb-2">
                    <label className="block text-gray-700">Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">CPF</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Telefone</label>
                    <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white p-2">
                    {clienteEdit ? "Atualizar" : "Cadastrar"}
                </button>
                {clienteEdit && (
                    <button onClick={() => setClienteEdit(null)} className="bg-red-500 text-white p-2 ml-2">
                        Cancelar
                    </button>
                )}
            </form>

            <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Nome</th>
                        <th className="py-2">CPF</th>
                        <th className="py-2">Telefone</th>
                        <th className="py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td className="py-2">
                                <Link href={`/clientes/${cliente.id}`}>
                                    {cliente.nome}
                                </Link>
                            </td>
                            <td className="py-2">{cliente.cpf}</td>
                            <td className="py-2">{cliente.telefone}</td>
                            <td className="py-2">
                                <button
                                    onClick={() => handleEdit(cliente)}
                                    className="bg-yellow-500 text-white p-2 mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(cliente.id)}
                                    className="bg-red-500 text-white p-2"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;


