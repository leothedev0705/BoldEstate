import React, { useState } from 'react';
import { MessageCircle, Sparkles, Bot } from 'lucide-react';
import ModernChatBot from './ModernChatBot';

const ModernChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* AI Badge */}
        {!isChatOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-royal-violet to-electric-cyan text-white text-xs rounded-full flex items-center justify-center animate-pulse z-10 shadow-lg">
            <Bot className="w-3 h-3" />
          </div>
        )}
        
        <button
          onClick={() => setIsChatOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-16 h-16 bg-gradient-to-r from-royal-violet to-electric-cyan text-white rounded-3xl shadow-2xl hover:shadow-electric-cyan/30 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-electric-cyan/20 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-royal-violet to-electric-cyan rounded-3xl animate-pulse opacity-60"></div>
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-royal-violet to-electric-cyan opacity-30 animate-ping"></div>
        </button>

        {/* Tooltip */}
        <div className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white text-sm px-4 py-3 rounded-2xl whitespace-nowrap shadow-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Sparkles className="w-4 h-4 text-electric-cyan" />
              <span className="font-medium">Ask AI Assistant</span>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <ModernChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ModernChatButton; 