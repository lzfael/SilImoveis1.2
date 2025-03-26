import React from 'react';
import { ArrowDownRight, CornerUpLeft } from 'lucide-react';
import ContactImage from '../assets/images/contact.png';
import Logo from '../assets/images/Logo.png';
import Swal from 'sweetalert2';

export function ContactPage() {

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch(import.meta.env.VITE_WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Enviado!",
        text: "Sua mensagem foi enviada com sucesso!",
        icon: "success",
        draggable: true,
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-200 overflow-hidden">
      {/* Conteúdo Principal */}
      <div className="flex flex-col md:flex-row flex-grow h-screen">
        {/* Imagem à Esquerda (oculta em telas pequenas) */}
        <div className="hidden md:block md:w-1/2 relative">
          {/* Logo no canto superior esquerdo */}
          <div className="absolute top-4 left-4 z-10">
            <img src={Logo} alt="Logo" className="h-16" />
          </div>

          {/* Imagem de fundo */}
          <img
            src={ContactImage}
            alt="Contato"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-20 flex flex-col justify-center">
          {/* Botão de voltar */}
          <div className="py-4">
            <a href="/">
              <CornerUpLeft className="cursor-pointer hover:text-green-800" />
            </a>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-7xl font-bold text-gray-800 my-5">
            Dúvidas? Entre <br /> em Contato!
          </h1>
          <p className="text-gray-600 text-md mt-7 mb-10 ml-1.5 text-lg">
            Estamos prontos para ajudar. Envie sua mensagem!
          </p>

          {/* Formulário de Contato */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <div className="flex justify-between items-center border-b border-gray-400 focus-within:border-green-700">
                <input
                  type="text"
                  name="nome"
                  className="w-full p-2 focus:outline-none"
                  placeholder="Seu nome"
                  required
                />
                <ArrowDownRight className="text-gray-400" />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <div className="flex justify-between items-center border-b border-gray-400 focus-within:border-green-700">
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 focus:outline-none"
                  placeholder="Seu e-mail"
                  required
                />
                <ArrowDownRight className="text-gray-400" />
              </div>
            </div>

            {/* Descrição do Problema */}
            <div>
              <div className="flex justify-between items-center border-b border-gray-400 focus-within:border-green-700">
                <textarea
                  name="message"
                  className="w-full p-2 focus:outline-none"
                  placeholder="Descreva seu problema aqui"
                  rows="3"
                  required
                />
                <ArrowDownRight className="text-gray-400 self-start mt-2" />
              </div>
            </div>

            {/* Botão de Envio */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-900 text-green-200 py-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors my-7 cursor-pointer"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-green-900 py-2 text-white text-center -mt-12 relative z-10">
        &copy; 2025 Silimoveis. Todos os direitos reservados.
      </footer>
    </div>
  );
};