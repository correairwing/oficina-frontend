"use client"

import { useState, useEffect } from 'react';
import axios from '../../../axios'; // Importando o Axios configurado

const ClienteDetalhes = ({ params }) => {
    const { id } = params;
    const [cliente, setCliente] = useState(null);
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        if (id) {
            fetchCliente();
            fetchServicos();
        }
    }, [id]);

    const fetchCliente = async () => {
        try {
            const response = await axios.get(`/cliente/${id}`); // Ajuste a URL conforme necessário
            setCliente(response.data);
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
        }
    };

    const fetchServicos = async () => {
        try {
            const response = await axios.get(`/servico/cliente/${id}`); // Ajuste a URL conforme necessário
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    };

    if (!cliente) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalhes do Cliente</h1>
            <div className="mb-4">
                <p><strong>Nome:</strong> {cliente.nome}</p>
                <p><strong>CPF:</strong> {cliente.cpf}</p>
                <p><strong>Telefone:</strong> {cliente.telefone}</p>
            </div>
            <h2 className="text-xl font-bold mb-4">Histórico de Serviços</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Descrição</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Valor</th>
                        <th className="py-2">Data de Criação</th>
                    </tr>
                </thead>
                <tbody>
                    {servicos.map(servico => (
                        <tr key={servico.id}>
                            <td className="py-2">{servico.descricao}</td>
                            <td className="py-2">{servico.status}</td>
                            <td className="py-2">{servico.valor}</td>
                            <td className="py-2">{new Date(servico.dataCriacao).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClienteDetalhes;
