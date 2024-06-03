"use client"

import { useState, useEffect } from 'react';
import axios from '../../axios'; // Certifique-se de que o Axios está configurado corretamente

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [searchName, setSearchName] = useState("");

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
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Nome</th>
                        <th className="py-2">CPF</th>
                        <th className="py-2">Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td className="py-2">{cliente.nome}</td>
                            <td className="py-2">{cliente.cpf}</td>
                            <td className="py-2">{cliente.telefone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;
