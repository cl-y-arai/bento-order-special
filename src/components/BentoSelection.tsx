import React from 'react';
import { Bento } from '../types/types';

interface BentoSelectionProps {
  bentoOptions: Bento[];
  selectedBento: string | null;
  onSelectBento: (bentoId: string) => void;
}

const BentoSelection: React.FC<BentoSelectionProps> = ({
  bentoOptions,
  selectedBento,
  onSelectBento,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">お弁当を選んでください</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bentoOptions.map((bento) => (
          <div
            key={bento.id}
            className={`
              relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-102 hover:shadow-lg
              ${selectedBento === bento.id ? 'ring-4 ring-blue-500 shadow-md' : 'shadow'}
            `}
            onClick={() => onSelectBento(bento.id)}
          >
            <div className="aspect-w-16 aspect-h-9 relative h-48">
              <img
                src={bento.image}
                alt={bento.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h3 className="font-bold text-white">{bento.name}</h3>
                <p className="text-white font-medium">{bento.price}円</p>
              </div>
            </div>
            {selectedBento === bento.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoSelection;