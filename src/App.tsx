import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingScreen } from './components/LoadingScreen';
import { AnimatedCursor } from './components/AnimatedCursor';
import { CommandPalette } from './components/CommandPalette';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { GithubStats } from './components/GithubStats';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { TerminalSection } from './components/TerminalSection';
import { AiAssistant } from './components/AiAssistant';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none z-0" />
      
      {/* Dynamic Ambient Background Glow Blooms for Scroll Depth */}
      <div className="absolute top-[10%] -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[35%] -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[60%] -left-32 w-96 h-96 rounded-full bg-purple-500/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[85%] -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none z-0" />
      
      {/* Utilities */}
      <AnimatedCursor />
      <CommandPalette />
      
      {/* Sticky Header */}
      <Header />
      
      {/* Primary Layout Sections */}
      <main className="relative z-10 max-w-6xl mx-auto">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GithubStats />
        <Education />
        <Achievements />
        <TerminalSection />
        <Contact />
      </main>
      
      {/* Floating AI Chat Assistant */}
      <AiAssistant />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
