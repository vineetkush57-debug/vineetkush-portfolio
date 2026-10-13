import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGithubData } from '../hooks/useGithubData';
import { FiGithub, FiExternalLink, FiSearch, FiStar, FiGitBranch, FiFolder, FiX, FiActivity } from 'react-icons/fi';
import { SiPython, SiReact, SiJavascript, SiCplusplus, SiHtml5 } from 'react-icons/si';
import { profileData } from '../data/profileData';

export const Projects: React.FC = () => {
  const { repos, loading, error } = useGithubData('vineetkush57-debug');
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Derive unique languages for filtering
  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))) as string[]];

  // Filter repositories
  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) || 
      (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()));
    
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    
    return matchesSearch && matchesLang;
  });

  // Helper to format project names cleanly (e.g. my-project -> My Project)
  const formatProjectName = (name: string) => {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  // Helper to draw clean visual cards based on primary coding language
  const renderProjectHeader = (language: string | null) => {
    let gradient = 'from-brand-blue/30 to-brand-purple/20';
    let icon = <FiFolder className="text-slate-400 w-10 h-10" />;

    if (language) {
      switch (language.toLowerCase()) {
        case 'python':
          gradient = 'from-yellow-500/20 via-blue-600/10 to-slate-900';
          icon = <SiPython className="text-yellow-400 w-10 h-10 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]" />;
          break;
        case 'javascript':
          gradient = 'from-yellow-400/25 to-slate-900';
          icon = <SiJavascript className="text-yellow-300 w-10 h-10" />;
          break;
        case 'typescript':
        case 'react':
          gradient = 'from-cyan-400/20 via-blue-600/10 to-slate-900';
          icon = <SiReact className="text-cyan-400 w-10 h-10 animate-[spin_10s_linear_infinite]" />;
          break;
        case 'c++':
        case 'cpp':
          gradient = 'from-blue-700/20 to-slate-900';
          icon = <SiCplusplus className="text-blue-500 w-10 h-10" />;
          break;
        case 'html':
        case 'css':
          gradient = 'from-orange-500/20 to-slate-900';
          icon = <SiHtml5 className="text-orange-400 w-10 h-10" />;
          break;
      }
    }

    return (
      <div className={`h-40 bg-gradient-to-br ${gradient} w-full flex items-center justify-center relative overflow-hidden border-b border-slate-900/60`}>
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="z-10 flex flex-col items-center space-y-2">
          {icon}
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-950/65 px-2.5 py-0.5 rounded border border-slate-800/80">
            {language || 'RESOURCE'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 md:mb-16">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">03 / SHOWCASE</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">Projects Archive</h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mt-3" />
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-mono rounded-lg border border-slate-800 bg-slate-900/40 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
            />
          </div>

          {/* Language filter pills */}
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-all border cursor-pointer ${
                  selectedLanguage === lang
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-slate-950 border-transparent font-bold'
                    : 'bg-slate-900/30 border-slate-850 text-slate-400 hover:text-slate-250 hover:border-slate-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
            <span className="text-xs font-mono text-slate-500 tracking-wider">RETRIEVING LIVE REPOSITORIES...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16 text-center border border-red-500/10 bg-red-950/10 rounded-xl max-w-xl mx-auto">
            <span className="text-xs font-mono text-red-400">Error loading GitHub repositories: {error}</span>
            <p className="text-[10px] font-mono text-slate-500 mt-2">Displaying direct links or fallback content may be required.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            {filteredRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.map((repo, idx) => (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.4), type: 'spring' }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedProject(repo)}
                    className="glass-card rounded-xl border border-slate-800/80 hover:border-cyan-500/40 overflow-hidden flex flex-col h-full cursor-pointer relative shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group"
                  >
                    {/* Repository graphical header */}
                    {renderProjectHeader(repo.language)}

                    {/* Content body */}
                    <div className="p-5 flex-grow flex flex-col justify-between text-left space-y-4">
                      <div className="space-y-2">
                        {/* Title & Stars row */}
                        <div className="flex justify-between items-start">
                          <h3 className="font-display font-bold text-sm text-white hover:text-cyan-400 transition-colors line-clamp-1">
                            {formatProjectName(repo.name)}
                          </h3>
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center space-x-1 text-[10px] font-mono text-yellow-400 bg-yellow-950/30 border border-yellow-900/40 px-1.5 py-0.5 rounded">
                              <FiStar className="fill-yellow-400 w-2.5 h-2.5" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 text-xs font-sans line-clamp-3 leading-relaxed">
                          {repo.description || "No description provided. Click below to inspect the codebase and learn more about this repository."}
                        </p>
                      </div>

                      {/* Tag list & Action links */}
                      <div className="space-y-4 pt-2">
                        {/* Topics/Tags */}
                        {repo.topics && repo.topics.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {repo.topics.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/20 px-1.5 py-0.5 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        ) : repo.language ? (
                          <span className="text-[9px] font-mono text-slate-500 bg-slate-900/40 border border-slate-850 px-1.5 py-0.5 rounded">
                            #{repo.language.toLowerCase()}
                          </span>
                        ) : null}

                        {/* Button Row */}
                        <div className="flex items-center space-x-3 pt-1 border-t border-slate-900/60">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Stop modal from opening
                            className="flex items-center space-x-1 px-3 py-1.5 text-[10px] font-mono rounded bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                          >
                            <FiGithub className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>

                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center space-x-1 px-3 py-1.5 text-[10px] font-mono rounded bg-cyan-950/30 border border-cyan-900/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:border-transparent transition-all cursor-pointer font-semibold"
                            >
                              <FiExternalLink className="w-3.5 h-3.5" />
                              <span>Live</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-xs font-mono text-slate-500">
                No repositories match your current filter.
              </div>
            )}
          </>
        )}

        {/* Repository detail modal */}
        <AnimatePresence>
          {selectedProject && (() => {
            const isFeatured = 'tech' in selectedProject;
            return (
              <div
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-xl glass-panel border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative"
                >
                  {/* Header section with graphic */}
                  {renderProjectHeader(isFeatured ? (selectedProject.name.toLowerCase().includes('chatbot') ? 'react' : 'python') : selectedProject.language)}
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950/70 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800/80 z-20"
                  >
                    <FiX className="w-4 h-4" />
                  </button>

                  {/* Content info */}
                  <div className="p-6 md:p-8 space-y-6 text-left">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-extrabold text-xl text-white">
                          {isFeatured ? selectedProject.name : formatProjectName(selectedProject.name)}
                        </h3>
                        <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 border border-cyan-800/50 px-2 py-0.5 rounded-full uppercase">
                          {isFeatured ? 'Featured Project' : (selectedProject.language || 'REPOSITORY')}
                        </span>
                      </div>

                      {!isFeatured ? (
                        <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-500">
                          <span className="flex items-center space-x-1">
                            <FiStar className="w-3.5 h-3.5 fill-slate-700 stroke-slate-500" />
                            <span>{selectedProject.stargazers_count} stars</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FiGitBranch className="w-3.5 h-3.5" />
                            <span>{selectedProject.forks_count} forks</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FiActivity className="w-3.5 h-3.5" />
                            <span>{(selectedProject.size / 1024).toFixed(1)} MB</span>
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-500">
                          <span>Duration: <strong className="text-cyan-400">{selectedProject.duration}</strong></span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-900 pb-1.5">
                        Overview Description
                      </h4>
                      <p className="text-slate-350 text-xs md:text-sm font-sans leading-relaxed">
                        {selectedProject.description}
                      </p>
                      {isFeatured && selectedProject.details && (
                        <ul className="list-disc list-inside space-y-1 mt-2 text-xs text-slate-400 leading-relaxed">
                          {selectedProject.details.map((detail: string, dIdx: number) => (
                            <li key={dIdx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Metadata timeline */}
                    {!isFeatured && (
                      <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-500 border-t border-slate-900/60 pt-4">
                        <div>
                          <div>CREATED:</div>
                          <div className="text-slate-300 mt-0.5">{new Date(selectedProject.created_at).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div>LAST UPDATE:</div>
                          <div className="text-slate-300 mt-0.5">{new Date(selectedProject.updated_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    )}

                    {/* Links Row */}
                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-900/60">
                      <a
                        href={isFeatured ? profileData.socials.github : selectedProject.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-mono rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
                      >
                        <FiGithub className="w-4 h-4" />
                        <span>{isFeatured ? 'Code on GitHub' : 'Repository Code'}</span>
                      </a>
                      
                      {!isFeatured && selectedProject.homepage && (
                        <a
                          href={selectedProject.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-mono rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all cursor-pointer"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          <span>Launch Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
};
