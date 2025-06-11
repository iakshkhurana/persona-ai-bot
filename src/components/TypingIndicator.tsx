import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-3 mb-6 animate-fade-in">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-700 shadow-lg">
        <Bot className="w-4 h-4 text-white" />
      </div>
      
      <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};