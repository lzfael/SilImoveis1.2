import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRuler, FaCar, FaBed, FaBath, FaImage } from 'react-icons/fa';
import axios from 'axios';

export function ControlManipulate() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [imovel, setImovel] = useState({
    titulo: '',
    quartos: '',
    preco: '',
    vagas_garagem: '',
    tipo_venda: '',
    tipo_imovel: '',
    banheiro: '',
    rua: '',
    estado: '',
    descricao: '',
    bairro: '',
    metros_quadrados: '',
    cep: '',
    cidade: '',
  });

  const fetchAddressByCEP = async (cep) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_CEP_API_URL}/${cep}`);
      const { street, neighborhood, city, state } = response.data;

      setImovel((prevImovel) => ({
        ...prevImovel,
        rua: street || '',
        bairro: neighborhood || '',
        cidade: city || '',
        estado: state || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('CEP não encontrado. Verifique o número e tente novamente.');
    }
  };

  // Função chamada ao digitar no campo de CEP
  const handleCEPChange = (e) => {
    const cep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setImovel({ ...imovel, cep });

    if (cep.length === 8) {
      fetchAddressByCEP(cep); // Busca o endereço automaticamente
    }
  };

  // Função para adicionar imagens
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Converta FileList para array
    if (selectedImages.length + files.length > 7) {
      alert('Você pode selecionar no máximo 7 imagens.');
      return;
    }

    setSelectedImages([...selectedImages, ...files]); // Armazene os arquivos reais
  };

  // Função para remover imagens
  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages); // Atualize o estado removendo a imagem
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/imoveis`;

    try {
      // Validação: Verifique se há pelo menos uma imagem
      if (selectedImages.length === 0) {
        alert('Por favor, selecione pelo menos uma imagem.');
        return;
      }

      // Criar um FormData para enviar os dados e as imagens
      const formData = new FormData();
      formData.append('titulo', imovel.titulo);
      formData.append('descricao', imovel.descricao);
      formData.append('preco', imovel.preco);
      formData.append('quartos', imovel.quartos);
      formData.append('banheiro', imovel.banheiro);
      formData.append('vagas_garagem', imovel.vagas_garagem);
      formData.append('tipo_venda', imovel.tipo_venda);
      formData.append('tipo_imovel', imovel.tipo_imovel);
      formData.append('rua', imovel.rua);
      formData.append('bairro', imovel.bairro);
      formData.append('cidade', imovel.cidade);
      formData.append('estado', imovel.estado);
      formData.append('cep', imovel.cep);
      formData.append('metros_quadrados', imovel.metros_quadrados);

      // Adicionar as imagens reais ao FormData
      selectedImages.forEach((image) => {
        formData.append('imagens', image);
      });
      // Enviar os dados para o backend
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/control'); // Redireciona após salvar
    } catch (error) {
      console.error('Erro ao salvar o imóvel:', error);
      alert(error.response?.data?.message || 'Erro ao salvar o imóvel.');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 rounded-[64px] my-2 ml-52 mr-2">
      <div className="p-12">
        <h1 className="text-3xl font-bold text-green-900 mb-6">Criar Novo Imóvel</h1>
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
              onChange={handleCEPChange} // Busca o endereço automaticamente ao digitar
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
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

          {/* Upload de Imagens */}
          <div>
            <label className="block text-gray-700 mb-2">Imagens</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.isArray(selectedImages) &&
                selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors hover:cursor-pointer flex text-center justify-center items-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
            </div>
            <label className="flex items-center justify-center border-2 border-dashed p-4 border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-all mt-4">
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <FaImage className="text-gray-500 text-2xl" />
              <span className="ml-2 text-gray-700">Adicionar Imagens</span>
            </label>
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
};