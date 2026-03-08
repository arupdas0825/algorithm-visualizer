/**
 * Color-coded legend for pathfinding grid.
 */
export default function Legend() {
    const items = [
        { label: 'Start', color: '#2dd4a8', cls: 'legend-start' },
        { label: 'End', color: '#ff5e6c', cls: 'legend-end' },
        { label: 'Wall', color: '#374151', cls: 'legend-wall' },
        { label: 'Visited', color: '#6366f1', cls: 'legend-visited' },
        { label: 'Path', color: '#fbbf24', cls: 'legend-path' },
        { label: 'Unvisited', color: 'rgba(255,255,255,0.06)', cls: 'legend-unvisited' },
    ];

    return (
        <div className="legend-card">
            <h3 className="legend-title">Legend</h3>
            <div className="legend-items">
                {items.map((item) => (
                    <div className="legend-item" key={item.label}>
                        <span className={`legend-swatch ${item.cls}`} style={{ background: item.color }} />
                        <span className="legend-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
