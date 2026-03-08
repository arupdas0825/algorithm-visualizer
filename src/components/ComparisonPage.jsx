import { useState } from 'react';
import '../pages.css';

const ALGORITHMS = [
    { name: 'Bubble Sort', type: 'sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true, inPlace: true },
    { name: 'Merge Sort', type: 'sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true, inPlace: false },
    { name: 'Quick Sort', type: 'sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false, inPlace: true },
    { name: 'BFS', type: 'path', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', stable: false, inPlace: false },
    { name: 'DFS', type: 'path', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', stable: false, inPlace: false },
    { name: "Dijkstra's", type: 'path', best: 'O(V+E log V)', avg: 'O(V+E log V)', worst: 'O(V²)', space: 'O(V)', stable: false, inPlace: false },
];

export default function ComparisonPage() {
    const [filter, setFilter] = useState('all');
    const filtered = filter === 'all' ? ALGORITHMS : ALGORITHMS.filter(a => a.type === filter);

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Algorithm Comparison</h1>
                    <p className="page-subtitle">Side-by-side analysis of time and space complexity</p>
                </div>
                <div className="header-actions">
                    <div className="filter-pills">
                        {[['all', 'All'], ['sort', 'Sorting'], ['path', 'Pathfinding']].map(([k, l]) => (
                            <button key={k} className={`filter-pill ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>{l}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="comp-table-wrap">
                <table className="comp-table">
                    <thead>
                        <tr>
                            <th>Algorithm</th>
                            <th>Best Case</th>
                            <th>Average</th>
                            <th>Worst Case</th>
                            <th>Space</th>
                            <th>Stable</th>
                            <th>In-Place</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((algo) => (
                            <tr key={algo.name}>
                                <td className="comp-name">
                                    <span className={`comp-dot ${algo.type === 'sort' ? 'sort' : 'path'}`} />
                                    {algo.name}
                                </td>
                                <td className="comp-good">{algo.best}</td>
                                <td>{algo.avg}</td>
                                <td className="comp-bad">{algo.worst}</td>
                                <td>{algo.space}</td>
                                <td>{algo.stable ? <span className="bool-yes">✓</span> : <span className="bool-no">✗</span>}</td>
                                <td>{algo.inPlace ? <span className="bool-yes">✓</span> : <span className="bool-no">✗</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="comp-cards">
                <div className="comp-insight-card">
                    <h3>🏆 Best for Small Arrays</h3>
                    <p><strong>Bubble Sort</strong> — Simple, minimal overhead. Good for nearly sorted data with O(n) best case.</p>
                </div>
                <div className="comp-insight-card">
                    <h3>⚡ Best for Large Arrays</h3>
                    <p><strong>Quick Sort</strong> — Excellent average case O(n log n) with low constant factor and in-place sorting.</p>
                </div>
                <div className="comp-insight-card">
                    <h3>🎯 Guaranteed Performance</h3>
                    <p><strong>Merge Sort</strong> — O(n log n) in all cases. Ideal when stability matters.</p>
                </div>
                <div className="comp-insight-card">
                    <h3>🗺️ Shortest Path (Unweighted)</h3>
                    <p><strong>BFS</strong> — Guarantees shortest path on unweighted graphs. O(V+E) time.</p>
                </div>
            </div>
        </div>
    );
}
