import { useState } from 'react';
import { Search } from 'lucide-react';

export function Filter({ onFilter }) {
  const [tipoImovel, setTipoImovel] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [quartos, setQuartos] = useState('');
  const [vagasGaragem, setVagasGaragem] = useState('');
  const [precoMinimo, setPrecoMinimo] = useState('');
  const [precoMaximo, setPrecoMaximo] = useState('');

  const handleFilter = () => {
    onFilter({
      tipoImovel,
      estado,
      cidade,
      quartos: quartos === 'mais' ? '>3' : quartos, // Condição especial para "Mais"
      vagasGaragem: vagasGaragem === 'mais' ? '>3' : vagasGaragem, // Condição especial para "Mais"
      precoMinimo: precoMinimo ? parseFloat(precoMinimo) : null,
      precoMaximo: precoMaximo ? parseFloat(precoMaximo) : null,
    });
  };

  return (
    <div className="bg-stone-200 rounded-[60px] w-full p-6 md:p-10 relative -mt-17">
      {/* Primeira Linha: Tipo do Imóvel e Localização */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 md:mx-20">
        {/* Campo 1: Tipo do Imóvel */}
        <div>
          <select
            value={tipoImovel}
            onChange={(e) => setTipoImovel(e.target.value)}
            className="mt-1 p-2 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          >
            <option value="">Tipo do Imóvel</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="sitio">Sitio</option>
            <option value="chácara">Chácara</option>
            <option value="terreno">Terreno</option>
            <option value="cobertura">Cobertura</option>
            <option value="kitnet">Kitnet</option>
            <option value="studio">Studio</option>
            <option value="fazenda">Fazenda</option>
          </select>
        </div>

        {/* Campo 2: Localização */}
        <div>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="mt-1 p-2 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          >
            <option value="">Estado</option>
            <option value="SP">SP</option>
            <option value="RJ">RJ</option>
            <option value="MG">MG</option>
          </select>
        </div>

        {/* Campo 3: Cidade */}
        <div>
          <select
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="mt-1 p-2 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          >
            <option value="">Cidade</option>
            <option value="São Paulo">São Paulo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="Belo Horizonte">Belo Horizonte</option>
          </select>
        </div>

        {/* Campo 4: Quartos */}
        <div>
          <select
            value={quartos}
            onChange={(e) => setQuartos(e.target.value)}
            className="mt-1 p-2 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          >
            <option value="">Quartos</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="mais">4+</option>
          </select>
        </div>
      </div>

      {/* Segunda Linha: Preço Mínimo e Preço Máximo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mx-4 md:mx-20">
        {/* Campo 5: Vagas de Garagem */}
        <div>
          <select
            value={vagasGaragem}
            onChange={(e) => setVagasGaragem(e.target.value)}
            className="mt-1 p-2 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          >
            <option value="">Vagas de Garagem</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="mais">4+</option>
          </select>
        </div>

        {/* Campo 6: Preço Mínimo */}
        <div>
          <input
            type="number"
            value={precoMinimo}
            onChange={(e) => setPrecoMinimo(e.target.value)}
            placeholder="Preço Mínimo"
            className="mt-1 p-2 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Campo 7: Preço Máximo */}
        <div>
          <input
            type="number"
            value={precoMaximo}
            onChange={(e) => setPrecoMaximo(e.target.value)}
            placeholder="Preço Máximo"
            className="mt-1 p-2 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Botão de Busca */}
        <div className="col-span-1 mt-1">
          <button
            type="button"
            onClick={handleFilter}
            className="bg-green-900 text-white rounded-lg hover:bg-green-700 cursor-pointer w-full transition-colors flex justify-center items-center gap-2 h-12"
          >
            <Search />
            Buscar
          </button>
        </div>
      </div>

      {/* Linha divisória */}
      <div className="mt-10 flex justify-center py-5">
        <hr className="w-4/6 text-green-700" />
      </div>
    </div>
  );
};