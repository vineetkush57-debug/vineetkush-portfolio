import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  FiSearch, FiCompass, FiMoon, FiSun, 
  FiGithub, FiLinkedin, FiTerminal, FiX, FiCheck 
} from 'react-icons/fi';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Actions' | 'Social Links';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  
  const paletteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle Command Palette Open/Close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearch('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Go to Home / Hero',
      subtitle: 'Scroll to the top spotlight',
      category: 'Navigation',
      icon: <FiCompass className="text-cyan-400" />,
      action: () => scrollToSection('home')
    },
    {
      id: 'nav-about',
      title: 'Go to About Me',
      subtitle: 'Who is Vineetkush Pali?',
      category: 'Navigation',
      icon: <FiCompass className="text-cyan-400" />,
      action: () => scrollToSection('about')
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills',
      subtitle: 'Technical capabilities dashboard',
      category: 'Navigation',
      icon: <FiCompass className="text-cyan-400" />,
      action: () => scrollToSection('skills')
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects',
      subtitle: 'View GitHub fetched repositories',
      category: 'Navigation',
      icon: <FiCompass className="text-cyan-400" />,
      action: () => scrollToSection('projects')
    },
    {
      id: 'nav-terminal',
      title: 'Go to Interactive Terminal',
      subtitle: 'Operate the portfolio via command line',
      category: 'Navigation',
      icon: <FiTerminal className="text-cyan-400" />,
      action: () => scrollToSection('terminal')
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      subtitle: 'Send a message or find social handles',
      category: 'Navigation',
      icon: <FiCompass className="text-cyan-400" />,
      action: () => scrollToSection('contact')
    },
    {
      id: 'action-theme',
      title: `Toggle Theme (Current: ${theme.toUpperCase()})`,
      subtitle: 'Switch between light and dark backgrounds',
      category: 'Actions',
      icon: theme === 'dark' ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-purple-400" />,
      action: () => toggleTheme()
    },
    {
      id: 'social-github',
      title: 'View GitHub Profile',
      subtitle: 'Open @vineetkush57-debug on GitHub',
      category: 'Social Links',
      icon: <FiGithub className="text-slate-400" />,
      action: () => window.open('https://github.com/vineetkush57-debug', '_blank')
    },
    {
      id: 'social-linkedin',
      title: 'View LinkedIn Profile',
      subtitle: 'Connect with Vineetkush on LinkedIn',
      category: 'Social Links',
      icon: <FiLinkedin className="text-blue-500" />,
      action: () => window.open('https://www.linkedin.com/in/vineetkush-pali-3b5674251/', '_blank')
    }
  ];

  // Filter commands by search input
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  // Close palette on clicking overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Launch shortcut indicator float */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center space-x-2 px-3 py-2 text-xs font-mono rounded-full border border-slate-700 bg-slate-900/80 text-slate-400 backdrop-blur hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all cursor-pointer select-none"
      >
        <FiSearch className="w-3.5 h-3.5" />
        <span className="hidden md:inline">Ctrl + K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 backdrop-blur-sm pt-20 px-4"
          >
            <motion.div
              ref={paletteRef}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl glass-panel rounded-xl overflow-hidden shadow-2xl border border-slate-800"
              onKeyDown={handleKeyDown}
            >
              {/* Header Input */}
              <div className="flex items-center space-x-3 px-4 py-3.5 border-b border-slate-800">
                <FiSearch className="text-slate-400 w-5 h-5 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-sm font-sans"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
                {filteredCommands.length > 0 ? (
                  (() => {
                    let currentCategory = '';
                    return filteredCommands.map((cmd, idx) => {
                      const showCategory = cmd.category !== currentCategory;
                      if (showCategory) {
                        currentCategory = cmd.category;
                      }

                      return (
                        <div key={cmd.id}>
                          {showCategory && (
                            <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                              {cmd.category}
                            </div>
                          )}
                          <div
                            onClick={() => {
                              cmd.action();
                              setIsOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                              idx === selectedIndex
                                ? 'bg-gradient-to-r from-slate-800/80 to-slate-800/40 text-slate-200 border-l-2 border-cyan-400 pl-2.5'
                                : 'text-slate-400 hover:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg flex-shrink-0">{cmd.icon}</span>
                              <div className="text-left">
                                <div className="text-xs font-medium font-sans">{cmd.title}</div>
                                <div className="text-[10px] text-slate-500 font-sans mt-0.5">{cmd.subtitle}</div>
                              </div>
                            </div>
                            {idx === selectedIndex && (
                              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-1.5 py-0.5 rounded">
                                <span>ENTER</span>
                                <FiCheck className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500 font-mono">
                    No commands matched your search terms.
                  </div>
                )}
              </div>

              {/* Navigation Hints Footer */}
              <div className="flex justify-between items-center px-4 py-2 border-t border-slate-800/50 bg-slate-900/30 text-[10px] text-slate-500 font-mono">
                <div className="flex items-center space-x-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </div>
                <span>ESC to Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
