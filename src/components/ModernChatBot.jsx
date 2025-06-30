import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, MapPin, Home, DollarSign, Phone, Sparkles, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ModernChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `**🏡 Welcome to BoldEstate AI**

I'm your **smart real estate assistant** ready to help you find the perfect property!

**I can assist with:**
• 🔍 **Property Search** - Find your dream home
• 📊 **Market Analysis** - Latest trends & prices  
• 📍 **Area Insights** - Neighborhood details
• 💡 **Investment Tips** - Expert advice
• 🤝 **Agent Connect** - Meet our specialists

**What would you like to explore today?**`,
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'quickQuestions',
      content: '',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Check for Speech API support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      setSpeechSupported(true);
      
      // Initialize Speech Recognition
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Speech-to-Text functionality
  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Text-to-Speech functionality with natural pauses
  const speakText = (text) => {
    if (!speechSupported || isSpeaking) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Clean text for better speech
    const cleanText = text
      // Remove markdown formatting but keep the content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold asterisks but keep text
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic asterisks but keep text
      .replace(/#{1,6}\s*/g, '')       // Remove headers
      .replace(/`(.*?)`/g, '$1')       // Remove code formatting
      
      // Remove all emojis (comprehensive regex)
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      
      // Remove bullet points and special characters
      .replace(/[•·▪▫◦‣⁃]/g, '')
      .replace(/[→←↑↓]/g, '')
      
      // Remove common symbols that don't sound good
      .replace(/[₹$€£¥]/g, 'rupees ')
      .replace(/[%]/g, ' percent ')
      .replace(/[&]/g, ' and ')
      .replace(/[@#]/g, '')
      
      // Remove awkward punctuation but keep sentence structure
      .replace(/[-_]/g, ' ')
      .replace(/[()[\]{}]/g, ' ')
      .replace(/["""''']/g, ' ')
      
      // Clean up spacing and line breaks
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!cleanText) return;
    
    // Split into sentences for natural pauses
    const sentences = cleanText
      .split(/(?<=[.!?])\s+/)
      .filter(sentence => sentence.trim().length > 0)
      .map(sentence => sentence.trim());
    
    if (sentences.length === 0) return;
    
    setIsSpeaking(true);
    let currentIndex = 0;
    
    const speakNextSentence = () => {
      if (currentIndex >= sentences.length) {
        setIsSpeaking(false);
        return;
      }
      
      const sentence = sentences[currentIndex];
      const utterance = new SpeechSynthesisUtterance(sentence);
      
      utterance.rate = 0.8; // Slower, more natural pace
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.lang = 'en-US';
      
      utterance.onend = () => {
        currentIndex++;
        
        if (currentIndex < sentences.length) {
          // Natural pause between sentences (500ms for periods, 300ms for commas within sentences)
          const pauseDuration = sentence.match(/[.!?]$/) ? 600 : 300;
          setTimeout(speakNextSentence, pauseDuration);
        } else {
          setIsSpeaking(false);
        }
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      // Handle commas within sentences with brief pauses
      const sentenceWithPauses = sentence.replace(/,/g, ', '); // Slight space after comma
      utterance.text = sentenceWithPauses;
      
      window.speechSynthesis.speak(utterance);
    };
    
    speakNextSentence();
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const generateBotResponse = async (userMessage) => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return `**🔧 Setup Needed**

I need my API key to provide intelligent responses. 

**Meanwhile, I can help with:**
• 🏠 **Available Properties**: Mumbai, Pune, Goa locations
• 💰 **Price Range**: ₹1.2 Cr to ₹4.5 Cr  
• 📞 **Expert Agents**: Ready to assist you

What type of property interests you?`;
    }

    const realEstateContext = `You are an expert AI real estate assistant for BoldEstate, India's premium property platform.

AVAILABLE PROPERTIES:
1. Luxury Sea View Apartment, Bandra West, Mumbai - ₹2.5 Cr (3BHK, 1,250 sq ft)
2. Modern Villa, Pune Hills, Lavale - ₹1.8 Cr (4BHK, 2,100 sq ft)  
3. Beachfront Villa, Calangute, Goa - ₹3.2 Cr (5BHK, 3,500 sq ft)
4. Premium Penthouse, BKC, Mumbai - ₹4.5 Cr (4BHK, 2,800 sq ft)
5. Eco-Smart Home, Kharadi, Pune - ₹1.2 Cr (3BHK, 1,400 sq ft)

EXPERT AGENTS: Rajesh Sharma, Priya Patel, Carlos Fernandes, Anita Kulkarni, Vikram Singh, Maria D'Souza

RESPONSE STYLE:
- Professional yet conversational tone
- Use Indian currency (₹ Crores/Lakhs) and sq ft measurements
- Include relevant emojis for engagement
- Provide specific property recommendations
- Use markdown formatting with headers and bullets
- Keep responses concise but informative
- Offer to connect with agents when appropriate

User Query: ${userMessage}`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: realEstateContext }] }]
        })
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return `**🏠 Property Information Available**

I can help you with our current listings:

**💎 Premium Options:**
• Mumbai: Sea view apartments, BKC penthouses
• Pune: Hill villas, smart homes  
• Goa: Beachfront properties

**💰 Price Range:** ₹1.2 Cr - ₹4.5 Cr

Which location interests you most?`;
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
      
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: botResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "**⚠️ Technical Issue**\n\nPlease try again or contact our support team.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { text: "Show Mumbai properties", icon: <MapPin className="w-3 h-3" /> },
    { text: "3BHK under ₹2 Cr", icon: <Home className="w-3 h-3" /> },
    { text: "Market trends 2024", icon: <DollarSign className="w-3 h-3" /> },
    { text: "Connect with agent", icon: <Phone className="w-3 h-3" /> }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-end justify-end p-4 z-50">
      <div className="bg-gray-950/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl shadow-2xl w-full max-w-md h-[520px] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800/30 bg-gradient-to-r from-royal-violet/10 to-electric-cyan/10 rounded-t-3xl">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-r from-royal-violet to-electric-cyan rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">BoldEstate AI</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-gray-400">
                  {speechSupported ? 'Voice enabled' : 'Online now'}
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800/50 rounded-xl transition-all duration-200 text-gray-400 hover:text-white group"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                
                {/* Quick Questions as Chat Bubbles */}
                {message.type === 'quickQuestions' ? (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-electric-cyan" />
                      </div>
                      <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
                        <p className="text-xs text-gray-400 mb-3">Quick questions to get started:</p>
                        <div className="grid grid-cols-1 gap-2">
                          {quickQuestions.map((question, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setInputMessage(question.text);
                                // Remove quick questions after selection
                                setMessages(prev => prev.filter(msg => msg.type !== 'quickQuestions'));
                              }}
                              className="flex items-center space-x-3 p-3 text-sm bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700/30 hover:border-electric-cyan/30 rounded-xl transition-all duration-200 text-gray-300 hover:text-white group text-left"
                            >
                              <div className="text-electric-cyan group-hover:text-white transition-colors">
                                {question.icon}
                              </div>
                              <span className="flex-1">{question.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular Message Bubbles */
                  <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-royal-violet to-electric-cyan shadow-lg' 
                        : 'bg-gray-800/50 border border-gray-700/50'
                    }`}>
                      {message.type === 'user' ? 
                        <User className="w-4 h-4 text-white" /> : 
                        <Bot className="w-4 h-4 text-electric-cyan" />
                      }
                    </div>

                    {/* Message Bubble */}
                    <div className={`rounded-2xl p-4 backdrop-blur-sm relative ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-royal-violet/90 to-electric-cyan/90 text-white shadow-lg'
                        : 'bg-gray-900/50 border border-gray-800/50 text-gray-100'
                    }`}>
                      {message.type === 'bot' ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown 
                            components={{
                              h1: ({children}) => <h1 className="text-sm font-bold mb-2 text-white">{children}</h1>,
                              h2: ({children}) => <h2 className="text-sm font-semibold mb-2 text-electric-cyan">{children}</h2>,
                              h3: ({children}) => <h3 className="text-xs font-semibold mb-1 text-electric-cyan">{children}</h3>,
                              p: ({children}) => <p className="mb-2 last:mb-0 text-gray-200 text-sm leading-relaxed">{children}</p>,
                              ul: ({children}) => <ul className="list-none mb-2 text-gray-200 text-sm space-y-1">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal list-inside mb-2 text-gray-200 text-sm">{children}</ol>,
                              li: ({children}) => <li className="mb-1 flex items-start">{children}</li>,
                              strong: ({children}) => <strong className="font-semibold text-electric-cyan">{children}</strong>,
                              em: ({children}) => <em className="italic text-gray-300">{children}</em>,
                              code: ({children}) => <code className="bg-gray-800/50 text-electric-cyan px-2 py-1 rounded text-xs">{children}</code>
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                          
                          {/* TTS Button for Bot Messages */}
                          {speechSupported && (
                            <button
                              onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
                              className="absolute top-2 right-2 p-1.5 hover:bg-gray-800/50 rounded-lg transition-all duration-200 text-gray-400 hover:text-electric-cyan group"
                              title={isSpeaking ? "Stop speaking" : "Read aloud"}
                            >
                              {isSpeaking ? 
                                <VolumeX className="w-3 h-3" /> : 
                                <Volume2 className="w-3 h-3" />
                              }
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading Animation */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-electric-cyan" />
                </div>
                <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-electric-cyan rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-electric-cyan rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-electric-cyan rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800/30">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? "Listening..." : "Ask about properties, prices, locations..."}
                className={`w-full resize-none bg-gray-900/50 border rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-cyan/30 focus:border-electric-cyan/30 transition-all backdrop-blur-sm ${
                  isListening ? 'border-electric-cyan/50 bg-electric-cyan/5' : 'border-gray-800/50'
                }`}
                rows="1"
                style={{ minHeight: '44px', maxHeight: '88px' }}
              />
            </div>
            
            {/* Microphone Button */}
            {speechSupported && (
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group ${
                  isListening 
                    ? 'bg-electric-cyan text-gray-950 shadow-lg shadow-electric-cyan/25' 
                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-electric-cyan hover:border-electric-cyan/30'
                }`}
                title={isListening ? "Stop listening" : "Voice input"}
              >
                {isListening ? 
                  <MicOff className="w-4 h-4" /> : 
                  <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
                }
              </button>
            )}
            
            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="w-11 h-11 bg-gradient-to-r from-royal-violet to-electric-cyan text-white rounded-2xl flex items-center justify-center hover:shadow-lg hover:shadow-electric-cyan/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          {/* Voice Status Indicator */}
          {isListening && (
            <div className="flex items-center justify-center mt-2 text-xs text-electric-cyan">
              <div className="flex space-x-1 mr-2">
                <div className="w-1 h-3 bg-electric-cyan rounded-full animate-pulse"></div>
                <div className="w-1 h-4 bg-electric-cyan rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-3 bg-electric-cyan rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              </div>
              Listening... Tap microphone to stop
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernChatBot; 