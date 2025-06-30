import React, { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import ModernChatBot from './ModernChatBot';

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Notification Badge */}
        {!isChatOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-electric-cyan text-white text-xs rounded-full flex items-center justify-center animate-pulse z-10">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        )}
        
        <button
          onClick={() => setIsChatOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-14 h-14 bg-gradient-to-r from-royal-violet to-electric-cyan text-white rounded-2xl shadow-2xl hover:shadow-electric-cyan/30 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-electric-cyan/30 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-royal-violet to-electric-cyan rounded-2xl animate-pulse opacity-75"></div>
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-royal-violet to-electric-cyan opacity-20 animate-ping"></div>
        </button>

        {/* Tooltip */}
        <div className={`absolute bottom-full right-0 mb-2 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 text-white text-sm px-3 py-2 rounded-xl whitespace-nowrap shadow-xl">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3 h-3 text-electric-cyan" />
              <span>Ask AI Assistant!</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <ModernChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatButton; 