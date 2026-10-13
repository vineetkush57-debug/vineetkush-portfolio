import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check if page scrolled
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#education' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-900/30">
        <div
          className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-lg md:text-xl font-display font-extrabold tracking-wider bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent hover:brightness-110 transition-all select-none"
        >
          VINEETKUSH<span className="text-slate-500 dark:text-slate-400 font-normal">.dev</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 hover:text-cyan-550 dark:hover:text-cyan-400 hover:text-glow-cyan transition-all uppercase tracking-widest"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Toolbar (Theme Toggle, Social Links, Mobile Menu button) */}
        <div className="flex items-center space-x-3.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 hover:text-cyan-550 dark:hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </button>

          {/* Social Icons (Desktop only) */}
          <a
            href="https://github.com/vineetkush57-debug"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 hover:text-cyan-550 dark:hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
            aria-label="GitHub Profile"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/vineetkush-pali-3b5674251/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 hover:text-cyan-550 dark:hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 hover:text-cyan-550 dark:hover:text-cyan-400 transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <FiX className="w-4.5 h-4.5" /> : <FiMenu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-550 dark:hover:text-cyan-400 transition-colors uppercase tracking-widest py-1.5"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Social Row */}
              <div className="flex space-x-6 pt-4 border-t border-slate-200 dark:border-slate-900 w-full justify-center">
                <a
                  href="https://github.com/vineetkush57-debug"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 hover:text-cyan-550 dark:hover:text-cyan-400 transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/vineetkush-pali-3b5674251/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 hover:text-cyan-550 dark:hover:text-cyan-400 transition-colors"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
