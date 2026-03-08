import '../pages.css';

const MODULES = [
    { icon: '🟢', title: 'Sorting Fundamentals', desc: 'Learn why sorting matters, how to measure performance, and understand Big-O notation through hands-on examples.', lessons: 5, duration: '25 min', level: 'Beginner', color: '#2dd4a8' },
    { icon: '🔵', title: 'Divide & Conquer', desc: 'Master the divide and conquer paradigm through Merge Sort and Quick Sort. Understand recursion and partition strategies.', lessons: 4, duration: '30 min', level: 'Intermediate', color: '#6c63ff' },
    { icon: '🟡', title: 'Graph Traversals', desc: 'Explore BFS and DFS, understand when to use each, and learn about graph representations (adjacency list vs matrix).', lessons: 6, duration: '35 min', level: 'Intermediate', color: '#fbbf24' },
    { icon: '🔴', title: 'Shortest Path Algorithms', desc: "Deep dive into Dijkstra's algorithm, weighted graphs, priority queues, and real-world applications like GPS navigation.", lessons: 4, duration: '40 min', level: 'Advanced', color: '#ff5e6c' },
];

const CONCEPTS = [
    { term: 'Time Complexity', def: 'A measure of the amount of time an algorithm takes relative to input size.' },
    { term: 'Space Complexity', def: 'The amount of memory an algorithm uses relative to input size.' },
    { term: 'Big-O Notation', def: 'Describes the upper bound of an algorithm\'s growth rate in the worst case.' },
    { term: 'Stable Sort', def: 'A sorting algorithm that preserves the relative order of equal elements.' },
    { term: 'In-Place Algorithm', def: 'An algorithm that uses only a constant amount of extra memory.' },
    { term: 'Adjacency List', def: 'A graph representation where each vertex stores a list of its neighbors.' },
];

export default function LearningPage() {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Learning Center</h1>
                    <p className="page-subtitle">Interactive modules to master algorithms and data structures</p>
                </div>
            </div>

            {/* Progress */}
            <div className="learn-progress-card">
                <div className="learn-progress-info">
                    <h3>Your Progress</h3>
                    <p>1 of 4 modules completed</p>
                </div>
                <div className="learn-progress-bar">
                    <div className="learn-progress-fill" style={{ width: '25%' }} />
                </div>
                <span className="learn-progress-pct">25%</span>
            </div>

            {/* Modules */}
            <h2 className="section-title">📖 Learning Modules</h2>
            <div className="learn-grid">
                {MODULES.map((m, i) => (
                    <div className="learn-card" key={i} style={{ '--lc': m.color }}>
                        <div className="learn-card-top">
                            <span className="learn-icon">{m.icon}</span>
                            <span className="learn-level" style={{ background: m.color + '18', color: m.color }}>{m.level}</span>
                        </div>
                        <h3>{m.title}</h3>
                        <p>{m.desc}</p>
                        <div className="learn-meta">
                            <span>📝 {m.lessons} lessons</span>
                            <span>⏱️ {m.duration}</span>
                        </div>
                        <button className="learn-start-btn" style={{ background: m.color }}>
                            {i === 0 ? '✓ Completed' : 'Start Module'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Key Concepts */}
            <h2 className="section-title">🔑 Key Concepts</h2>
            <div className="concepts-grid">
                {CONCEPTS.map((c, i) => (
                    <div className="concept-card" key={i}>
                        <h4>{c.term}</h4>
                        <p>{c.def}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
