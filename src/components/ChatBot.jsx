import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Bot, User, MapPin, Home, DollarSign, Phone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `# 🏡 Welcome to BoldEstate Assistant!

I'm your **AI real estate expert** 🏡

**I can help you with:**
• 🔍 **Property Search** - Find perfect homes
• 📊 **Market Insights** - Trends & pricing  
• 📍 **Location Intel** - Neighborhood info
• 💎 **Investment Tips** - Smart advice
• 🤝 **Agent Connect** - Expert introductions

**What can I help you find today?**`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateBotResponse = async (userMessage) => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return "I apologize, but I need to be properly configured to assist you. Please contact our support team.";
    }

    const realEstateContext = `
You are a professional real estate agent assistant for BoldEstate, a premium real estate platform in India. 

Our current featured properties include:
1. Luxury Sea View Apartment in Bandra West, Mumbai - ₹2.5 Cr (3BHK, 1,250 sq ft)
2. Modern Villa in Pune Hills, Lavale - ₹1.8 Cr (4BHK, 2,100 sq ft)  
3. Beachfront Villa in Calangute, Goa - ₹3.2 Cr (5BHK, 3,500 sq ft)
4. Premium Penthouse in BKC, Mumbai - ₹4.5 Cr (4BHK, 2,800 sq ft)
5. Eco-Friendly Smart Home in Kharadi, Pune - ₹1.2 Cr (3BHK, 1,400 sq ft)

We have expert agents: Rajesh Sharma, Priya Patel, Carlos Fernandes, Anita Kulkarni, Vikram Singh, and Maria D'Souza.

Guidelines:
- Be professional, helpful, and knowledgeable about Indian real estate
- Use Indian currency (₹ Crores/Lakhs) and measurements (sq ft)
- Provide specific property recommendations when asked
- Include market insights and investment advice
- Use markdown formatting for better readability
- Be conversational but maintain expertise
- If asked about properties outside our listings, provide general market advice
- Include relevant emojis to make responses engaging
- Offer to connect users with our agents when appropriate

User Query: ${userMessage}
`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: realEstateContext
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return `I apologize for the technical difficulty. As your real estate assistant, I can still help you with:

🏠 **Property Information**: We have amazing properties in Mumbai, Pune, and Goa
💰 **Price Range**: From ₹1.2 Cr to ₹4.5 Cr
📍 **Locations**: Bandra, BKC, Lavale, Kharadi, Calangute, Fontainhas

Would you like me to tell you about any specific property or location?`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botResponse = await generateBotResponse(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I apologize for the technical issue. Please try again or contact our support team.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { text: "Show me properties in Mumbai", icon: <MapPin className="w-4 h-4" /> },
    { text: "What's the market trend in Pune?", icon: <DollarSign className="w-4 h-4" /> },
    { text: "I need a 3BHK apartment", icon: <Home className="w-4 h-4" /> },
    { text: "Connect me with an agent", icon: <Phone className="w-4 h-4" /> }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end justify-end p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-sm h-[500px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-700/50 bg-gradient-to-r from-royal-violet/90 to-electric-cyan/90 rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">AI Assistant</h3>
              <p className="text-xs text-white/80">Real Estate Expert</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-royal-violet to-electric-cyan text-white' 
                      : 'bg-gray-700/50 text-electric-cyan'
                  }`}>
                    {message.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>
                  <div className={`rounded-xl p-3 backdrop-blur-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-royal-violet/90 to-electric-cyan/90 text-white'
                      : 'bg-gray-800/50 border border-gray-700/50 text-gray-100'
                  }`}>
                    {message.type === 'bot' ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown 
                          components={{
                            h1: ({children}) => <h1 className="text-base font-bold mb-2 text-white">{children}</h1>,
                            h2: ({children}) => <h2 className="text-sm font-bold mb-1 text-electric-cyan">{children}</h2>,
                            h3: ({children}) => <h3 className="text-sm font-semibold mb-1 text-electric-cyan">{children}</h3>,
                            p: ({children}) => <p className="mb-2 last:mb-0 text-gray-200 text-sm leading-relaxed">{children}</p>,
                            ul: ({children}) => <ul className="list-disc list-inside mb-2 text-gray-200 text-sm space-y-1">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal list-inside mb-2 text-gray-200 text-sm">{children}</ol>,
                            li: ({children}) => <li className="mb-0.5">{children}</li>,
                            strong: ({children}) => <strong className="font-semibold text-electric-cyan">{children}</strong>,
                            em: ({children}) => <em className="italic text-gray-300">{children}</em>,
                            code: ({children}) => <code className="bg-gray-700/50 text-electric-cyan px-1 py-0.5 rounded text-xs">{children}</code>
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 rounded-lg bg-gray-700/50 flex items-center justify-center">
                  <Bot className="w-3 h-3 text-electric-cyan" />
                </div>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-3 pb-2">
            <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
            <div className="grid grid-cols-1 gap-1.5">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question.text)}
                  className="flex items-center space-x-2 p-2 text-xs bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700/30 hover:border-electric-cyan/30 rounded-lg transition-all duration-200 text-left text-gray-300 hover:text-white group"
                >
                  <div className="text-electric-cyan group-hover:text-white transition-colors">
                    {question.icon}
                  </div>
                  <span className="flex-1">{question.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-gray-700/50">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about properties, market trends..."
                className="w-full resize-none bg-gray-800/50 border border-gray-700/50 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all backdrop-blur-sm"
                rows="1"
                style={{ minHeight: '38px', maxHeight: '80px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="w-9 h-9 bg-gradient-to-r from-royal-violet to-electric-cyan text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-electric-cyan/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot; 