import { Map } from 'lucide-react';

/**
 * Color-coded legend for pathfinding grid using Tailwind.
 */
export default function Legend() {
    const items = [
        { label: 'Start', color: '#2dd4a8', cls: 'animate-pulse-slow shadow-[0_0_10px_rgba(45,212,168,0.5)]' },
        { label: 'End', color: '#ef4444', cls: 'animate-pulse-slow shadow-[0_0_10px_rgba(239,68,68,0.5)]' },
        { label: 'Wall', color: '#334155', cls: 'shadow-inner' },
        { label: 'Visited', color: 'rgba(99,102,241,0.6)', cls: '' },
        { label: 'Path', color: '#fbbf24', cls: 'shadow-[0_0_8px_rgba(251,191,36,0.5)] scale-90' },
        { label: 'Unvisited', color: 'transparent', cls: 'border border-white/10' },
    ];

    return (
        <div className="glass-panel p-4 rounded-xl flex items-center gap-6 mt-4 w-fit mx-auto">
            <h3 className="flex items-center gap-2 text-sm font-bold text-muted uppercase tracking-wider pr-4 border-r border-white/10">
                <Map size={16} />
                Legend
            </h3>
            <div className="flex flex-wrap items-center gap-4">
                {items.map((item) => (
                    <div className="flex items-center gap-2" key={item.label}>
                        <span className={`w-4 h-4 rounded-sm block ${item.cls}`} style={{ background: item.color }} />
                        <span className="text-xs font-semibold text-muted">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
