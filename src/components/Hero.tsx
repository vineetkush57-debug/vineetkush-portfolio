import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiMail } from 'react-icons/fi';
import { useGithubData } from '../hooks/useGithubData';
import { profileData } from '../data/profileData';

const TYPING_ROLES = [
  "Software Engineer in Progress",
  "AI & ML Student",
  "Python Developer",
  "Future Full Stack Developer"
];

export const Hero: React.FC = () => {
  const { profile } = useGithubData('vineetkush57-debug');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Typing animation states
  const [roleText, setRoleText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer: number;
    const currentFullText = TYPING_ROLES[roleIdx];
    
    const type = () => {
      setRoleText((prev) => {
        if (isDeleting) {
          // Delete characters
          if (prev.length === 0) {
            setIsDeleting(false);
            setRoleIdx((idx) => (idx + 1) % TYPING_ROLES.length);
            return '';
          }
          return prev.substring(0, prev.length - 1);
        } else {
          // Type characters
          if (prev.length === currentFullText.length) {
            // Wait before starting to delete
            timer = setTimeout(() => setIsDeleting(true), 1500);
            return prev;
          }
          return currentFullText.substring(0, prev.length + 1);
        }
      });
      
      const speed = isDeleting ? 40 : 100;
      if (roleText.length === currentFullText.length && !isDeleting) {
        // Paused state handled by timeout above
      } else {
        timer = setTimeout(type, speed);
      }
    };
    
    timer = setTimeout(type, isDeleting ? 40 : 120);
    return () => clearTimeout(timer);
  }, [roleText, roleIdx, isDeleting]);

  // Interactive Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor(width / 20));
    const connectionDistance = 110;
    
    const mouse = { x: -9999, y: -9999, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off bounds
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interactive mouse push
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'rgba(6, 182, 212, 0.4)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid indicator lightly
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw cursor connections
      if (mouse.x > 0 && mouse.y > 0) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius * 0.8) {
            const alpha = (1 - dist / (mouse.radius * 0.8)) * 0.15;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 md:w-96 h-64 md:h-96 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left py-12">
        {/* Hero Copy (8 columns on large screens) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Row: Large Glowing Portrait Showcase + Status Badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-2">
            {/* Glowing High-Impact Profile Image (significantly bigger) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="relative group flex-shrink-0"
            >
              {/* Dynamic Multi-layered Ambient Pulse Aura Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-90 transition-opacity duration-500 animate-pulse" />
              
              {/* High-tech Gradient Frame */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-2xl md:rounded-3xl p-1 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-cyan-500/25 group-hover:shadow-cyan-500/50 transition-all duration-500">
                <div className="w-full h-full rounded-[14px] md:rounded-[22px] overflow-hidden bg-slate-950 relative">
                  {profileData.socials.customAvatar || profile?.avatar_url ? (
                    <img 
                      src={profileData.socials.customAvatar || profile?.avatar_url} 
                      alt="Vineetkush Pali" 
                      className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500">
                      <svg className="w-16 h-16 text-cyan-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  {/* Subtle Inner Lens Vignette */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-[14px] md:rounded-[22px] pointer-events-none" />
                </div>

                {/* Floating Status Badge (Pulsing Green) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-2.5 -right-2.5 bg-slate-950/90 backdrop-blur-md border border-emerald-500/50 px-2.5 py-1 rounded-full shadow-lg flex items-center space-x-1.5 z-20"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-mono font-medium text-emerald-300">Open to Work</span>
                </motion.div>

                {/* Floating Tech Pill Badge (Top Left) */}
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-2.5 -left-2.5 bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 px-2.5 py-1 rounded-full shadow-lg hidden sm:flex items-center space-x-1 z-20"
                >
                  <span className="text-[10px] font-mono text-cyan-300 font-semibold">AI &bull; ML &bull; Dev</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Status & Education Badges Column */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 text-[11px] font-mono tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 rounded-full backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>PORTFOLIO ACTIVE &bull; ONLINE</span>
              </motion.div>

              <div className="flex flex-col space-y-1 text-left">
                <span className="text-xs font-mono text-slate-300 flex items-center space-x-2">
                  <span className="text-purple-400 font-bold">&#9670;</span>
                  <span>Rungta College of Engg & Tech</span>
                </span>
                <span className="text-xs font-mono text-cyan-400 flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">&#9670;</span>
                  <span>B.Tech CSE (AI & ML) &bull; SPI: 8</span>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm md:text-base font-mono text-slate-400 tracking-wide"
            >
              Hi, my name is
            </motion.h3>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white"
            >
              Vineetkush Pali
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-8 md:h-10 flex items-center"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-cyan-400 font-semibold tracking-wide flex items-center">
                <span>{roleText}</span>
                <span className="ml-1 w-2.5 h-5 bg-cyan-400 animate-[cursor-blink_1s_step-end_infinite]" />
              </h2>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-xl text-sm md:text-base text-slate-400 leading-relaxed font-sans"
          >
            Pursuing a Bachelor of Technology in Computer Science Engineering (AI & ML) at Rungta College, Bhilai. 
            Passionate about crafting intelligent systems, structuring clean backend models, and developing full stack solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#projects"
              className="flex items-center space-x-2 px-5 py-3 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-cyan hover:to-brand-cyan text-slate-950 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <span>View Projects</span>
              <FiArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="flex items-center space-x-2 px-5 py-3 rounded-lg border border-slate-800 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white text-xs uppercase tracking-widest transition-all hover:border-slate-700 cursor-pointer"
            >
              <span>Contact Me</span>
              <FiMail className="w-4 h-4" />
            </a>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-3 rounded-lg border border-slate-800/80 bg-slate-900/30 hover:bg-slate-900/60 text-slate-400 hover:text-cyan-400 text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              <FiDownload className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Coding Illustration Panel (5 columns) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 hidden lg:block"
        >
          <div className="bg-[#080d21] rounded-xl overflow-hidden border border-slate-950 dark:border-slate-850 shadow-2xl relative">
            {/* Floating Tech Pill Above IDE */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3.5 -right-3.5 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-xl backdrop-blur-md hidden sm:flex items-center space-x-1.5 z-20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>LangChain &bull; RAG &bull; Gemini</span>
            </motion.div>
            
            {/* Floating Tech Pill Bottom Left IDE */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3.5 -left-3.5 px-3 py-1 rounded-full bg-slate-900/90 border border-purple-500/40 text-[10px] font-mono text-purple-300 shadow-xl backdrop-blur-md hidden sm:flex items-center space-x-1.5 z-20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>FastAPI &bull; PyTorch &bull; Scikit</span>
            </motion.div>

            {/* Card Header Tabs */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/60 border-b border-slate-800/80">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">vineet_dev_model.py</span>
              <div className="w-10 h-1 bg-slate-800 rounded" />
            </div>

            {/* Code lines */}
            <pre className="p-5 text-left font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto bg-slate-950/45">
              <code>
                <span className="text-purple-400">from</span> <span className="text-cyan-400">dataclasses</span> <span className="text-purple-400">import</span> <span className="text-yellow-300">dataclass</span>{"\n"}
                <span className="text-purple-400">from</span> <span className="text-cyan-400">typing</span> <span className="text-purple-400">import</span> <span className="text-yellow-300">List</span>{"\n\n"}
                <span className="text-slate-500">@dataclass</span>{"\n"}
                <span className="text-purple-400">class</span> <span className="text-yellow-400">Developer</span>:{"\n"}
                {"    "}name: <span className="text-emerald-400">str</span> = <span className="text-cyan-400">"Vineetkush Pali"</span>{"\n"}
                {"    "}major: <span className="text-emerald-400">str</span> = <span className="text-cyan-400">"CSE (AI & ML)"</span>{"\n"}
                {"    "}college: <span className="text-emerald-400">str</span> = <span className="text-cyan-400">"Rungta College, Bhilai"</span>{"\n"}
                {"    "}skills: <span className="text-emerald-400">List[str]</span> = <span className="text-emerald-400">field</span>(default_factory=<span className="text-purple-400">lambda</span>: [{"\n"}
                {"        "}<span className="text-cyan-400">"Python"</span>, <span className="text-cyan-400">"C++"</span>, <span className="text-cyan-400">"React"</span>, <span className="text-cyan-400">"Node"</span>,{"\n"}
                {"        "}<span className="text-cyan-400">"DSA"</span>, <span className="text-cyan-400">"Machine Learning"</span>{"\n"}
                {"    "}]){"\n\n"}
                {"    "}<span className="text-purple-400">def</span> <span className="text-blue-400">solve_challenges</span>(self, status: <span className="text-emerald-400">str</span>):{"\n"}
                {"        "}<span className="text-purple-400">while</span> status == <span className="text-cyan-400">"learning"</span>:{"\n"}
                {"            "}self.knowledge_base += <span className="text-amber-300">1</span>{"\n"}
                {"            "}self.dsa_solved += <span className="text-amber-300">1</span>{"\n"}
                {"            "}self.build_innovations(){"\n"}
                {"        "}<span className="text-purple-400">return</span> <span className="text-cyan-400">"Ready for Internship"</span>{"\n\n"}
                <span className="text-slate-500"># Instantiating Vineet...</span>{"\n"}
                vineet = <span className="text-yellow-400">Developer</span>(){"\n"}
                <span className="text-yellow-300">print</span>(vineet.solve_challenges(status=<span className="text-cyan-400">"learning"</span>))
              </code>
            </pre>
            
            {/* Visual bottom gradient bar */}
            <div className="h-1 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple w-full absolute bottom-0 left-0" />
          </div>
        </motion.div>
      </div>

      {/* Attractive Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-mono tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors uppercase mb-2 flex items-center space-x-1">
          <span>Scroll To Explore</span>
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-slate-700 group-hover:border-cyan-400 transition-colors flex justify-center p-1 relative shadow-[0_0_12px_rgba(6,182,212,0.15)]">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]"
          />
        </div>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="text-cyan-400/70 group-hover:text-cyan-400 transition-colors mt-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
