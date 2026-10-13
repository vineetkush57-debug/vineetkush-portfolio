import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profileData';
import { FiAward, FiBook, FiCode, FiGithub, FiZap } from 'react-icons/fi';

export const Achievements: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'learning': return <FiZap className="w-5 h-5 text-yellow-400" />;
      case 'college': return <FiBook className="w-5 h-5 text-blue-400" />;
      case 'dsa': return <FiCode className="w-5 h-5 text-purple-400" />;
      case 'github': return <FiGithub className="w-5 h-5 text-cyan-400" />;
      default: return <FiAward className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="achievements" className="py-20 md:py-24 relative bg-slate-950/20">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">06 / MILESTONES</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">Achievements & Growth</h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mt-3" />
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {profileData.achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, type: 'spring' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => window.open(profileData.socials.driveFolder || profileData.socials.linkedin, '_blank', 'noopener,noreferrer')}
              className="glass-card p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 flex items-start space-x-4 relative overflow-hidden group cursor-pointer shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Outer icon box */}
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.1)] transition-all">
                {getIcon(item.iconName)}
              </div>

              <div className="space-y-1.5 flex-grow">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                    {item.date}
                  </span>
                </div>
                
                <p className="text-slate-455 text-xs leading-relaxed font-sans">
                  {item.description}
                </p>

                <div className="text-[9px] font-mono text-cyan-500/70 group-hover:text-cyan-400 flex items-center space-x-1 pt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Verify on Google Drive</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
