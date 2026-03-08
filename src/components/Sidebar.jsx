/**
 * Full navigation sidebar with 7 sections + home.
 */
export default function Sidebar({ activePage, onNavigate }) {
    const navItems = [
        { key: 'dashboard', icon: '🏠', label: 'Dashboard' },
        { key: 'sorting', icon: '📊', label: 'Sorting' },
        { key: 'graph', icon: '🗺️', label: 'Graph' },
        { key: 'datastructs', icon: '🗃️', label: 'Structures' },
        { key: 'comparison', icon: '⚖️', label: 'Compare' },
        { key: 'learning', icon: '📚', label: 'Learning' },
        { key: 'docs', icon: '📄', label: 'Docs' },
    ];

    return (
        <nav className="icon-sidebar">
            <div className="sidebar-logo" onClick={() => onNavigate('home')} title="Home" style={{ cursor: 'pointer' }}>⚡</div>
            <div className="sidebar-nav">
                {navItems.map((item) => (
                    <button
                        key={item.key}
                        className={`sidebar-btn ${activePage === item.key ? 'active' : ''}`}
                        onClick={() => onNavigate(item.key)}
                        title={item.label}
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-label">{item.label}</span>
                    </button>
                ))}
            </div>
            <div className="sidebar-bottom">
                <button className="sidebar-btn" title="Settings">
                    <span className="sidebar-icon">⚙️</span>
                    <span className="sidebar-label">Settings</span>
                </button>
            </div>
        </nav>
    );
}
