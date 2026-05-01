import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../../store/useUserStore';
import { 
  User, 
  LogOut, 
  Award, 
  Zap, 
  ChevronDown, 
  Bell,
  Activity,
  Trophy,
  LayoutGrid,
  Settings as SettingsIcon,
  Sparkles
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ProfileEditModal from '../modals/ProfileEditModal';
import SettingsCenter from '../modals/SettingsCenter';
import clsx from 'clsx';

export default function Navbar() {
  const { user, resetData } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    resetData();
    navigate('/');
  };

  return (
    <nav className="h-20 border-b border-foreground/5 bg-background/40 backdrop-blur-2xl flex items-center justify-between px-8 z-[60] transition-colors duration-500">
      <div className="flex items-center gap-8">
        {/* LOGO SECTION */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg group-hover:scale-110 transition-transform">
            <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Algomate Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors">ALGOMATE</span>
            <span className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em]">Neural Interface</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-2xl hidden lg:flex">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Neural Core Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all relative group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>

        {/* Settings Toggle */}
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/5 hover:border-foreground/10 hover:bg-foreground/[0.08] transition-all group"
        >
          <SettingsIcon size={20} className="text-foreground/40 group-hover:text-primary transition-colors" />
          <span className="text-sm font-bold text-foreground hidden sm:block">Control Center</span>
        </button>
      </div>

      {/* MODALS */}
      <ProfileEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <SettingsCenter isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </nav>
  );
}
