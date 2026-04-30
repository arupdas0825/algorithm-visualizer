import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Code, Cpu, Activity, Zap, Star } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col font-sans text-white">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 bg-mesh-dark opacity-40 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Floating Orbs */}
      <motion.div 
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.location.href = '/dashboard'}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-all duration-500">
            <div className="w-full h-full rounded-[10px] bg-surface overflow-hidden">
              <img src="/src/assets/logo.png" alt="Algomate" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="font-display font-black text-xl tracking-tight text-white uppercase group-hover:text-primary transition-colors">Algomate</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted hover:text-white transition-colors">Features</a>
          <a href="#algorithms" className="text-sm font-medium text-muted hover:text-white transition-colors">Algorithms</a>
          <a href="https://github.com/arupdas0825/algorithm-visualizer" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors">
            <Star size={16} /> GitHub
          </a>
          <button 
            onClick={() => navigate('/dashboard')}
            className="glass-button px-6 py-2.5 rounded-full text-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto w-full mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        >
          <Zap size={16} className="animate-pulse" />
          <span>V2.0: Now with Cinematic Animations & AI Tutors</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[1.1] mb-6 font-display"
        >
          See Code <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Come to Life.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted max-w-2xl mb-12"
        >
          A premium, interactive platform designed to visualize algorithms with stunning clarity. From sorting arrays to finding shortest paths, experience the beauty of computer science.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex items-center gap-6 flex-wrap justify-center"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="group relative px-8 py-4 rounded-full bg-white text-background font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2"
          >
            Start Visualizing <Play size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('/sorting')}
            className="glass-button px-8 py-4 rounded-full text-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            <Code size={20} /> View Sorting
          </button>
        </motion.div>

        {/* Abstract Data Visualization Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="w-full mt-20 relative h-[400px] perspective-[1000px]"
        >
          <div className="absolute inset-0 cyber-border rounded-2xl overflow-hidden glass-panel transform rotateX-[20deg] scale-95 shadow-2xl flex items-center justify-center group">
            {/* Minimal mockup of the visualizer */}
            <div className="w-full h-full p-8 flex items-end justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
              {[40, 70, 30, 90, 50, 100, 20, 60, 80].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1, type: "spring" }}
                  className="w-12 rounded-t-md bg-gradient-to-t from-primary/20 to-primary/80 border border-primary/50 relative"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-white shadow-[0_0_10px_white]" />
                </motion.div>
              ))}
            </div>
            {/* Reflection / overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
