import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Palette, 
  Zap, 
  Volume2, 
  Activity, 
  User, 
  Brain, 
  Settings,
  Monitor,
  MousePointer2,
  Accessibility,
  LogOut,
  Trash2,
  Download,
  Check
} from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';

export default function SettingsCenter({ isOpen, onClose }) {
  const { settings, setSettings, resetData } = useUserStore();
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

  const categories = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'ui', label: 'User Interface', icon: Monitor },
    { id: 'sound', label: 'Audio Engine', icon: Volume2 },
    { id: 'visualizer', label: 'Visualizer', icon: Activity },
    { id: 'learning', label: 'Learning Hub', icon: Brain },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'account', label: 'Account Systems', icon: Settings },
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setSettings('appearance', { theme: newTheme });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-5xl h-[85vh] vision-glass rounded-[3rem] flex overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
        >
          {/* Sidebar */}
          <div className="w-72 border-r border-white/10 bg-black/40 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                <Settings size={20} />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight uppercase">Control Center</h2>
            </div>

            <nav className="flex-1 space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/40 hover:bg-white/5 hover:text-white transition-all font-bold text-sm group text-left"
                >
                  <cat.icon size={20} className="group-hover:text-primary transition-colors" />
                  {cat.label}
                </button>
              ))}
            </nav>

            <button 
              onClick={() => {
                if (window.confirm('Erase all system data? This cannot be undone.')) {
                  resetData();
                  window.location.reload();
                }
              }}
              className="mt-auto flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500/60 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold text-sm group"
            >
              <Trash2 size={20} />
              Wipe Core Data
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-[#030712]/40 scrollbar-hide">
            <div className="p-12 max-w-3xl mx-auto space-y-16">
              
              {/* Appearance */}
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">Visual Architecture</h3>
                    <p className="text-white/40 text-sm">Customize the system aesthetics and theme profiles.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: 'dark', label: 'Dark Mode', color: 'bg-[#0f172a]' },
                    { id: 'amoled', label: 'AMOLED', color: 'bg-black' },
                    { id: 'cyberpunk', label: 'Cyberpunk', color: 'bg-[#000b1e]' },
                    { id: 'neon', label: 'Neon Glow', color: 'bg-[#0d0221]' },
                    { id: 'light', label: 'Light Protocol', color: 'bg-white' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      className={clsx(
                        "p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group",
                        theme === t.id ? "border-primary bg-primary/10" : "border-white/5 bg-white/5 hover:border-white/10"
                      )}
                    >
                      <div className={clsx("w-10 h-10 rounded-xl mb-4 shadow-xl", t.color)} />
                      <span className="font-bold text-white text-sm">{t.label}</span>
                      {theme === t.id && (
                        <div className="absolute top-4 right-4 text-primary">
                          <Check size={20} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* UI & Animation */}
              <section className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">Motion & Dynamics</h3>
                  <p className="text-white/40 text-sm">Fine-tune the physics and intensity of the interface.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Reduced Motion', desc: 'Minimizes parallax and spring animations.', key: 'reducedMotion' },
                    { label: 'Compact Interface', desc: 'Optimizes information density for data mastery.', key: 'compactMode' },
                    { label: 'Immersive Environment', desc: 'Hides non-essential UI during visualization.', key: 'immersiveMode' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="font-bold text-white mb-1">{item.label}</h4>
                        <p className="text-xs text-white/40">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => setSettings('ui', { [item.key]: !settings.ui[item.key] })}
                        className={clsx(
                          "w-14 h-8 rounded-full transition-all relative p-1",
                          settings.ui[item.key] ? "bg-primary" : "bg-white/10"
                        )}
                      >
                        <div className={clsx(
                          "w-6 h-6 rounded-full bg-white shadow-lg transition-all",
                          settings.ui[item.key] ? "translate-x-6" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sound Engine */}
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">Sonic Environment</h3>
                    <p className="text-white/40 text-sm">Manage the auditory feedback systems.</p>
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <Volume2 size={20} />
                    <span className="font-mono text-sm">{Math.round(settings.sound.volume * 100)}%</span>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-8">
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.sound.volume}
                    onChange={(e) => setSettings('sound', { volume: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setSettings('sound', { uiSounds: !settings.sound.uiSounds })}
                      className={clsx("p-4 rounded-2xl border transition-all flex items-center justify-between", settings.sound.uiSounds ? "border-primary bg-primary/10 text-white" : "border-white/5 text-white/40")}
                    >
                      <span className="font-bold text-xs uppercase tracking-widest">UI Feedback</span>
                      {settings.sound.uiSounds ? <Check size={16}/> : <div className="w-4 h-4 rounded-full border border-current opacity-20"/>}
                    </button>
                    <button 
                      onClick={() => setSettings('sound', { algoSounds: !settings.sound.algoSounds })}
                      className={clsx("p-4 rounded-2xl border transition-all flex items-center justify-between", settings.sound.algoSounds ? "border-primary bg-primary/10 text-white" : "border-white/5 text-white/40")}
                    >
                      <span className="font-bold text-xs uppercase tracking-widest">Algo Synth</span>
                      {settings.sound.algoSounds ? <Check size={16}/> : <div className="w-4 h-4 rounded-full border border-current opacity-20"/>}
                    </button>
                  </div>
                </div>
              </section>

              {/* Visualizer Parameters */}
              <section className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">Visualizer Engine</h3>
                  <p className="text-white/40 text-sm">Control the physics and rendering of algorithm data.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-white/40 px-2">
                      <span>Execution Speed</span>
                      <span className="text-accent">{settings.visualizer.speed}x</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="5" step="0.1"
                      value={settings.visualizer.speed}
                      onChange={(e) => setSettings('visualizer', { speed: parseFloat(e.target.value) })}
                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-accent"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-white/40 px-2">
                      <span>Node Scale</span>
                      <span className="text-accent">{settings.visualizer.nodeSize}px</span>
                    </div>
                    <input 
                      type="range" min="12" max="64" step="2"
                      value={settings.visualizer.nodeSize}
                      onChange={(e) => setSettings('visualizer', { nodeSize: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-accent"
                    />
                  </div>
                </div>
              </section>

              {/* Account Data */}
              <section className="p-12 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center">
                <h3 className="text-xl font-black text-white mb-2">System Maintenance</h3>
                <p className="text-white/40 text-sm mb-8">Export your algorithmic journey or reset session parameters.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
                    <Download size={18} />
                    Export Archive
                  </button>
                  <button 
                    onClick={() => {
                      setSettings('learning', { autoSave: !settings.learning.autoSave });
                    }}
                    className={clsx(
                      "px-8 py-4 rounded-2xl border font-bold text-sm flex items-center gap-2 transition-all",
                      settings.learning.autoSave ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/10 text-white/40"
                    )}
                  >
                    <Check size={18} />
                    Session Auto-Save: {settings.learning.autoSave ? 'ON' : 'OFF'}
                  </button>
                </div>
              </section>

            </div>
          </div>

          {/* Close Button Mobile */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all md:hidden"
          >
            <X size={24} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
