'use client'; // Adicione essa linha

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ClienteDetalhes = ({ params }) => {
    const router = useRouter();
    const { id } = params;
    const [cliente, setCliente] = useState(null);
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/cliente/${id}`);
                setCliente(response.data);
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

        fetchCliente();
        fetchServicos();
    }, [id]);

    if (!cliente) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-8 font-sans leading-relaxed">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Detalhes do Cliente</h1>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">{cliente.nome}</h2>
                <p>Telefone: {cliente.telefone}</p>
                <p>Email: {cliente.email}</p>
                {/* Adicione mais campos conforme necessário */}
            </div>
            <div className="mb-8">
                <h3 className="text-xl font-semibold">Serviços:</h3>
                {servicos.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 p-2">ID</th>
                                <th className="border border-gray-400 p-2">Descrição</th>
                                <th className="border border-gray-400 p-2">Status</th>
                                <th className="border border-gray-400 p-2">Valor</th>
                                <th className="border border-gray-400 p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map((servico) => (
                                <tr key={servico.id}>
                                    <td className="border border-gray-400 p-2">{servico.id}</td>
                                    <td className="border border-gray-400 p-2">{servico.descricao}</td>
                                    <td className="border border-gray-400 p-2">{servico.status}</td>
                                    <td className="border border-gray-400 p-2">{servico.valor}</td>
                                    <td className="border border-gray-400 p-2">
                                        <Link className="text-blue-500" href={`/servicos/${servico.id}`}>
                                            Ver
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(servico.id)}
                                            className="text-red-500 ml-2"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum serviço encontrado para este cliente.</p>
                )}
            </div>
            <div className="mt-8">
                <button onClick={() => router.push('/clientes')} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default ClienteDetalhes;
