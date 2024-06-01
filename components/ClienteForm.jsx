import { useState, useEffect } from 'react';
import axios from 'axios';

const ClienteForm = ({ clienteAtual, atualizarLista }) => {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        if (clienteAtual) {
            setNome(clienteAtual.nome);
            setEndereco(clienteAtual.endereco);
            setCpf(clienteAtual.cpf);
        }
    }, [clienteAtual]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (clienteAtual) {
                await axios.put(`http://localhost:8080/api/cliente/${clienteAtual.id}`, {
                    nome,
                    endereco,
                    cpf
                });
                alert('Cliente atualizado com sucesso!');
            } else {
                await axios.post('http://localhost:8080/api/cliente/', {
                    nome,
                    endereco,
                    cpf
                });
                alert('Cliente criado com sucesso!');
            }
            setNome('');
            setEndereco('');
            setCpf('');
            atualizarLista();
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            alert('Erro ao salvar cliente');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                    Nome
                </label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endereco">
                    Endereço
                </label>
                <input
                    type="text"
                    id="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
                    CPF
                </label>
                <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {clienteAtual ? 'Atualizar Cliente' : 'Criar Cliente'}
                </button>
            </div>
        </form>
    );
};

export default ClienteForm;
