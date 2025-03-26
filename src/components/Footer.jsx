import React from 'react';
import Logo from '../assets/images/Logo.png';

export function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Layout principal do footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Coluna da logo e descrição */}
          <div className="space-y-4">
            <img src={Logo} alt="Logo da Loja" className="h-16 w-auto" />
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            Silimoveis é a sua melhor escolha para encontrar o imóvel dos seus sonhos. Oferecemos uma ampla variedade de propriedades para compra e aluguel com total segurança.
            </p>
          </div>

          {/* Coluna de contato e links rápidos */}
          <div className="text-left md:text-right space-y-4">
            <h3 className="text-lg font-semibold text-white">Contato</h3>
            <ul className="text-gray-300 space-y-2">
              <li>Email: <a href="mailto:silimoveis10@gmail.com" className="hover:text-white transition">silimoveis10@gmail.com</a></li>
              <li>Telefone: (31) 99826-1866</li>
              <li>Endereço: Rua Frei Cipriano, 133, Novo Cachoerinha</li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-green-600 my-8"></div>

        {/* Rodapé final */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="text-green-200">© 2025 SilImoveis. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition">Termos de Serviço</a>
            <a href="/login" className="hover:text-white transition">Painel de Controle</a>
            <a href="#" className="text-green-300 hover:text-white transition">Code by Rafael Luiz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
