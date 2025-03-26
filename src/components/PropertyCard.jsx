import { Bath, BedDouble, MapPin, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PropertyCard ({ id, image, title, price, city, state, bathrooms, bedrooms, garages }){
  
  function currrencyFormatter(){
    return(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price)
    )
  } 

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Detalhes do imóvel */}
      <div className="flex flex-col flex-grow p-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-600 flex itens-center hover:text-green-700 gap-2"><MapPin/> {city}, {state}</p>
        <p className="mt-2 text-2xl font-bold text-green-900">{currrencyFormatter()}</p>

        {/* Ícones de quartos, banheiros e vagas */}
        <div className="flex gap-6 mt-4">
          <div className="flex gap-2 hover:text-green-700">
            <BedDouble /> {bedrooms}
          </div>
          <div className="flex gap-2 hover:text-green-700">
            <Bath /> {bathrooms}
          </div>
          <div className="flex gap-2 hover:text-green-700">
            <Warehouse /> {garages}
          </div>
        </div>
      </div>

      {/* Botão "Saiba Mais" */}
      <div className='py-3'>
        <Link
          to={`/details/${id}`}
          className="block w-full text-center border rounded-lg py-2 hover:bg-green-900 hover:text-green-50 hover:cursor-pointer transition-colors"
        >
          Saiba Mais
        </Link>
      </div>
    </div>
  );
};