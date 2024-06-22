"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CadastroVeiculo = () => {
    const router = useRouter();
    const { clienteId } = router.query;
    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');

    const handleCadastro = async () => {
        try {
            const response = await axios.post('/api/veiculo', {
                placa,
                marca,
                modelo,
                ano,
                cliente: { id: clienteId }
            });
            router.push(`/clientes/${clienteId}`);
        } catch (error) {
            console.error('Erro ao cadastrar veículo:', error);
        }
    };

    return (
        <div>
            <h1>Cadastro de Veículo</h1>
            <input
                type="text"
                placeholder="Placa"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
            />
            <input
                type="text"
                placeholder="Marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
            />
            <input
                type="text"
                placeholder="Modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
            />
            <input
                type="number"
                placeholder="Ano"
                value={ano}
                onChange={(e) => setAno(parseInt(e.target.value))}
            />
            <button onClick={handleCadastro}>Cadastrar Veículo</button>
        </div>
    );
};

export default CadastroVeiculo;
