import { Palette, Bell, Shield, User, Globe, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import clsx from 'clsx';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'dark', label: 'Pro Dark', desc: 'Standard deep blue engineering theme.', color: 'bg-[#0f172a]', icon: Moon },
    { id: 'amoled', label: 'AMOLED', desc: 'Pure black for OLED displays.', color: 'bg-black', icon: Monitor },
    { id: 'cyberpunk', label: 'Cyberpunk', desc: 'High-contrast neon pink and teal.', color: 'bg-[#000b1e]', icon: Sun },
    { id: 'neon', label: 'Neon Night', desc: 'Vibrant purple and cyan energy.', color: 'bg-[#0d0221]', icon: Bell },
    { id: 'light', label: 'Cloud Light', desc: 'Clean and bright workspace.', color: 'bg-white', icon: Sun },
  ];

  return (
    <div className="flex flex-col h-full gap-8 overflow-y-auto pb-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">Settings</h1>
        <p className="text-muted text-lg">Configure your Algomate OS environment.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Appearance Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Palette size={120} />
            </div>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Palette className="text-primary" /> Visual Identity
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={clsx(
                    "flex flex-col gap-4 p-5 rounded-2xl border-2 transition-all text-left group",
                    theme === t.id 
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]" 
                      : "border-white/5 bg-white/5 hover:border-white/20"
                  )}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center shadow-lg", t.color)}>
                      <t.icon size={20} className={theme === t.id ? "text-primary" : "text-white"} />
                    </div>
                    {theme === t.id && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t.label}</h3>
                    <p className="text-xs text-muted leading-relaxed">{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Bell className="text-secondary" /> System Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <h4 className="font-bold text-sm">Algorithm Completion Sound</h4>
                  <p className="text-xs text-muted">Play a notification chime when a sort is finished.</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 opacity-50">
                <div>
                  <h4 className="font-bold text-sm">AI Tutor Voiceover</h4>
                  <p className="text-xs text-muted">Enable text-to-speech for algorithm explanations.</p>
                </div>
                <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-not-allowed">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><User size={20} className="text-primary"/> Engineer Profile</h3>
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center font-black text-3xl">AD</div>
              </div>
              <div>
                <h4 className="text-xl font-bold">Arup Das</h4>
                <p className="text-xs text-muted uppercase tracking-widest mt-1">Senior Architect</p>
              </div>
              <div className="flex gap-2 w-full mt-4">
                <div className="flex-1 bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-muted font-bold">LEVEL</p>
                  <p className="text-xl font-black">42</p>
                </div>
                <div className="flex-1 bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-muted font-bold">EXP</p>
                  <p className="text-xl font-black">12.5k</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-error/10 bg-error/5">
             <h4 className="font-bold text-error mb-2 flex items-center gap-2"><Shield size={16}/> Danger Zone</h4>
             <p className="text-xs text-muted mb-4">Resetting your progress will clear all badges, streaks, and saved visualization states.</p>
             <button className="w-full py-3 rounded-xl text-xs font-bold bg-error/20 text-error border border-error/20 hover:bg-error hover:text-white transition-all">
               Factory Reset OS
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
