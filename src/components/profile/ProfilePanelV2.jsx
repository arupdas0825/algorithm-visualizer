import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Award, 
  Shield, 
  Zap, 
  Settings, 
  User, 
  LogOut,
  ChevronRight, 
  Activity, 
  Brain,
  Star,
  Target,
  Trophy,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import ProfileEditModal from '../modals/ProfileEditModal';
import SettingsCenter from '../modals/SettingsCenter';
import clsx from 'clsx';

export default function ProfilePanelV2() {
  const { user } = useUserStore();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Calculate XP percentage
  const xpProgress = ((user?.xp || 0) % 1000) / 10;

  return (
    <div className="flex flex-col gap-8">
      {/* Main Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="vision-glass rounded-[3rem] p-8 shimmer-border"
      >
        {/* User Info Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary via-secondary to-accent p-1 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <div className="w-full h-full rounded-[1.8rem] bg-[#030712] overflow-hidden flex items-center justify-center relative">
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-white">{user?.name?.[0] || 'U'}</span>
                )}
                {/* Animated status ring */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-[1.8rem] border-2 border-primary/30"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#030712] border border-white/10 flex items-center justify-center text-primary shadow-xl">
              <Zap size={18} fill="currentColor" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-black text-white tracking-tight">@{user?.username || 'user'}</h3>
              <div className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
                Lvl {user?.level || 1}
              </div>
            </div>
            <p className="text-white/40 text-sm font-medium line-clamp-1">{user?.bio || 'Algorithmic Explorer'}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <Flame size={14} className="text-orange-500" />
                <span className="text-xs font-bold text-white/60">{user?.streak || 1} Day Streak</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-accent" />
                <span className="text-xs font-bold text-white/60">{user?.experienceLevel || 'Beginner'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-3 mb-10">
          <div className="flex justify-between items-end px-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Next Rank Progression</span>
            <span className="text-xs font-mono font-bold text-primary">{user?.xp % 1000 || 0} / 1000 XP</span>
          </div>
          <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] relative"
            >
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-white/20 blur-md"
              />
            </motion.div>
          </div>
          <div className="flex justify-between px-1">
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Novice</span>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Architect</span>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => setIsEditOpen(true)}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <User size={20} />
            </div>
            <span className="text-[10px] font-bold text-white">Edit</span>
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <Settings size={20} />
            </div>
            <span className="text-[10px] font-bold text-white">Settings</span>
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Terminate algorithmic session?')) {
                useUserStore.getState().resetData();
                window.location.href = '/';
              }
            }}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <LogOut size={20} />
            </div>
            <span className="text-[10px] font-bold text-white">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Statistics Recap Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card-premium p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-accent/10 rounded-lg text-accent">
            <Activity size={20} />
          </div>
          <h4 className="text-lg font-black text-white">Neural Statistics</h4>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Star size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Learning Hub</p>
                <p className="text-sm font-bold text-white">Mastery Rank: A+</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-white/20" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Trophy size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Achievements</p>
                <p className="text-sm font-bold text-white">12 Badges Unlocked</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-white/20" />
          </div>
        </div>
      </motion.div>

      {/* Personalized AI Suggestions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="vision-glass rounded-[3rem] p-8 bg-gradient-to-br from-primary/5 to-transparent border-primary/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles size={16} />
          </div>
          <h4 className="font-black text-white">AI Assistant Recommendation</h4>
        </div>
        <p className="text-sm text-white/60 mb-6 leading-relaxed">
          Based on your <span className="text-primary font-bold">{user?.experienceLevel}</span> profile, master <span className="text-white font-bold">Dynamic Programming</span> next to reach Level {user?.level + 1}.
        </p>
        <button className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          Launch Module
        </button>
      </motion.div>

      {/* Modals */}
      <ProfileEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <SettingsCenter isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
