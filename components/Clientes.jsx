"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cliente/');
                setClientes(response.data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };
    
        fetchClientes();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b bg-gray-200">ID</th>
                        <th className="py-2 px-4 border-b bg-gray-200">Nome</th>
                        <th className="py-2 px-4 border-b bg-gray-200">Endereço</th>
                        <th className="py-2 px-4 border-b bg-gray-200">CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{cliente.id}</td>
                            <td className="py-2 px-4 border-b">{cliente.nome}</td>
                            <td className="py-2 px-4 border-b">{cliente.endereco}</td>
                            <td className="py-2 px-4 border-b">{cliente.cpf}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;
