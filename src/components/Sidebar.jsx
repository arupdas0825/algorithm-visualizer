import { Home, BarChart2, Map, Layers, LayoutTemplate, BookOpen, FileText, Settings } from 'lucide-react';

export default function Sidebar({ activePage, onNavigate }) {
    const navItems = [
        { key: 'dashboard', icon: Home, label: 'Dashboard' },
        { key: 'sorting', icon: BarChart2, label: 'Sorting' },
        { key: 'graph', icon: Map, label: 'Graph' },
        { key: 'datastructs', icon: Layers, label: 'Structures' },
        { key: 'comparison', icon: LayoutTemplate, label: 'Compare' },
        { key: 'learning', icon: BookOpen, label: 'Learning' },
        { key: 'docs', icon: FileText, label: 'Docs' },
    ];

    return (
        <nav className="w-[80px] min-w-[80px] bg-surface border-r border-white/5 flex flex-col items-center py-6 z-20 shadow-2xl">
            <div 
                className="text-primary hover:text-accent cursor-pointer mb-8 transition-colors drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                onClick={() => onNavigate('home')} 
                title="Home"
            >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg hover:bg-white/10 transition-all">
                    <span className="text-2xl font-bold font-mono">AV</span>
                </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-2 w-full px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.key;
                    return (
                        <button
                            key={item.key}
                            className={`relative flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all duration-300 w-full group ${
                                isActive 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'text-muted hover:bg-white/5 hover:text-white'
                            }`}
                            onClick={() => onNavigate(item.key)}
                            title={item.label}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-md shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
                            )}
                            <Icon 
                                size={22} 
                                strokeWidth={isActive ? 2.5 : 2} 
                                className={`transition-transform duration-300 ${isActive ? 'drop-shadow-[0_0_6px_rgba(99,102,241,0.5)] scale-110' : 'group-hover:scale-110'}`} 
                            />
                            <span className="text-[10px] font-semibold tracking-wide uppercase opacity-80 group-hover:opacity-100">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
            
            <div className="w-full px-2">
                <button 
                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all duration-300 w-full group text-muted hover:bg-white/5 hover:text-white"
                    title="Settings"
                >
                    <Settings size={22} strokeWidth={2} className="group-hover:rotate-45 transition-transform duration-500" />
                    <span className="text-[10px] font-semibold tracking-wide uppercase opacity-80 group-hover:opacity-100">
                        Settings
                    </span>
                </button>
            </div>
        </nav>
    );
}
