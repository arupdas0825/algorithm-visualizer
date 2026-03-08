/**
 * Live stat cards showing algorithm metrics.
 */
export default function StatsPanel({ mode, stats }) {
    const sortCards = [
        { label: 'Array Size', value: stats.arraySize ?? 0, icon: '📏', color: '#6c63ff' },
        { label: 'Comparisons', value: stats.comparisons ?? 0, icon: '🔍', color: '#fbbf24' },
        { label: 'Swaps', value: stats.swaps ?? 0, icon: '🔄', color: '#f472b6' },
        { label: 'Time (ms)', value: stats.time ?? '0.00', icon: '⏱️', color: '#2dd4a8' },
    ];

    const pathCards = [
        { label: 'Grid Size', value: stats.gridSize ?? '0×0', icon: '📐', color: '#6c63ff' },
        { label: 'Nodes Visited', value: stats.nodesVisited ?? 0, icon: '👁️', color: '#fbbf24' },
        { label: 'Path Length', value: stats.pathLength ?? 0, icon: '📍', color: '#2dd4a8' },
        { label: 'Time (ms)', value: stats.time ?? '0.00', icon: '⏱️', color: '#f472b6' },
    ];

    const cards = mode === 'sort' ? sortCards : pathCards;

    return (
        <div className="stats-panel">
            {cards.map((card) => (
                <div className="stat-card" key={card.label}>
                    <div className="stat-card-header">
                        <span className="stat-icon" style={{ background: card.color + '22', color: card.color }}>
                            {card.icon}
                        </span>
                        <span className="stat-label">{card.label}</span>
                    </div>
                    <div className="stat-value" style={{ color: card.color }}>{card.value}</div>
                    <div className="stat-bar">
                        <div className="stat-bar-fill" style={{ background: card.color, width: '60%' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}
