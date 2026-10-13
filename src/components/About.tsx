import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profileData';
import { FiBookOpen, FiCode, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { useGithubData } from '../hooks/useGithubData';

export const About: React.FC = () => {
  const { profile } = useGithubData('vineetkush57-debug');
  const interests = [
    { name: 'Learning New Tech', icon: <FiBookOpen className="text-cyan-400" /> },
    { name: 'Real-World Projects', icon: <FiCode className="text-blue-400" /> },
    { name: 'Problem Solving', icon: <FiTrendingUp className="text-purple-400" /> },
    { name: 'DSA & Algorithms', icon: <FiCode className="text-cyan-400" /> },
    { name: 'Artificial Intelligence', icon: <FiCpu className="text-purple-400" /> },
    { name: 'Machine Learning', icon: <FiCpu className="text-blue-400" /> },
    { name: 'Backend Systems', icon: <FiCode className="text-cyan-400" /> },
    { name: 'Web Applications', icon: <FiCode className="text-purple-400" /> },
    { name: 'Continuous Learning', icon: <FiTrendingUp className="text-blue-400" /> }
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="flex flex-col items-start mb-12 md:mb-16">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">01 / OVERVIEW</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">About Me</h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative description (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.h3 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl font-display font-semibold text-slate-200"
            >
              CS Engineering Student & AI/ML Enthusiast
            </motion.h3>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-sm md:text-base leading-relaxed font-sans"
            >
              I am pursuing my <strong>Bachelor of Technology (B.Tech)</strong> in <strong>Computer Science Engineering</strong> with a specialization in <strong>Artificial Intelligence & Machine Learning</strong> at <strong>Rungta College, Bhilai</strong>. I am driven by the curiosity of how computing models can adapt and solve complex computational challenges.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm md:text-base leading-relaxed font-sans"
            >
              {profileData.careerGoal}
            </motion.p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring' }}
                whileHover={{ y: -4, borderColor: 'rgba(6,182,212,0.4)' }}
                className="p-4 rounded-xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm transition-all shadow-lg hover:shadow-cyan-500/10 cursor-default"
              >
                <div className="text-2xl font-display font-extrabold text-cyan-400">B.Tech</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-1">Current Degree</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.4)' }}
                className="p-4 rounded-xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm transition-all shadow-lg hover:shadow-purple-500/10 cursor-default"
              >
                <div className="text-2xl font-display font-extrabold text-purple-400">AI & ML</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-1">Specialization</div>
              </motion.div>
            </div>
          </div>

          {/* Interests Floating Tags Display (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Photo & Identification Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring' }}
              whileHover={{ y: -4 }}
              className="gradient-border-card shadow-xl"
            >
              <div className="gradient-border-content p-6 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
                <div className="relative group flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-xl blur opacity-40 group-hover:opacity-75 transition-opacity" />
                  {profileData.socials.customAvatar || profile?.avatar_url ? (
                    <img 
                      src={profileData.socials.customAvatar || profile?.avatar_url} 
                      alt="Vineetkush Pali" 
                      className="w-24 h-24 rounded-xl border border-slate-800 relative z-10 hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-xl border border-slate-800 relative z-10 bg-slate-900 flex items-center justify-center text-slate-500 font-mono text-xs">
                      <svg className="w-10 h-10 text-cyan-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="space-y-2 mt-1 select-none">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">IDENTIFICATION PROFILE</div>
                  <h4 className="font-display font-extrabold text-base text-white">Vineetkush Pali</h4>
                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed uppercase tracking-wider">
                    B.Tech CSE (AI & ML)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interests Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-xl border border-slate-800 shadow-xl relative overflow-hidden"
            >
              {/* Card visual details */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />

              <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-6 text-left">
                Interests & Focus Areas
              </h4>

              <div className="flex flex-wrap gap-2.5">
                {interests.map((interest, idx) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 px-3 py-2 text-xs rounded-lg bg-slate-950/60 border border-slate-850 hover:border-cyan-500/30 hover:shadow-[0_0_12px_rgba(6,182,212,0.06)] text-slate-300 hover:text-white transition-all cursor-default select-none"
                  >
                    <span>{interest.icon}</span>
                    <span className="font-mono text-[11px]">{interest.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
