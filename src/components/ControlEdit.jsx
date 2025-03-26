import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBath, FaBed, FaCar, FaRuler } from 'react-icons/fa';
import axios from 'axios';

export function ControlEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imovel, setImovel] = useState(null);

  // Função para buscar os dados do imóvel
  useEffect(() => {
    const fetchImovel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/imoveis/${id}`);
        setImovel(response.data);
      } catch (error) {
        console.error('Erro ao buscar imóvel:', error);
        alert('Erro ao carregar os dados do imóvel.');
      }
    };

    fetchImovel();
  }, [id]);

  // Função para salvar as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        titulo: imovel.titulo,
        descricao: imovel.descricao,
        preco: imovel.preco,
        quartos: imovel.quartos,
        banheiro: imovel.banheiro,
        vagas_garagem: imovel.vagas_garagem,
        tipo_venda: imovel.tipo_venda,
        tipo_imovel: imovel.tipo_imovel,
        rua: imovel.rua,
        bairro: imovel.bairro,
        cidade: imovel.cidade,
        estado: imovel.estado,
        cep: imovel.cep,
        metros_quadrados: imovel.metros_quadrados,
      };

      await axios.put(`${import.meta.env.VITE_API_URL}/imoveis/${id}`, data);

      alert('Imóvel atualizado com sucesso!');
      navigate('/control');
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      alert('Erro ao atualizar imóvel.');
    }
  };

  if (!imovel) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex-1 bg-gray-50 rounded-[64px] my-2 ml-52 mr-2">
      <div className="p-12">
        <h1 className="text-3xl font-bold text-green-900 mb-6">Editar Imóvel</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
         {/* Título */}
                   <div>
                     <label className="block text-gray-700 mb-2">Título</label>
                     <input
                       type="text"
                       value={imovel.titulo}
                       onChange={(e) => setImovel({ ...imovel, titulo: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       required
                     />
                   </div>
         
                   {/* Descrição */}
                   <div>
                     <label className="block text-gray-700 mb-2">Descrição</label>
                     <textarea
                       value={imovel.descricao}
                       onChange={(e) => setImovel({ ...imovel, descricao: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       rows="4"
                       required
                     />
                   </div>
         
                   {/* Preço */}
                   <div>
                     <label className="block text-gray-700 mb-2">Preço</label>
                     <div className="relative">
                       <span className="absolute left-3 top-3 text-gray-500">R$</span>
                       <input
                         type="number"
                         value={imovel.preco}
                         onChange={(e) => setImovel({ ...imovel, preco: e.target.value })}
                         className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                         required
                       />
                     </div>
                   </div>
         
                   {/* Quartos, Banheiros, Vagas de Garagem */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div>
                       <label className="block text-gray-700 mb-2">Quartos</label>
                       <div className="relative">
                         <FaBed className="absolute left-3 top-4 text-gray-500" />
                         <input
                           type="number"
                           value={imovel.quartos}
                           onChange={(e) => setImovel({ ...imovel, quartos: e.target.value })}
                           className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                           required
                         />
                       </div>
                     </div>
                     <div>
                       <label className="block text-gray-700 mb-2">Banheiros</label>
                       <div className="relative">
                         <FaBath className="absolute left-3 top-4 text-gray-500" />
                         <input
                           type="number"
                           value={imovel.banheiro}
                           onChange={(e) => setImovel({ ...imovel, banheiro: e.target.value })}
                           className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                           required
                         />
                       </div>
                     </div>
                     <div>
                       <label className="block text-gray-700 mb-2">Vagas de Garagem</label>
                       <div className="relative">
                         <FaCar className="absolute left-3 top-4 text-gray-500" />
                         <input
                           type="number"
                           value={imovel.vagas_garagem}
                           onChange={(e) => setImovel({ ...imovel, vagas_garagem: e.target.value })}
                           className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                           required
                         />
                       </div>
                     </div>
                   </div>
         
                   {/* Metros Quadrados */}
                   <div>
                     <label className="block text-gray-700 mb-2">Metros Quadrados</label>
                     <div className="relative">
                       <FaRuler className="absolute left-3 top-4 text-gray-500" />
                       <input
                         type="number"
                         value={imovel.metros_quadrados}
                         onChange={(e) => setImovel({ ...imovel, metros_quadrados: e.target.value })}
                         className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                         required
                       />
                     </div>
                   </div>
         
                   {/* Tipo de Venda */}
                   <div>
                     <label className="block text-gray-700 mb-2">Tipo de Venda</label>
                     <select
                       value={imovel.tipo_venda}
                       onChange={(e) => setImovel({ ...imovel, tipo_venda: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       required
                     >
                       <option value="">Selecione</option>
                       <option value="compra">Compra</option>
                       <option value="aluguel">Aluguel</option>
                     </select>
                   </div>
         
                   {/* Tipo de Imóvel */}
                   <div>
                     <label className="block text-gray-700 mb-2">Tipo de Imóvel</label>
                     <select
                       value={imovel.tipo_imovel}
                       onChange={(e) => setImovel({ ...imovel, tipo_imovel: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       required
                     >
                       <option value="">Selecione</option>
                       <option value="apartamento">Apartamento</option>
                       <option value="casa">Casa</option>
                       <option value="terreno">Terreno</option>
                     </select>
                   </div>
         
                   {/* Endereço */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div>
                     <label className="block text-gray-700 mb-2">CEP</label>
                     <input
                       type="text"
                       value={imovel.cep}
                       onChange={(e) => setImovel({ ...imovel, cep: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       required
                     />
                   </div>
         
                   {/* Rua */}
                   <div>
                     <label className="block text-gray-700 mb-2">Rua</label>
                     <input
                       type="text"
                       value={imovel.rua}
                       onChange={(e) => setImovel({ ...imovel, rua: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       required
                     />
                   </div>
         
                   {/* Bairro */}
                   <div>
                     <label className="block text-gray-700 mb-2">Bairro</label>
                     <input
                       type="text"
                       value={imovel.bairro}
                       onChange={(e) => setImovel({ ...imovel, bairro: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       required
                     />
                   </div>
         
                   {/* Cidade */}
                   <div>
                     <label className="block text-gray-700 mb-2">Cidade</label>
                     <input
                       type="text"
                       value={imovel.cidade}
                       onChange={(e) => setImovel({ ...imovel, cidade: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       required
                     />
                   </div>
         
                   {/* Estado */}
                   <div>
                     <label className="block text-gray-700 mb-2">Estado</label>
                     <input
                       type="text"
                       value={imovel.estado}
                       onChange={(e) => setImovel({ ...imovel, estado: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                       required
                     />
                   </div>
                </div>
                {/* Botão de Salvar */}
                <div className="mt-6 grid">
                    <button
                    type="submit"
                    className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 hover:cursor-pointer"
                    >
                    Salvar
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}