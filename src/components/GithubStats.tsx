import React from 'react';
import { motion } from 'framer-motion';
import { useGithubData } from '../hooks/useGithubData';
import { FiUsers, FiBook, FiGitCommit, FiCode, FiAward } from 'react-icons/fi';

export const GithubStats: React.FC = () => {
  const { profile, repos, loading, error } = useGithubData('vineetkush57-debug');

  // Calculate languages percentage
  const getLanguagesStats = () => {
    const langCounts: { [key: string]: number } = {};
    let total = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        total++;
      }
    });

    return Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4); // Top 4 languages
  };

  const topLanguages = getLanguagesStats();

  if (loading || error || !profile) return null;

  return (
    <section id="github" className="py-20 md:py-24 relative bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">04 / METRICS</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">GitHub Operations</h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mt-3" />
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Profile Card & Language Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* GitHub Profile Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl border border-slate-800 text-left flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 relative"
            >
              <img
                src={profile.avatar_url}
                alt="Vineetkush Pali Avatar"
                className="w-20 h-20 rounded-full border border-slate-700/60"
              />
              <div className="space-y-3 flex-grow text-center sm:text-left">
                <div>
                  <h3 className="font-display font-bold text-white text-base">@{profile.login}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{profile.name || "Vineetkush Pali"}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {profile.bio || "Computer Science Engineering Student focusing on AI & ML frameworks and Python tools."}
                </p>

                {/* Follower Stats Row */}
                <div className="flex justify-center sm:justify-start items-center space-x-6 text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900/60">
                  <div className="flex items-center space-x-1.5">
                    <FiUsers className="w-3.5 h-3.5 text-cyan-400" />
                    <span><strong>{profile.followers}</strong> followers</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <FiUsers className="w-3.5 h-3.5 text-purple-400" />
                    <span><strong>{profile.following}</strong> following</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Top Languages Gauge Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 rounded-xl border border-slate-800 text-left"
            >
              <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4 border-b border-slate-800 pb-2">
                Top Code Languages
              </h3>

              <div className="space-y-4">
                {topLanguages.map((lang) => {
                  let barColor = 'bg-brand-blue';
                  if (lang.name.toLowerCase() === 'python') barColor = 'bg-yellow-400';
                  else if (lang.name.toLowerCase() === 'javascript') barColor = 'bg-yellow-300';
                  else if (lang.name.toLowerCase() === 'c++') barColor = 'bg-blue-600';
                  else if (lang.name.toLowerCase() === 'html') barColor = 'bg-orange-500';

                  return (
                    <div key={lang.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-300">{lang.name}</span>
                        <span className="text-slate-500">{lang.percentage}% ({lang.count} repos)</span>
                      </div>
                      <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className={`h-full ${barColor} rounded-full`} style={{ width: `${lang.percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* GitHub Activity & Contribution Mock Widget (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-xl border border-slate-800 text-left relative overflow-hidden"
            >
              {/* Card visual detail */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />

              <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-6 flex justify-between items-center border-b border-slate-800 pb-2">
                <span>Git Activity Feed</span>
                <span className="text-[10px] text-cyan-400 font-normal">SYNCED REPOS: {profile.public_repos}</span>
              </h3>

              {/* Grid cards for profile metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <motion.div whileHover={{ y: -4, borderColor: 'rgba(6,182,212,0.4)' }} className="p-3 bg-slate-950/40 border border-slate-900 rounded-lg text-center transition-all shadow-md hover:shadow-cyan-500/10 cursor-default">
                  <FiBook className="mx-auto text-cyan-400 w-4 h-4 mb-1" />
                  <span className="text-xl font-display font-extrabold text-white">{profile.public_repos}</span>
                  <div className="text-[8px] font-mono text-slate-500 uppercase mt-0.5">Repositories</div>
                </motion.div>
                <motion.div whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.4)' }} className="p-3 bg-slate-950/40 border border-slate-900 rounded-lg text-center transition-all shadow-md hover:shadow-purple-500/10 cursor-default">
                  <FiGitCommit className="mx-auto text-purple-400 w-4 h-4 mb-1" />
                  <span className="text-xl font-display font-extrabold text-white">24</span>
                  <div className="text-[8px] font-mono text-slate-500 uppercase mt-0.5">Contributions</div>
                </motion.div>
                <motion.div whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.4)' }} className="p-3 bg-slate-950/40 border border-slate-900 rounded-lg text-center transition-all shadow-md hover:shadow-blue-500/10 cursor-default">
                  <FiCode className="mx-auto text-blue-400 w-4 h-4 mb-1" />
                  <span className="text-xl font-display font-extrabold text-white">35+</span>
                  <div className="text-[8px] font-mono text-slate-500 uppercase mt-0.5">Alg Solved</div>
                </motion.div>
                <motion.div whileHover={{ y: -4, borderColor: 'rgba(234,179,8,0.4)' }} className="p-3 bg-slate-950/40 border border-slate-900 rounded-lg text-center transition-all shadow-md hover:shadow-yellow-500/10 cursor-default">
                  <FiAward className="mx-auto text-yellow-400 w-4 h-4 mb-1" />
                  <span className="text-xl font-display font-extrabold text-white">4</span>
                  <div className="text-[8px] font-mono text-slate-500 uppercase mt-0.5">Project Series</div>
                </motion.div>
              </div>

              {/* Visual Contribution Graph Mockup */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Contribution Matrix (Last 12 Months)
                </h4>
                {/* Horizontal row representation of contribution grid */}
                <div className="flex flex-col space-y-1.5 p-3 rounded-lg border border-slate-900/60 bg-slate-950/30">
                  {Array.from({ length: 4 }).map((_, rIdx) => (
                    <div key={rIdx} className="flex justify-between items-center space-x-1">
                      {Array.from({ length: 24 }).map((_, cIdx) => {
                        const isActive = (rIdx * 3 + cIdx * 2) % 11 === 0;
                        let color = 'bg-slate-900/40';
                        if (isActive) {
                          const intensity = (rIdx + cIdx * 3) % 3;
                          if (intensity === 0) color = 'bg-cyan-300';
                          else if (intensity === 1) color = 'bg-cyan-500';
                          else color = 'bg-cyan-800/80';
                        }
                        
                        return (
                          <div
                            key={cIdx}
                            className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-sm ${color} transition-colors hover:scale-110 cursor-pointer`}
                            title={isActive ? `Contribution active` : `No activity`}
                          />
                        );
                      })}
                    </div>
                  ))}
                  
                  {/* Calendar Legende */}
                  <div className="flex justify-end items-center space-x-1.5 pt-1.5 text-[8px] font-mono text-slate-600">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-sm bg-slate-900/40" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-950" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-800/80" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-300" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
