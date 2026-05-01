import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, Volume2, Activity, Brain, Settings, 
  Monitor, MousePointer2, Accessibility, LogOut, Trash2, 
  Download, Check, ChevronRight, Sparkles, Shield, Cpu
} from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';

export default function SettingsCenter({ isOpen, onClose }) {
  const { settings, setSettings, resetData } = useUserStore();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('motion');

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const sections = [
    { id: 'motion', label: 'Motion & Dynamics', icon: Zap, color: 'text-yellow-400' },
    { id: 'visualizer', label: 'Visualizer Engine', icon: Cpu, color: 'text-emerald-400' },
    { id: 'audio', label: 'Sonic Environment', icon: Volume2, color: 'text-cyan-400' },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility, color: 'text-purple-400' },
    { id: 'ai', label: 'AI Features', icon: Sparkles, color: 'text-pink-400' },
    { id: 'maintenance', label: 'Maintenance', icon: Shield, color: 'text-red-400' },
  ];



  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] pointer-events-none">
        {/* Backdrop - Only visible on mobile or as a slight overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto md:bg-transparent md:backdrop-blur-none"
        />

        {/* Panel Container */}
        <div className="absolute inset-0 flex items-start justify-center md:justify-end md:p-8 md:pt-24 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={clsx(
              "pointer-events-auto w-full max-w-lg md:w-[480px] h-[100dvh] md:h-auto md:max-h-[85vh]",
              "bg-[#030712]/95 border-l md:border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]",
              "md:rounded-[2.5rem] flex flex-col overflow-hidden relative"
            )}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-[10px] bg-[#030712] flex items-center justify-center">
                    <Settings size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-black text-white tracking-tight uppercase">Control Center</h2>
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Neural System Config</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar / Navigation (Desktop) / Tabs (Mobile) */}
            <div className="flex flex-col flex-1 min-h-0">
              <nav className="flex md:flex-row overflow-x-auto scrollbar-hide border-b border-white/5 bg-black/20 p-2 gap-1 shrink-0">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap group shrink-0",
                      activeSection === s.id ? "bg-white/10 text-white" : "text-white/30 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <s.icon size={16} className={clsx("transition-colors", activeSection === s.id ? s.color : "group-hover:text-white")} />
                    <span className="text-xs font-bold uppercase tracking-widest">{s.label}</span>
                  </button>
                ))}
              </nav>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-10"
                  >


                    {activeSection === 'motion' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-black text-white mb-1">Physics & Dynamics</h3>
                          <p className="text-xs text-white/40">Adjust the system's kinetic behavior.</p>
                        </div>
                        {[
                          { label: 'Neural Fluidity', desc: 'Enable complex spring physics.', key: 'reducedMotion', inverted: true },
                          { label: 'Kinetic Feedback', desc: 'Active hover & click states.', key: 'kineticFeedback', default: true },
                          { label: 'Parallax Depth', desc: 'Enable multi-layered UI motion.', key: 'parallax', default: true },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div>
                              <h4 className="font-bold text-white text-sm">{item.label}</h4>
                              <p className="text-[10px] text-white/30 uppercase tracking-tight">{item.desc}</p>
                            </div>
                            <button 
                              onClick={() => setSettings('ui', { [item.key]: !settings.ui[item.key] })}
                              className={clsx(
                                "w-12 h-6 rounded-full transition-all relative p-1",
                                settings.ui[item.key] ? "bg-primary" : "bg-white/10"
                              )}
                            >
                              <div className={clsx(
                                "w-4 h-4 rounded-full bg-white shadow-lg transition-all",
                                settings.ui[item.key] ? "translate-x-6" : "translate-x-0"
                              )} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeSection === 'visualizer' && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-black text-white mb-1">Visualizer Engine</h3>
                          <p className="text-xs text-white/40">Fine-tune the visualization performance.</p>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                              <span>Clock Speed</span>
                              <span className="text-primary">{settings.visualizer.speed}x</span>
                            </div>
                            <input 
                              type="range" min="0.1" max="5" step="0.1"
                              value={settings.visualizer.speed}
                              onChange={(e) => setSettings('visualizer', { speed: parseFloat(e.target.value) })}
                              className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-primary"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                              <span>Buffer Scale</span>
                              <span className="text-primary">{settings.visualizer.nodeSize}px</span>
                            </div>
                            <input 
                              type="range" min="12" max="64" step="2"
                              value={settings.visualizer.nodeSize}
                              onChange={(e) => setSettings('visualizer', { nodeSize: parseInt(e.target.value) })}
                              className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-primary"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSection === 'audio' && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-black text-white mb-1">Sonic Environment</h3>
                          <p className="text-xs text-white/40">Manage acoustic feedback systems.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                          <div className="flex items-center justify-between">
                            <Volume2 size={20} className="text-white/40" />
                            <span className="font-mono text-xs text-primary">{Math.round(settings.sound.volume * 100)}%</span>
                          </div>
                          <input 
                            type="range" min="0" max="1" step="0.01"
                            value={settings.sound.volume}
                            onChange={(e) => setSettings('sound', { volume: parseFloat(e.target.value) })}
                            className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-primary"
                          />
                        </div>
                      </div>
                    )}

                    {activeSection === 'maintenance' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-black text-white mb-1">System Health</h3>
                          <p className="text-xs text-white/40">Manage your algorithmic data persistence.</p>
                        </div>
                        <button className="w-full p-4 rounded-xl border border-white/5 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-between group">
                          <span>Export Core Data</span>
                          <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm('Wipe all local memory? This process is irreversible.')) {
                              resetData();
                              window.location.reload();
                            }
                          }}
                          className="w-full p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-500/10 transition-all flex items-center justify-between group"
                        >
                          <span>Purge System Memory</span>
                          <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    )}

                    {activeSection === 'ai' && (
                      <div className="space-y-6">
                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-transparent border border-primary/20 text-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles size={40} /></div>
                          <h3 className="text-lg font-black text-white mb-2">Neural Insights</h3>
                          <p className="text-xs text-white/40 mb-6">AI-driven algorithm recommendations and complexity analysis.</p>
                          <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest animate-pulse">
                            Beta Protocol Active
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSection === 'accessibility' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-black text-white mb-1">Inclusion Logic</h3>
                          <p className="text-xs text-white/40">Ensure the system is accessible to all units.</p>
                        </div>
                        {[
                          { label: 'High Contrast Mode', desc: 'Enhanced clarity for complex structures.' },
                          { label: 'Screen Reader Support', desc: 'Narrative execution paths.' },
                          { label: 'Large Typeface', desc: 'Optimized for high-density displays.' },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 opacity-50 grayscale cursor-not-allowed">
                            <div>
                              <h4 className="font-bold text-white text-sm">{item.label}</h4>
                              <p className="text-[10px] text-white/30 uppercase tracking-tight">{item.desc}</p>
                            </div>
                            <div className="w-12 h-6 rounded-full bg-white/5 relative p-1">
                              <div className="w-4 h-4 rounded-full bg-white/10" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 bg-black/40 border-t border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                  <Shield size={12} />
                  <span>Version 2.4.0-Stable</span>
                </div>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                >
                  Apply Config
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

