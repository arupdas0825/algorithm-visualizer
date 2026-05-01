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
    <nav className="h-20 border-b border-white/5 bg-[#030712]/40 backdrop-blur-2xl flex items-center justify-between px-8 z-[60]">
      <div className="flex items-center gap-8">
        {/* LOGO SECTION */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform">
            <div className="w-full h-full rounded-[10px] bg-[#030712] flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Algomate Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">ALGOMATE</span>
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Neural Interface</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-2xl shadow-[inset_0_0_10px_rgba(99,102,241,0.05)] hidden lg:flex">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(99,102,241,1)]" />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Neural Core Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all relative group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-[#030712]" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              "flex items-center gap-3 p-1.5 pr-4 rounded-2xl transition-all border group",
              isOpen ? "bg-white/10 border-white/20 shadow-xl" : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.08]"
            )}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg group-hover:rotate-3 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-surface flex items-center justify-center overflow-hidden">
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-black text-white">{user?.name?.[0] || 'U'}</span>
                )}
              </div>
            </div>
            
            <div className="hidden sm:flex flex-col items-start leading-none gap-0.5">
              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">@{user?.username || 'user'}</span>
              <div className="flex items-center gap-1.5">
                <div className="px-1.5 py-0.5 rounded bg-primary/20 text-[8px] font-black text-primary uppercase tracking-tighter">Lvl {user?.level || 1}</div>
                <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">{user?.experienceLevel || 'Engineer'}</span>
              </div>
            </div>
            
            <ChevronDown size={14} className={clsx("text-white/20 transition-transform duration-300", isOpen && "rotate-180 text-white")} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="absolute right-0 mt-3 w-72 glass-panel border border-white/10 rounded-[2rem] shadow-2xl p-3 overflow-hidden z-[70]"
              >
                {/* Dropdown Header / Stats */}
                <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5 mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Experience Points</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{user?.xp || 0} / {user?.level * 1000}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((user?.xp || 0) % 1000) / 10}%` }}
                      className="h-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1">

                  <button 
                    onClick={() => {
                      setIsEditOpen(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-white/5 transition-all group w-full text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                      <User size={18}/>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">Edit Profile</span>
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-tight">Identity settings</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                      setIsSettingsOpen(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-white/5 transition-all group w-full text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all">
                      <SettingsIcon size={18}/>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">System Control</span>
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-tight">Core configuration</span>
                    </div>
                  </button>
                </div>

                <div className="h-px bg-white/5 my-2 mx-4" />

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-red-500/10 text-red-400/60 hover:text-red-400 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all"><LogOut size={18}/></div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold">Terminate Session</span>
                    <span className="text-[10px] font-bold uppercase tracking-tight opacity-40">Logout of Algorithm OS</span>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MODALS */}
      <ProfileEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <SettingsCenter isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </nav>
  );
}
