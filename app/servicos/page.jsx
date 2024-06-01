"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import ServicoForm from '../../components/ServicoForm';

const Servicos = () => {
    const [servicos, setServicos] = useState([]);

    const fetchServicos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/servico/');
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    };

    useEffect(() => {
        fetchServicos();
    }, []);

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Lista de Serviços</h1>
                <ServicoForm atualizarLista={fetchServicos} />
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b bg-gray-200">ID</th>
                            <th className="py-2 px-4 border-b bg-gray-200">Cliente</th>
                            <th className="py-2 px-4 border-b bg-gray-200">Descrição</th>
                            <th className="py-2 px-4 border-b bg-gray-200">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map(servico => (
                            <tr key={servico.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{servico.id}</td>
                                <td className="py-2 px-4 border-b">{servico.cliente.nome}</td>
                                <td className="py-2 px-4 border-b">{servico.descricao}</td>
                                <td className="py-2 px-4 border-b">{servico.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Servicos;
