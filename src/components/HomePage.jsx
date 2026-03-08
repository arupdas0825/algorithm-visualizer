import './HomePage.css';

/**
 * Stunning hero landing page inspired by Reflect.app.
 * Shown as the first screen when visitors open the link.
 */
export default function HomePage({ onLaunch }) {
    return (
        <div className="home">
            {/* ── Ambient background effects ── */}
            <div className="home-glow" />
            <div className="home-grid-bg" />

            {/* ── Navigation ── */}
            <nav className="home-nav">
                <div className="home-nav-brand">
                    <span className="home-logo">⚡</span>
                    <span className="home-brand-text">AlgoViz</span>
                </div>
                <ul className="home-nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#algorithms">Algorithms</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                <div className="home-nav-actions">
                    <button className="home-btn-ghost" onClick={onLaunch}>Log in</button>
                    <button className="home-btn-cta" onClick={onLaunch}>Start Free Trial</button>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="home-hero">
                <div className="home-badge">
                    <span className="badge-sparkle">✨</span>
                    New: Pathfinding & Sorting Visualizations just landed
                </div>

                <h1 className="home-headline">
                    Visualize Algorithms<br />
                    <span className="headline-gradient">in Action</span>
                </h1>

                <p className="home-subtitle">
                    Watch sorting and pathfinding algorithms come to life, step by step.<br />
                    Interactive, beautiful, and educational.
                </p>

                <div className="home-cta-row">
                    <button className="home-btn-primary" onClick={onLaunch}>
                        🚀  Launch Visualizer
                    </button>
                    <button className="home-btn-outline" onClick={onLaunch}>
                        ▶  Watch Demo
                    </button>
                </div>

                {/* ── Cosmic Orb ── */}
                <div className="orb-container">
                    <div className="orb">
                        <div className="orb-ring orb-ring-1" />
                        <div className="orb-ring orb-ring-2" />
                        <div className="orb-core" />
                    </div>
                </div>

                {/* ── Product Preview ── */}
                <div className="home-preview">
                    <div className="preview-window">
                        <div className="preview-topbar">
                            <span className="dot red" />
                            <span className="dot yellow" />
                            <span className="dot green" />
                            <span className="preview-title">Algorithm Visualizer — Dashboard</span>
                        </div>
                        <div className="preview-body">
                            {/* Fake stat cards */}
                            <div className="preview-stats">
                                <div className="p-stat"><span className="p-stat-label">Array Size</span><span className="p-stat-val purple">30</span></div>
                                <div className="p-stat"><span className="p-stat-label">Comparisons</span><span className="p-stat-val yellow">142</span></div>
                                <div className="p-stat"><span className="p-stat-label">Swaps</span><span className="p-stat-val pink">67</span></div>
                                <div className="p-stat"><span className="p-stat-label">Time (ms)</span><span className="p-stat-val green">1.24</span></div>
                            </div>
                            {/* Fake sorting bars */}
                            <div className="preview-bars">
                                {[35, 52, 18, 73, 45, 28, 62, 88, 15, 40, 55, 70, 25, 48, 82, 33, 58, 95, 20, 65, 42, 78, 30, 50, 68, 38, 85, 22, 60, 75]
                                    .map((h, i) => (
                                        <div key={i} className="p-bar" style={{ height: `${h}%` }} />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features Section ── */}
            <section className="home-features" id="features">
                <h2 className="section-heading">Why AlgoViz?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">📊</span>
                        <h3>Sorting Algorithms</h3>
                        <p>Bubble Sort, Merge Sort, Quick Sort with step-by-step animation and color-coded comparisons.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🗺️</span>
                        <h3>Pathfinding</h3>
                        <p>BFS, DFS, Dijkstra on interactive grids. Draw walls, drag start/end, and watch exploration.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">⚡</span>
                        <h3>Real-Time Stats</h3>
                        <p>Live tracking of comparisons, swaps, execution time, nodes visited, and path length.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🎛️</span>
                        <h3>Full Control</h3>
                        <p>Play, pause, step-through, speed control, and reset. Learn at your own pace.</p>
                    </div>
                </div>
            </section>

            {/* ── Algorithms Section ── */}
            <section className="home-algorithms" id="algorithms">
                <h2 className="section-heading">Supported Algorithms</h2>
                <div className="algo-pills">
                    {['Bubble Sort', 'Merge Sort', 'Quick Sort', 'BFS', 'DFS', "Dijkstra's"].map((a) => (
                        <span className="algo-pill" key={a}>{a}</span>
                    ))}
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="home-bottom-cta">
                <h2>Ready to explore?</h2>
                <p>Jump into the visualizer and see algorithms come alive.</p>
                <button className="home-btn-primary large" onClick={onLaunch}>
                    🚀  Get Started — It's Free
                </button>
            </section>

            {/* ── Footer ── */}
            <footer className="home-footer" id="about">
                <div className="footer-brand">
                    <span className="home-logo small">⚡</span>
                    <span>AlgoViz</span>
                </div>
                <p className="footer-copy">Built with React + Vite. Open-source algorithm education.</p>
                <div className="footer-links">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="#features">Features</a>
                    <a href="#algorithms">Algorithms</a>
                </div>
            </footer>
        </div>
    );
}
