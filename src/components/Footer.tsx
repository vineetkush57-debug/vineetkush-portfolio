import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-12 relative select-none">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
        <div>
          Designed & Developed by <span className="text-slate-350 font-bold">Vineetkush Pali</span>
        </div>
        <div>
          Copyright © 2026 &bull; All rights reserved.
        </div>
      </div>

      {/* Back to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-24 z-40 p-3 rounded-full border border-slate-700 bg-slate-900/80 text-slate-400 backdrop-blur hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all cursor-pointer select-none"
          aria-label="Back to Top"
        >
          <FiArrowUp className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </footer>
  );
};
