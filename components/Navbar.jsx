import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-lg font-bold">
                    Manauara Diesel
                </Link>
                <div className="flex space-x-4">
                    <Link href="/clientes" className='text-gray-100'>
                        Clientes
                    </Link>
                    <Link href="/servicos" className='text-gray-100'>
                        Serviços
                    </Link>
                    <Link href="/orcamento" className="text-gray-100">
                        Orçamento +
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
