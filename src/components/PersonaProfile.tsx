import React from 'react';
import { User } from 'lucide-react';

interface PersonaProfileProps {
  name: string;
  image?: string;
}

export const PersonaProfile: React.FC<PersonaProfileProps> = ({ name, image }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 p-0.5 shadow-lg">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-orange-400" />
            )}
          </div>
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 shadow-sm"></div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-white">{name}</h2>
        <p className="text-sm text-gray-400">Prime Minister of India</p>
      </div>
    </div>
  );
};