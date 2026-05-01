import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BarChart2, 
  Share2, 
  Network, 
  Cpu, 
  BookOpen, 
  Activity,
  Layers,
  Zap,
  Palette
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';

export default function Sidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'sorting', label: 'Sorting', icon: BarChart2, path: '/sorting' },
    { id: 'pathfinding', label: 'Pathfinding', icon: Share2, path: '/pathfinding' },
    { id: 'trees', label: 'Trees', icon: Network, path: '/trees' },
    { id: 'dp', label: 'Dynamic Prog.', icon: Cpu, path: '/dp' },
    { id: 'datastructs', label: 'Data Structures', icon: Layers, path: '/datastructs' },
    { id: 'comparison', label: 'Comparison Mode', icon: Zap, path: '/comparison' },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen, path: '/learning' },
  ];

  const themes = [
    { id: 'dark', label: 'Dark', color: 'bg-[#0f172a]' },
    { id: 'amoled', label: 'AMOLED', color: 'bg-black' },
    { id: 'cyberpunk', label: 'Cyber', color: 'bg-[#000b1e]' },
    { id: 'neon', label: 'Neon', color: 'bg-[#0d0221]' },
    { id: 'light', label: 'Light', color: 'bg-white' },
  ];

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 h-full border-r border-white/10 bg-surface/40 backdrop-blur-xl flex flex-col flex-shrink-0 z-50 relative"
    >
      <div 
        className="p-6 flex items-center gap-3 cursor-pointer group"
        onClick={() => window.location.href = '/dashboard'}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <div className="w-full h-full rounded-[10px] bg-surface overflow-hidden">
            <img src="/src/assets/logo.png" alt="Algomate" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black text-xl tracking-tight text-white uppercase leading-none">Algomate</span>
          <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase mt-1 opacity-70 group-hover:opacity-100 transition-opacity">v2.0 OS</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group font-medium text-sm",
                isActive ? "text-white bg-white/10 shadow-inner" : "text-muted hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={18} className={clsx("relative z-10 transition-colors", isActive ? "text-primary" : "text-muted group-hover:text-primary")} />
              <span className="relative z-10">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-2 mb-3 px-2 text-muted text-[10px] font-bold uppercase tracking-widest">
          <Palette size={12} /> Theme
        </div>
        <div className="flex items-center justify-between gap-1 bg-black/20 p-1 rounded-xl mb-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={clsx(
                "w-6 h-6 rounded-lg border transition-all",
                t.color,
                theme === t.id ? "border-primary scale-110 shadow-lg" : "border-white/10 hover:border-white/30"
              )}
              title={t.label}
            />
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
