import '../pages.css';

/**
 * Dashboard overview page — industry Figma style.
 */
export default function DashboardPage({ onNavigate }) {
    const quickCards = [
        { key: 'sorting', icon: '📊', title: 'Sorting Visualizer', desc: '4 algorithms', color: '#6c63ff', stat: 'Bubble, Merge, Quick,Selection' },
        { key: 'graph', icon: '🗺️', title: 'Graph Visualizer', desc: '3 algorithms', color: '#2dd4a8', stat: 'BFS, DFS, Dijkstra' },
        { key: 'datastructs', icon: '🗃️', title: 'Data Structures', desc: '6 structures', color: '#fbbf24', stat: 'Stack, Queue, Tree…' },
        { key: 'comparison', icon: '⚖️', title: 'Algorithm Comparison', desc: 'Side-by-side', color: '#f472b6', stat: 'Compare performance' },
    ];

    const recentItems = [
        { algo: 'Bubble Sort', type: 'Sorting', time: '2 min ago', status: 'completed' },
        { algo: 'BFS', type: 'Pathfinding', time: '5 min ago', status: 'completed' },
        { algo: 'Quick Sort', type: 'Sorting', time: '12 min ago', status: 'completed' },
        { algo: 'Dijkstra', type: 'Pathfinding', time: '18 min ago', status: 'completed' },
        { algo: 'Merge Sort', type: 'Sorting', time: '25 min ago', status: 'completed' },
    ];

    const stats = [
        { label: 'Algorithms', value: '6', icon: '🧮', color: '#6c63ff' },
        { label: 'Visualizations', value: '2', icon: '👁️', color: '#2dd4a8' },
        { label: 'Data Structures', value: '6', icon: '🗃️', color: '#fbbf24' },
        { label: 'Learning Modules', value: '4', icon: '📚', color: '#f472b6' },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Welcome back — explore algorithms and data structures</p>
                </div>
                <div className="header-actions">
                    <span className="date-badge">📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="dash-stats-row">
                {stats.map((s) => (
                    <div className="dash-stat-card" key={s.label}>
                        <div className="dash-stat-icon" style={{ background: s.color + '18', color: s.color }}>{s.icon}</div>
                        <div className="dash-stat-info">
                            <span className="dash-stat-value" style={{ color: s.color }}>{s.value}</span>
                            <span className="dash-stat-label">{s.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Access */}
            <h2 className="section-title">Quick Access</h2>
            <div className="quick-grid">
                {quickCards.map((card) => (
                    <div className="quick-card" key={card.key} onClick={() => onNavigate(card.key)} style={{ cursor: 'pointer' }}>
                        <div className="quick-card-top">
                            <span className="quick-icon" style={{ background: card.color + '18', color: card.color }}>{card.icon}</span>
                            <span className="quick-arrow" style={{ color: card.color }}>→</span>
                        </div>
                        <h3>{card.title}</h3>
                        <p className="quick-desc">{card.desc}</p>
                        <span className="quick-stat">{card.stat}</span>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="dash-bottom-row">
                <div className="activity-card">
                    <h2 className="section-title" style={{ marginBottom: 16 }}>Recent Activity</h2>
                    <div className="activity-list">
                        {recentItems.map((item, i) => (
                            <div className="activity-item" key={i}>
                                <div className="activity-left">
                                    <span className="activity-dot" />
                                    <div>
                                        <span className="activity-algo">{item.algo}</span>
                                        <span className="activity-type">{item.type}</span>
                                    </div>
                                </div>
                                <span className="activity-time">{item.time}</span>
                                <span className="activity-badge">{item.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tips-card">
                    <h2 className="section-title" style={{ marginBottom: 16 }}>💡 Quick Tips</h2>
                    <div className="tip-item">
                        <span className="tip-num">01</span>
                        <div>
                            <strong>Start with Bubble Sort</strong>
                            <p>It's the simplest sorting algorithm — great for understanding the basics.</p>
                        </div>
                    </div>
                    <div className="tip-item">
                        <span className="tip-num">02</span>
                        <div>
                            <strong>Draw walls in Pathfinding</strong>
                            <p>Click cells to create obstacles, then watch BFS find the shortest path.</p>
                        </div>
                    </div>
                    <div className="tip-item">
                        <span className="tip-num">03</span>
                        <div>
                            <strong>Use Step mode</strong>
                            <p>Click ⏭ to advance one step at a time for detailed analysis.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
