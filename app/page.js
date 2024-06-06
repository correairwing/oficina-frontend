'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [servicosNaoFinalizados, setServicosNaoFinalizados] = useState([]);

    useEffect(() => {
        fetchServicosNaoFinalizados();
    }, []);

    const fetchServicosNaoFinalizados = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/servicos/naoFinalizados');
            setServicosNaoFinalizados(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços não finalizados:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
          <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Bem-vindo ao Sistema de Gestão</h1>
                <p className="mt-4">Use o menu acima para navegar entre Clientes e Serviços.</p>
            </div>
            <h1 className="text-2xl font-bold mb-4 mt-10">Serviços recentes</h1>
            <ul>
                {servicosNaoFinalizados.map(servico => (
                    <li key={servico.id} className="mb-2">
                        <Link href={`/servicos/${servico.id}`} className="text-blue-500 underline">
                            {servico.descricao}
                        </Link>
                        <p><strong>Status:</strong> {servico.status}</p>
                        <p><strong>Valor:</strong> {servico.valor}</p>
                        <p><strong>Data de entrada:</strong> {new Date(servico.dataCriacao).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
