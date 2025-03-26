import { useState } from 'react';
import { ArrowDownRight, CornerUpLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactImage from '../assets/images/contact.png';
import Logo from '../assets/images/Logo.png';

export function LoginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password }),
        });

        const data = await response.json();

        if (response.ok){
            localStorage.setItem('token', data.token);
            navigate('/control');
        } else {
            alert('Login inválido');
        }

    }

    return (
        <div className="min-h-screen bg-stone-200">
            {/* Conteúdo Principal */}
            <div className="flex flex-col md:flex-row h-screen">
                {/* Conteúdo à Esquerda (ocupa toda a largura em telas pequenas) */}
                <div className="w-full md:w-1/2 p-6 md:p-20 flex flex-col gap-6">
                    {/* Botão de voltar */}
                    <div className="py-6">
                        <a href="/">
                            <CornerUpLeft className="cursor-pointer hover:text-green-800" />
                        </a>
                    </div>

                    {/* Logo e Formulário */}
                    <div>
                        <p className="text-gray-600 mb-4 text-lg">Bem vinda de volta, Silvana!</p>
                        <h1 className="text-7xl font-bold text-gray-800 mb-30">Painel de Controle</h1>
                        <form className="space-y-4 ">
                            {/* Nome */}
                            <div>
                            <div className="flex justify-between items-center border-b border-gray-400 focus-within:border-green-700">
                                <input
                                type="text"
                                name="nome"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                className="w-full p-2 focus:outline-none"
                                placeholder="Nome"
                                required
                                />
                                <ArrowDownRight className="text-gray-400" />
                            </div>
                            </div>

                            {/* E-mail */}
                            <div>
                            <div className="flex justify-between items-center border-b border-gray-400 focus-within:border-green-700">
                                <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 focus:outline-none"
                                placeholder="Senha"
                                required
                                />
                                <ArrowDownRight className="text-gray-400" />
                            </div>
                            </div>

                            {/* Botão de Envio */}
                            <div>
                            <div
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full bg-green-900 text-green-200 text-center py-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors my-7 cursor-pointer"
                            >
                                Enviar
                            </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Imagem à Direita (oculta em telas pequenas) */}
                <div className="hidden md:block md:w-1/2 relative">
                    {/* Imagem de fundo */}
                    <img
                        src={ContactImage}
                        alt="Contato"
                        className="w-full h-full object-cover"
                    />
                    <div className='absolute top-4 left-3 z-10'>
                        <img src={Logo} alt="Logo" className="h-20" />
                    </div>

                </div>
            </div>

            <div className="bg-green-900 py-2 text-white text-center relative -mt-10">
                &copy; 2025 Silimoveis. Todos os direitos reservados.
            </div>
        </div>
    );
}