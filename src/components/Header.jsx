import React, { useState } from 'react';
import Logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-900 rounded-lg shadow-sm py-2 px-4 md:px-6 mx-10 md:mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        {/* Logo à esquerda */}
        <div className="flex items-center">
          <Link to={'/'}>
            <img
              src={Logo}
              alt="Logo"
              className="h-12 w-auto hover:cursor-pointer"
            />
          </Link>
        </div>

        {/* Botão de menu para telas pequenas e médias */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navegação para telas médias e grandes */}
        <nav className="hidden md:flex space-x-6 lg:space-x-9">
          <Link to="/" className="text-white hover:text-green-300">
            Home
          </Link>
          <Link to="/contact" className="text-white hover:text-green-300">
            Contato
          </Link>
        </nav>
      </div>

      {/* Navegação para telas pequenas e médias */}
      {isMenuOpen && (
        <nav className="flex flex-col mt-4 space-y-2 md:hidden">
          <Link
            to="/"
            className="text-white hover:text-green-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-green-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Contato
          </Link>
        </nav>
      )}
    </header>
  );
};