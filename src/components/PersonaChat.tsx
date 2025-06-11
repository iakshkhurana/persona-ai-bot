import React, { useState, useRef, useEffect } from 'react';
import { PersonaProfile } from './PersonaProfile';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { Settings, MoreHorizontal, AlertCircle } from 'lucide-react';
import { openAIService } from '../services/openai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface PersonaChatProps {
  personaName: string;
  personaImage?: string;
}

export const PersonaChat: React.FC<PersonaChatProps> = ({ personaName, personaImage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Namaste! Main ${personaName} hoon. Aap kaise hain? Kya main aapki koi seva kar sakta hoon?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText: string) => {
    // Clear any previous errors
    setError(null);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Check if OpenAI is configured
      if (!openAIService.isConfigured()) {
        throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
      }

      // Get AI response
      const aiResponseText = await openAIService.generateResponse(messageText);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      console.error('Error generating response:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      
      // Add fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Maaf kijiye, main abhi technical samasya ka samna kar raha hoon. Kripaya thoda intezaar kariye aur dobara koshish kariye.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearConversation = () => {
    openAIService.clearHistory();
    setMessages([
      {
        id: '1',
        text: `Namaste! Main ${personaName} hoon. Aap kaise hain? Kya main aapki koi seva kar sakta hoon?`,
        isUser: false,
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-sm border-b border-orange-800/30">
        <PersonaProfile name={personaName} image={personaImage} />
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={clearConversation}
            className="p-2 text-gray-400 hover:text-orange-400 transition-colors rounded-lg hover:bg-orange-900/20"
            title="Clear conversation"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-orange-400 transition-colors rounded-lg hover:bg-orange-900/20">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 p-3 m-4 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div className="text-sm text-red-200">
            <p className="font-medium">Configuration Required</p>
            <p className="text-red-300">{error}</p>
            <p className="text-red-300 mt-1">
              Create a <code className="bg-red-800/50 px-1 rounded">.env</code> file and add: 
              <code className="bg-red-800/50 px-1 rounded ml-1">VITE_OPENAI_API_KEY=your_api_key</code>
            </p>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};