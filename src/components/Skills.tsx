import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profileData';
import { 
  SiPython, SiCplusplus, SiJavascript, SiHtml5, SiCss, 
  SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMysql, 
  SiMongodb, SiGit, SiGithub, SiLinux 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FiCode, FiTrendingUp } from 'react-icons/fi';

export const Skills: React.FC = () => {
  const getSkillIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'python': return <SiPython className="text-yellow-400" />;
      case 'java': return <FaJava className="text-red-500" />;
      case 'cpp': return <SiCplusplus className="text-blue-600" />;
      case 'javascript': return <SiJavascript className="text-yellow-300" />;
      case 'html': return <SiHtml5 className="text-orange-500" />;
      case 'css': return <SiCss className="text-blue-400" />;
      case 'react': return <SiReact className="text-cyan-400" />;
      case 'tailwind': return <SiTailwindcss className="text-cyan-300" />;
      case 'nodejs': return <SiNodedotjs className="text-green-500" />;
      case 'express': return <SiExpress className="text-slate-400" />;
      case 'mysql': return <SiMysql className="text-blue-500" />;
      case 'mongodb': return <SiMongodb className="text-green-600" />;
      case 'git': return <SiGit className="text-orange-600" />;
      case 'github': return <SiGithub className="text-white" />;
      case 'vscode': return <FiCode className="text-blue-400" />;
      case 'linux': return <SiLinux className="text-yellow-500" />;
      case 'dsa': return <FiCode className="text-cyan-400" />;
      case 'problem': return <FiTrendingUp className="text-purple-400" />;
      default: return <FiCode className="text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-slate-950/20">
      {/* Glow highlight */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="flex flex-col items-start mb-12 md:mb-16">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">02 / EXPERTISE</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">Skills & Toolkit</h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mt-3" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.skills.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1, type: 'spring', bounce: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 flex flex-col justify-between shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <div>
                <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-6 text-left border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>{category.category}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">MODULE {catIdx + 1}</span>
                </h3>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5 text-left group/skill">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center space-x-2 text-slate-350 group-hover/skill:text-cyan-300 transition-colors">
                          <span className="text-sm group-hover/skill:scale-110 transition-transform">{getSkillIcon(skill.iconName)}</span>
                          <span className="font-mono text-[11px]">{skill.name}</span>
                        </div>
                        <span className="font-mono text-[10px] text-cyan-400/80 font-semibold">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Track */}
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden relative shadow-inner">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-cyan-300 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
