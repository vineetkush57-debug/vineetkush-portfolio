import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profileData';
import { FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 md:py-24 relative bg-slate-950/20">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">05 / PROGRESSION</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">Education Timeline</h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mt-3" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative ml-4 md:ml-6 space-y-12 pb-4 text-left">
          {/* Glowing Continuous Laser Beam Track */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_10px_rgba(6,182,212,0.6)]" />

          {profileData.education.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring' }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline marker with pulsing halo */}
              <div className="absolute -left-[7px] top-2 w-4 h-4 rounded-full border-2 border-cyan-400 bg-slate-950 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(6,182,212,0.8)] z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute opacity-75" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 z-10" />
              </div>

              {/* Card Container with subtle hover tilt */}
              <motion.div 
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="glass-card p-6 md:p-8 rounded-xl border border-slate-850 hover:border-cyan-500/30 relative overflow-hidden transition-all duration-300 shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Visual top border glow */}
                <div className="h-[1.5px] bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple w-full absolute top-0 left-0" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-base md:text-lg text-white">
                      {item.degree}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400">
                      {item.major}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-right md:text-right text-[10px] font-mono text-slate-500 flex flex-col md:items-end">
                    <div className="flex items-center space-x-1.5">
                      <FiBookOpen className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-slate-350">{item.institution}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FiMapPin className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-slate-400">{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FiCalendar className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-cyan-500/80">{item.duration}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs md:text-sm text-slate-400 font-sans list-disc list-inside border-t border-slate-900/60 pt-4">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="leading-relaxed hover:text-slate-300 transition-colors">
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
