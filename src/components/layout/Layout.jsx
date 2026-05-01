import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const [isCinematic, setIsCinematic] = useState(false);
  useEffect(() => {
    const handleToggle = () => setIsCinematic(prev => !prev);
    window.addEventListener('toggle-cinematic', handleToggle);
    return () => window.removeEventListener('toggle-cinematic', handleToggle);
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden relative">
      {/* Cinematic Neural Background Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_50%)]"
        />
      </div>

      <AnimatePresence mode="wait">
        {!isCinematic && (
          <motion.div
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="hidden lg:block h-full"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {!isCinematic && <Navbar />}

        {/* Cinematic Toggle */}
        <button 
          onClick={() => setIsCinematic(!isCinematic)}
          className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/40 transition-all shadow-xl"
        >
          {isCinematic ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-thin">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
