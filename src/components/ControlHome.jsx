import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function ControlHome() {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProperty = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/imoveis`);
      const data = await response.json();

      // Parse o campo "imagens" se ele for uma string em cada imóvel
      const parsedData = data.map((property) => {
        if (typeof property.imagens === 'string') {
          property.imagens = JSON.parse(property.imagens);
        }
        return property;
      });

      setProperty(parsedData);
    } catch (error) {
      console.error("Erro ao buscar dados dos imóveis:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

const handleDelete = async (id) => {
  if (window.confirm('Tem certeza que deseja deletar este imóvel? Essa ação não pode ser desfeita.')) {
    try {
      const token = localStorage.getItem('token'); // Obtém o token do localStorage
      await axios.delete(`${import.meta.env.VITE_API_URL}/imoveis/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      });
      alert('Imóvel excluído com sucesso!');
      fetchProperty(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir imóvel:', error.response || error);
      alert(error.response?.data?.message || 'Erro ao excluir imóvel.');
    }
  }
};

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 rounded-[64px] my-2 ml-52 mr-2 p-12">
        <h1 className="text-3xl font-bold mb-6">Carregando imóveis...</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 rounded-[64px] my-2 ml-52 mr-2">
      <div className="p-12">
        <h1 className="text-3xl font-bold mb-6 text-green-900">Imóveis Cadastrados</h1>
        {property.length === 0 ? (
          <p className="text-green-900">Nenhum imóvel cadastrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {property.map(imovel => (
              <div key={imovel.id}>
                {/* Imagem do Imóvel */}
                {imovel.imagens && imovel.imagens.length > 0 && (
                  <img
                    src={imovel.imagens[0]}
                    alt={imovel.titulo}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Detalhes do Imóvel */}
                <h2 className="text-xl font-semibold mb-2">{imovel.titulo}</h2>
                <p className="text-green-900 font-bold text-2xl mb-2">R$ {imovel.preco}</p>
                <p className="text-gray-600 mb-4 flex items-center gap-2"><MapPin /> {imovel.cidade}, {imovel.estado}</p>

                {/* Botões de Ação */}
                <div className="mt-4 space-x-2 grid grid-cols-2">
                  <button
                    onClick={() => navigate(`/control/edit/${imovel.id}`)}
                    className="hover:text-blue-500 border-1 px-4 py-2 rounded hover:cursor-pointer hover:border-blue-600 transition-colors duration-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(imovel.id)}
                    className="hover:text-red-700 border-1 px-4 py-2 rounded hover:cursor-pointer hover:border-red-700 transition-colors duration-200"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};