import { Ruler, Search, ArrowRightLeft, Clock, Grid3X3, Eye, Route } from 'lucide-react';

/**
 * Live stat cards showing algorithm metrics using Tailwind.
 */
export default function StatsPanel({ mode, stats }) {
    const sortCards = [
        { label: 'Array Size', value: stats.arraySize ?? 0, icon: Ruler, color: '#6366f1' }, // primary
        { label: 'Comparisons', value: stats.comparisons ?? 0, icon: Search, color: '#f59e0b' }, // warning
        { label: 'Swaps', value: stats.swaps ?? 0, icon: ArrowRightLeft, color: '#ec4899' }, // pink
        { label: 'Time (ms)', value: stats.time ?? '0.00', icon: Clock, color: '#2dd4bf' }, // accent
    ];

    const pathCards = [
        { label: 'Grid Size', value: stats.gridSize ?? '0×0', icon: Grid3X3, color: '#6366f1' },
        { label: 'Nodes Visited', value: stats.nodesVisited ?? 0, icon: Eye, color: '#f59e0b' },
        { label: 'Path Length', value: stats.pathLength ?? 0, icon: Route, color: '#2dd4bf' },
        { label: 'Time (ms)', value: stats.time ?? '0.00', icon: Clock, color: '#ec4899' },
    ];

    const cards = mode === 'sort' ? sortCards : pathCards;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-6">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <div className="glass-panel p-4 rounded-2xl flex flex-col gap-2 relative overflow-hidden group" key={card.label}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: card.color + '20', color: card.color }}>
                                <Icon size={16} />
                            </div>
                            <span className="text-xs font-bold text-muted uppercase tracking-wider">{card.label}</span>
                        </div>
                        <div className="text-2xl font-black mt-1" style={{ color: card.color }}>{card.value}</div>
                        
                        {/* Decorative progress/glow bar */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                            <div className="h-full" style={{ background: card.color, width: '60%' }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
