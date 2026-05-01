import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Camera, 
  Check, 
  User, 
  Terminal, 
  Target, 
  Sparkles,
  Link as LinkIcon,
  Globe
} from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import clsx from 'clsx';

export default function ProfileEditModal({ isOpen, onClose }) {
  const { user, setUser } = useUserStore();
  const [formData, setFormData] = useState({ ...user });
  const [activeTab, setActiveTab] = useState('identity');
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] vision-glass rounded-[2.5rem] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Identity Evolution</h2>
                <p className="text-white/40 text-sm">Update your digital signature and system parameters.</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-64 border-r border-white/10 bg-black/20 p-6 space-y-2 hidden md:block">
              {[
                { id: 'identity', label: 'Core Identity', icon: User },
                { id: 'preferences', label: 'Experience', icon: Terminal },
                { id: 'goals', label: 'Aspirations', icon: Target },
                { id: 'social', label: 'Network Links', icon: LinkIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                    activeTab === tab.id 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-white/40 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#030712]/50">
              <div className="max-w-2xl mx-auto space-y-8">
                
                {activeTab === 'identity' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Full Name</label>
                        <input 
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Username</label>
                        <input 
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Bio / Status</label>
                      <textarea 
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/20 outline-none transition-all resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'preferences' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Favorite Algorithm</label>
                      <input 
                        type="text"
                        value={formData.favAlgo}
                        onChange={(e) => setFormData({...formData, favAlgo: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Experience Level</label>
                      <select 
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/20 outline-none transition-all appearance-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'goals' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Primary Learning Goal</label>
                      <input 
                        type="text"
                        value={formData.learningGoal}
                        onChange={(e) => setFormData({...formData, learningGoal: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary outline-none transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'social' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    {[
                      { icon: Terminal, label: 'GitHub', key: 'github' },
                      { icon: LinkIcon, label: 'Twitter / X', key: 'twitter' },
                      { icon: Globe, label: 'Website', key: 'website' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                        <item.icon size={20} className="text-white/40" />
                        <input 
                          type="text"
                          placeholder={`${item.label} URL`}
                          className="flex-1 bg-transparent border-none outline-none text-white text-sm"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-white/10 bg-white/5 flex items-center justify-end gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all font-bold text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-10 py-3 rounded-xl bg-white text-black hover:scale-105 active:scale-95 transition-all font-black text-sm flex items-center gap-2"
            >
              <Check size={18} />
              Save Modifications
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
