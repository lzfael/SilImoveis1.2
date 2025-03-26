import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Ícones
import Logo from '../assets/images/Logo.png'; // Logo

export function Navbar() {
  const location = useLocation(); 

  return (
    <div className="w-48 py-9 h-screen text-gray-900 fixed top-0 left-0 p-4 flex flex-col">
      {/* Logo */}
      <div className="text-xl font-bold mb-6 text-gray-200 flex gap-1 itens-center">
        <img src={Logo} alt="" width={50} />
        <p className='mt-2'>SilImoveis</p>
        
    </div>

      {/* Links do Menu */}
      <ul className="space-y-2 flex-1">
        <li>
          <Link
            to="/control"
            className={`flex items-center p-1 text-gray-200 gap-0.5 rounded-md transition-all duration-200 ${
              location.pathname === '/control'
                ? 'bg-green-700 text-green-200'
                : 'hover:bg-green-700 hover:text-green-200'
            }`}
          >
            <FaHome className="mr-2 text-sm" />
            <span className="text-sm">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/control/manipulate"
            className={`flex items-center p-1 gap-0.5 text-gray-200 rounded transition-all duration-200 ${
              location.pathname === '/control/manipulate'
                ? 'bg-green-700 text-green-200'
                : 'hover:bg-green-700 hover:text-green-200'
            }`}
          >
            <FaPlus className="mr-2 text-sm" />
            <span className="text-sm">Criar Imóvel</span>
          </Link>
        </li>
      </ul>

      {/* Botão para Voltar ao Site */}
      <div className="mt-auto">
        <a
          href="/"
          onClick={() => localStorage.removeItem('token')}
          className="flex items-center p-2 rounded transition-all duration-200 hover:bg-green-700 hover:text-green-400 text-gray-200"
        >
          <FaSignOutAlt className="mr-2 text-sm " />
          <span className="text-sm">Voltar para o Site</span>
        </a>
      </div>
    </div>
  );
};
