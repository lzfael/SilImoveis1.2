// src/pages/PropertyDetails.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import { Header } from '../components/Header';
import { Footer }from '../components/Footer';
import { BedDouble, Car, Bath, MapPin, House, DraftingCompass } from 'lucide-react';
import { ImageCarousel } from '../components/ImageCarousel';

export function PropertyDetails(){
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/imoveis/${id}`);
        const data = await response.json();
  
        if (typeof data.imagens === 'string') {
          data.imagens = JSON.parse(data.imagens);
        }
  
        setProperty(data);
      } catch (error) {
        console.error("Erro ao buscar dados do imóvel:", error);
      }
    };
  
    fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="min-h-screen bg-stone-200 flex justify-center items-center">Carregando...</div>;
  }
  
  function currrencyFormatter(){
    return(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(property.preco)
    )
  } 

  const openCarousel = (index) => {
    setSelectedImageIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };


  const sendMessage = (property) => {
    const message = `Olá, me chamo ${name} ${lastName}. Estou interessado no imóvel "${property.title}" de ${property.price}. Poderia me fornecer mais detalhes?`;
    const phoneNumber = "5531998261866";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };


  return (
    <div className="min-h-screen bg-stone-200 pt-6">
      <div className="top-0 left-0 w-full z-20 fixed mt-6 ">
        <Header />
      </div>

      <div className="container mx-auto px-4 pt-35 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
          <div className="mb-4 relative">
            {/* Imagem Principal */}
            <img
              src={property.imagens[0]}
              alt="Imagem Principal"
              className="w-full h-auto mb-3 rounded-lg cursor-pointer"
              onClick={() => openCarousel(0)}
            />

            {/* Localização no canto superior direito */}
            <div className="absolute top-2 right-2">
              <div className="bg-white rounded-full shadow-lg py-1.5 px-4 ">
                <div className="text-gray-600 flex items-center gap-4">
                  <MapPin/>
                  <p>{property.cidade}, {property.estado}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8">
            {Array.isArray(property.imagens) && property.imagens.slice(1, 4).map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className='h-full w-full object-cover rounded-lg cursor-pointer'
                    onClick={() => openCarousel(index + 1)}
                  />
                </div>
              ))}
            </div> 
            <form className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <img src={Logo} alt="Silimoveis" className="h-12" />
                <h2 className="text-xl font-semibold text-gray-800">Interessado? Entre em contato!</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-7">
                <div>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Seu sobrenome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-green-900 text-green-200 py-2 rounded-lg hover:bg-green-700 hover:text-white cursor-pointer transition-colors"
                onClick={() => sendMessage(property)}
              >
                Entrar em contato pelo Whatsapp
              </button>
            </form>
          </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1 mt-5">{property.titulo}</h1>
            <p className="text-gray-600 mb-4 mt-2 flex itens-center gap-1 text-md"><House width={30}/> {property.tipo_imovel}</p>
            <p className="text-3xl font-bold text-green-900">{currrencyFormatter()}</p>

            <h2 className='mt-5 mb-2 text-2xl font-bold'>Descrição</h2>
            <p className="text-md text-justify">{property.descricao}</p>
            
            <h2 className='mb-4 mt-20 text-2xl font-bold'>Visão Geral</h2>
            <table className="w-full bg-white rounded-lg shadow-lg shadow-stone-300 overflow-hidden">
              <tbody>
                {/* Primeira linha (três colunas) */}
                <tr className="grid grid-cols-3 border-b border-gray-300">
                  {/* Quartos */}
                  <td className="flex gap-2 items-center justify-center p-4 border-r border-gray-300">
                    <BedDouble className="text-green-900 text-3xl" />
                    <span className="text-lg font-bold text-green-900 mt-1">{property.quartos}</span>
                  </td>

                  {/* Vagas de garagem */}
                  <td className="flex gap-2 items-center justify-center p-3 border-r border-gray-300">
                    <Car className="text-green-900 text-3xl" />
                    <span className="text-lg font-bold text-green-900 mt-1">{property.vagas_garagem}</span>
                  </td>

                  {/* Banheiros */}
                  <td className="flex gap-2 items-center justify-center p-3">
                    <Bath className="text-green-900 text-3xl" />
                    <span className="text-lg font-bold text-green-900 mt-1">{property.banheiro}</span>
                  </td>
                </tr>

                {/* Segunda linha (metragem quadrada ocupando as 3 colunas) */}
                <tr>
                  <td colSpan="3" className="flex items-center justify-center gap-2 p-4 bg-white">
                    <DraftingCompass className="text-green-900 text-3xl" />
                    <span className="text-lg font-bold text-green-900">{property.metros_quadrados}</span>
                    <span className="text-lg text-gray-600">m²</span>
                  </td>
                </tr>
              </tbody>
            </table>
            

            <h2 className='my-5 text-2xl font-bold'>Endereço</h2>
            <table className="w-full bg-white rounded-lg shadow-lg shadow-stone-300  overflow-hidden border border-gray-200">
            <tbody>
              {/* Primeira linha */}
              <tr className="border-b border-gray-200">
                <td className="p-4 text-left">
                  <span className="text-gray-600">Rua:</span> <span className="font-bold text-green-900">{property.rua}</span>
                </td>
                <td className="p-4 text-left border-l border-gray-200">
                  <span className="text-gray-600">Cidade:</span> <span className="font-bold text-green-900">{property.cidade}</span>
                </td>
              </tr>

              {/* Segunda linha */}
              <tr className="border-b border-gray-200">
                <td className="p-4 text-left">
                  <span className="text-gray-600">Bairro:</span> <span className="font-bold text-green-900">{property.bairro}</span>
                </td>
                <td className="p-4 text-left border-l border-gray-200">
                  <span className="text-gray-600">Estado:</span> <span className="font-bold text-green-900">{property.estado}</span>
                </td>
              </tr>

              {/* Terceira linha */}
              <tr>
                <td className="p-4 text-left">
                  <span className="text-gray-600">CEP:</span> <span className="font-bold text-green-900">{property.cep}</span>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
      {/* Carrossel de Imagens */}
      {isCarouselOpen && (
      <ImageCarousel
        images={property.imagens.map((image) => image)} 
        initialIndex={selectedImageIndex}
        onClose={closeCarousel}
      />
      )}
      <Footer />
    </div>
    
  );
};