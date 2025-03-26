import { useEffect, useState } from 'react';
import Fundo from "./assets/images/ideia.jpg";
import { PropertyCard } from './components/PropertyCard.jsx';
import { Header } from "./components/Header.jsx";
import { Filter } from "./components/FIlter";
import { Footer }from "./components/Footer.jsx";

export function App() {
  const [property, setProperty] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
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
        setFilteredProperties(parsedData); 
      } catch (error) {
        console.error("Erro ao buscar dados dos imóveis:", error);
      }
    };

    fetchProperty();
  }, []);

  const handleFilter = (filters) => {
    const filtered = property.filter((imovel) => {
      return (
        (!filters.tipoImovel || imovel.tipo_imovel === filters.tipoImovel) &&
        (!filters.estado || imovel.estado === filters.estado) &&
        (!filters.cidade || imovel.cidade === filters.cidade) &&
        (!filters.quartos || (filters.quartos === '>3' ? imovel.quartos > 3 : imovel.quartos === parseInt(filters.quartos))) &&
        (!filters.vagasGaragem || (filters.vagasGaragem === '>3' ? imovel.vagas_garagem > 3 : imovel.vagas_garagem === parseInt(filters.vagasGaragem))) &&
        (!filters.precoMinimo || imovel.preco >= filters.precoMinimo) &&
        (!filters.precoMaximo || imovel.preco <= filters.precoMaximo)
      );
    });
  
    setFilteredProperties(filtered);
  };

  return (
    <div className="App min-h-screen bg-stone-200 overflow-hidden">
      {/* Header fixo sobreposto */}
      <div className="top-0 left-0 w-full z-20 fixed mt-6 ">
        <Header />
      </div>

      {/* Parallax sem brechas */}
      <div className="relative h-screen p-2">
        <div
          className="h-full w-full bg-fixed bg-center md:bg-center bg-cover rounded-t-[53px] sm:bg-center"
          style={{ backgroundImage: `url(${Fundo})` }}
        >
          <div className="h-full flex items-center justify-center text-4xl font-bold">
          </div>
        </div>
      </div>

      {/* Conteúdo abaixo */}
      <div className="relative -mt-29 z-10">
        <Filter onFilter={handleFilter} />
      </div>

      <div className="container mx-auto min-h-screen pb-20 px-4 md:px-6">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center md:text-left">
          Imóveis Disponíveis
        </h2>
        {filteredProperties.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum imóvel encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.imagens[0]}
                title={property.titulo}
                city={property.cidade}
                state={property.estado}
                bathrooms={property.banheiro}
                bedrooms={property.quartos}
                garages={property.vagas_garagem}
                price={property.preco}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}