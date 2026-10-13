import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu } from 'react-icons/fi';
import { profileData } from '../data/profileData';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: profileData.aiResponses.greeting,
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll chat window to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    const userText = textToSend.trim();
    if (!userText) return;

    // 1. Add User Message
    const userMessage: Message = {
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // 2. Process Response with 600ms latency simulation
    setTimeout(() => {
      let replyText = profileData.aiResponses.fallback;
      const lower = userText.toLowerCase();

      if (lower.includes('skill') || lower.includes('languages') || lower.includes('toolkit')) {
        replyText = profileData.aiResponses.skills;
      } else if (lower.includes('project') || lower.includes('repos') || lower.includes('github')) {
        replyText = profileData.aiResponses.projects;
      } else if (lower.includes('college') || lower.includes('rungta') || lower.includes('bhilai')) {
        replyText = profileData.aiResponses.college;
      } else if (lower.includes('education') || lower.includes('b.tech') || lower.includes('branch') || lower.includes('study')) {
        replyText = profileData.aiResponses.education;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('linkedin') || lower.includes('reach')) {
        replyText = profileData.aiResponses.contact;
      } else if (lower.includes('resume') || lower.includes('cv')) {
        replyText = profileData.aiResponses.resume;
      } else if (lower.includes('career') || lower.includes('goal') || lower.includes('internship')) {
        replyText = profileData.aiResponses.career;
      } else if (lower.includes('role') || lower.includes('who is') || lower.includes('about')) {
        replyText = profileData.aiResponses.role;
      }

      const assistantMessage: Message = {
        text: replyText,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 600);
  };

  const suggestions = [
    "What are your skills?",
    "Tell me about Rungta College",
    "Show your projects",
    "How to contact you?"
  ];

  return (
    <>
      {/* Floating Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple text-slate-950 hover:brightness-110 shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer select-none transition-all"
        aria-label="Ask AI Assistant"
      >
        {isOpen ? <FiX className="w-5 h-5" /> : <FiMessageSquare className="w-5 h-5" />}
      </button>

      {/* Expanded Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[340px] max-w-[calc(100vw-2rem)] h-[450px] z-40 glass-panel border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#03060f] border-b border-slate-850 select-none">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400">
                  <FiCpu className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-display font-bold text-white">VINEET_BOT v1.0</h4>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">online agent</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 scrollbar-thin flex flex-col bg-slate-950/20">
              {messages.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[80%] text-xs text-left ${
                      isUser ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div
                      className={`px-3 py-2.5 rounded-lg leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-slate-950 font-medium rounded-br-none'
                          : 'bg-slate-900/80 border border-slate-800 text-slate-350 rounded-bl-none shadow'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[8px] font-mono text-slate-600 mt-1 select-none">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="self-start flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3.5 py-2.5 rounded-lg rounded-bl-none">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions & Input Tray */}
            <div className="p-3 border-t border-slate-850 bg-slate-950/45 space-y-3">
              {/* Suggestion Chips */}
              <div className="flex overflow-x-auto gap-1.5 no-scrollbar py-0.5 select-none">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="flex-shrink-0 px-2.5 py-1 text-[9px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex items-center space-x-2 border border-slate-800 bg-[#070b19] rounded-lg px-3 py-1.5">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none border-none p-0 focus:ring-0"
                />
                
                <button
                  onClick={() => handleSend(input)}
                  className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                  aria-label="Send message"
                >
                  <FiSend className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
