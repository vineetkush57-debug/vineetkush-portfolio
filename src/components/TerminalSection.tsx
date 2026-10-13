import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGithubData } from '../hooks/useGithubData';
import { profileData } from '../data/profileData';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export const TerminalSection: React.FC = () => {
  const { repos } = useGithubData('vineetkush57-debug');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Welcome to Vineetkush CLI [Version 2.0.26]", type: "success" },
    { text: "Copyright (c) 2026 Vineetkush Pali. All rights reserved.", type: "output" },
    { text: "Type 'help' to discover available terminal commands.", type: "output" },
    { text: "", type: "output" }
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll terminal to bottom on content changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim();
      if (trimmedInput) {
        processCommand(trimmedInput.toLowerCase());
        setCommandHistory((prev) => [...prev, trimmedInput]);
      } else {
        // Just empty line entry
        setHistory((prev) => [...prev, { text: "", type: "input" }]);
      }
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const processCommand = (cmd: string) => {
    // Echo command input
    const newHistory: TerminalLine[] = [...history, { text: `visitor@vineetkush.dev:~$ ${input}`, type: "input" }];

    const args = cmd.split(' ');
    const primaryCmd = args[0];

    switch (primaryCmd) {
      case 'help':
        newHistory.push(
          { text: "Available commands:", type: "success" },
          { text: "  about      - Display background details on Vineet", type: "output" },
          { text: "  skills     - List current languages, libraries, and toolkits", type: "output" },
          { text: "  projects   - Showcase live git repositories and descriptions", type: "output" },
          { text: "  education  - Print out college enrollment details", type: "output" },
          { text: "  resume     - Log resume acquisition instruction details", type: "output" },
          { text: "  contact    - Log email, linkedin, and location links", type: "output" },
          { text: "  github     - Fetch current counts and status on GitHub profile", type: "output" },
          { text: "  linkedin   - Navigate and launch LinkedIn profile", type: "output" },
          { text: "  clear      - Wipe console buffer logs", type: "output" }
        );
        break;

      case 'about':
        newHistory.push(
          { text: "--- VINEETKUSH PALI ---", type: "success" },
          { text: profileData.about, type: "output" },
          { text: `Branch: ${profileData.education[0].major}`, type: "output" },
          { text: `Goal: ${profileData.careerGoal}`, type: "output" }
        );
        break;

      case 'skills':
        newHistory.push({ text: "--- TECHNICAL toolkit ---", type: "success" });
        profileData.skills.forEach((cat) => {
          newHistory.push({ text: `[${cat.category}]`, type: "success" });
          const skillList = cat.skills.map(s => `${s.name} (${s.level}%)`).join(', ');
          newHistory.push({ text: `  ${skillList}`, type: "output" });
        });
        break;

      case 'projects':
        newHistory.push({ text: "--- LIVE ARCHIVE PATHS ---", type: "success" });
        if (repos.length > 0) {
          repos.slice(0, 6).forEach((repo) => {
            newHistory.push(
              { text: `* ${repo.name.toUpperCase()} [${repo.language || 'Code'}]`, type: "success" },
              { text: `  Desc: ${repo.description || 'No description provided.'}`, type: "output" },
              { text: `  Link: ${repo.html_url}`, type: "output" }
            );
          });
          if (repos.length > 6) {
            newHistory.push({ text: `... and ${repos.length - 6} other public repositories.`, type: "output" });
          }
        } else {
          newHistory.push({ text: "No repositories loaded. GitHub API status offline.", type: "error" });
        }
        break;

      case 'education':
        const edu = profileData.education[0];
        newHistory.push(
          { text: "--- ACADEMIC PATHWAYS ---", type: "success" },
          { text: `Degree:      ${edu.degree}`, type: "output" },
          { text: `Institution: ${edu.institution}, ${edu.location}`, type: "output" },
          { text: `Duration:    ${edu.duration}`, type: "output" },
          { text: `Focus:       ${edu.details.join(', ')}`, type: "output" }
        );
        break;

      case 'resume':
        newHistory.push(
          { text: "Resume Request received.", type: "success" },
          { text: "Feel free to check out the Resume button in the Hero section or send Vineet an email at vineetkush57@gmail.com to obtain a PDF copy directly!", type: "output" }
        );
        break;

      case 'contact':
        newHistory.push(
          { text: "--- CHANNELS ---", type: "success" },
          { text: `Email:    ${profileData.socials.email}`, type: "output" },
          { text: `GitHub:   ${profileData.socials.github}`, type: "output" },
          { text: `LinkedIn: ${profileData.socials.linkedin}`, type: "output" },
          { text: `Location: ${profileData.socials.location}`, type: "output" }
        );
        break;

      case 'github':
        newHistory.push(
          { text: "GitHub User Account Information:", type: "success" },
          { text: `Username: vineetkush57-debug`, type: "output" },
          { text: `Link:     https://github.com/vineetkush57-debug`, type: "output" },
          { text: `Repos:    ${repos.length} public repos fetched`, type: "output" }
        );
        break;

      case 'linkedin':
        newHistory.push({ text: "Opening LinkedIn profile in a new browser tab...", type: "success" });
        setTimeout(() => {
          window.open(profileData.socials.linkedin, '_blank');
        }, 800);
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        newHistory.push({
          text: `Command not recognized: '${primaryCmd}'. Type 'help' to see list of valid commands.`,
          type: "error"
        });
        break;
    }

    setHistory(newHistory);
  };

  return (
    <section id="terminal" className="py-20 md:py-24 relative bg-slate-950/20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">07 / SHELL VIEW</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">Interactive Terminal</h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mt-3" />
        </div>

        {/* Terminal Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring' }}
          onClick={handleTerminalClick}
          className="w-full h-[400px] rounded-xl border border-slate-800 hover:border-cyan-500/40 bg-[#070b19]/80 backdrop-blur-md shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col overflow-hidden text-left cursor-text"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#03060f] border-b border-slate-900 select-none">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">shell@vineetkush: ~</span>
            <div className="w-8" /> {/* Spacer */}
          </div>

          {/* Console Buffer */}
          <div
            ref={containerRef}
            className="flex-grow p-5 overflow-y-auto font-mono text-xs md:text-sm space-y-1.5 scrollbar-thin select-text"
          >
            {history.map((line, idx) => {
              let color = 'text-slate-350';
              if (line.type === 'input') color = 'text-cyan-400';
              else if (line.type === 'error') color = 'text-red-400';
              else if (line.type === 'success') color = 'text-emerald-400 font-bold';

              return (
                <div key={idx} className={`${color} whitespace-pre-wrap`}>
                  {line.text}
                </div>
              );
            })}

            {/* Input prompt line */}
            <div className="flex items-center text-cyan-400">
              <span className="mr-2">visitor@vineetkush.dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-transparent border-none outline-none text-cyan-400 font-mono text-xs md:text-sm p-0 focus:ring-0"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
