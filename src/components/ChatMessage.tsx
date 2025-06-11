import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''} mb-6 animate-fade-in`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-br from-orange-500 to-red-600' 
          : 'bg-gradient-to-br from-green-600 to-emerald-700'
      } shadow-lg`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'text-right' : ''}`}>
        <div className={`px-4 py-3 rounded-2xl shadow-lg ${
          isUser 
            ? 'bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-br-md' 
            : 'bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700'
        } backdrop-blur-sm`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1 px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};