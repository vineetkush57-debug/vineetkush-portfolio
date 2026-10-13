import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING VINEETKUSH_PORTFOLIO v2.0.26...",
  "CONNECTING TO GITHUB API GATEWAY...",
  "PARSING CORE BIO & PROFESSIONAL TIMELINE...",
  "INDEXING TECHNICAL STACK (PYTHON, REACT, ML)...",
  "ESTABLISHING TERMINAL COMMAND ENGINE...",
  "BOOTSTRAPPING LOCAL NLP AI ASSISTANT...",
  "RENDERING SYSTEM INTERFACES..."
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);

  useEffect(() => {
    // Progress increment timer
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        // Random increment
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 120);

    // Boot logs timing
    const logInterval = setInterval(() => {
      if (currentLogIdx < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[currentLogIdx]]);
        setCurrentLogIdx((prev) => prev + 1);
      } else {
        clearInterval(logInterval);
      }
    }, 250);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logInterval);
    };
  }, [currentLogIdx]);

  useEffect(() => {
    if (progress === 100 && logs.length === BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, logs, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 font-mono text-xs text-cyan-400 select-none">
      <div className="w-[90%] max-w-[500px] border border-cyan-500/20 bg-slate-900/60 p-6 rounded-lg backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Card header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="text-[10px] text-cyan-500/60 tracking-wider">SECURE BOOT INTERFACE</div>
        </div>

        {/* Log feed */}
        <div className="min-h-[140px] text-[11px] text-cyan-300/80 mb-6 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <AnimatePresence>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-start"
              >
                <span className="text-cyan-500 mr-2">&gt;</span>
                <span>{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {progress < 100 && (
            <div className="flex items-center">
              <span className="text-cyan-500 mr-2 animate-pulse">&gt;</span>
              <span className="w-1.5 h-3 bg-cyan-400 animate-[cursor-blink_1s_step-end_infinite]" />
            </div>
          )}
        </div>

        {/* Progress Metrics */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] text-cyan-400/80">
            <span>PROG: COMPILING STYLES & INTERFACES</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>

          {/* Progress bar container */}
          <div className="h-2 w-full bg-slate-950 rounded border border-cyan-500/10 overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
      
      {/* Footer info */}
      <div className="absolute bottom-6 text-[10px] text-slate-600 tracking-widest uppercase">
        System active © 2026 // Vineetkush Pali
      </div>
    </div>
  );
};
