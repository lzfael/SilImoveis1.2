import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function ImageCarousel({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="fixed backdrop-blur-sm inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={goToPrevious}
        className="absolute left-4 text-white hover:text-gray-300 cursor-pointer"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
 
        <img
          src={images[currentIndex]}
          alt={`Imagem ${currentIndex + 1}`}
          className="w-10/12 h-10/12 object-contain" 
        />

      <button
        onClick={goToNext}
        className="absolute right-4 text-white hover:text-gray-300 cursor-pointer"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
};
