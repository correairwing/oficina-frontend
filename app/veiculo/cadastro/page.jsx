// app/clientes/[id]/page.jsx

"use client"; // Adicione esta linha no topo do arquivo

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ClienteDetalhes = () => {
    const router = useRouter();
    const { id } = router.query;
    const [cliente, setCliente] = useState(null);
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        if (id) {
            fetchCliente();
            fetchVeiculos();
        }
    }, [id]);

    const fetchCliente = async () => {
        try {
            const response = await axios.get(`/api/cliente/${id}`);
            setCliente(response.data);
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
        }
    };

    const fetchVeiculos = async () => {
        try {
            const response = await axios.get(`/api/veiculo/cliente/${id}`);
            setVeiculos(response.data);
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
        }
    };

    if (!cliente) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Detalhes do Cliente</h1>
            <p>Nome: {cliente.nome}</p>
            <p>CPF: {cliente.cpf}</p>
            <p>Telefone: {cliente.telefone}</p>
            <button onClick={() => router.push(`/veiculo/cadastro?clienteId=${id}`)}>Cadastrar Veículo</button>
            <h2>Veículos</h2>
            {veiculos.length > 0 ? (
                <ul>
                    {veiculos.map((veiculo) => (
                        <li key={veiculo.id}>{veiculo.placa} - {veiculo.marca} {veiculo.modelo}</li>
                    ))}
                </ul>
            ) : (
                <p>Não há veículos cadastrados para este cliente.</p>
            )}
        </div>
    );
};

export default ClienteDetalhes;
