const DATA = {
    bubble: { name: 'Bubble Sort', type: 'Sorting', stable: true, inPlace: true, desc: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. One of the simplest sorting algorithms but inefficient for large datasets.', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    merge: { name: 'Merge Sort', type: 'Sorting', stable: true, inPlace: false, desc: 'Divides the array into halves, recursively sorts each half, then merges the sorted halves. Consistently efficient and stable.', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    selection: { name: 'Selection Sort', type: 'Sorting', stable: false, inPlace: true, desc: 'Repeatedly selects the smallest element from the unsorted part and places it at the beginning.', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    quick: { name: 'Quick Sort', type: 'Sorting', stable: false, inPlace: true, desc: 'Picks a pivot element, partitions the array so smaller elements come before it and larger elements after, then recursively sorts the partitions.', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    bfs: { name: 'Breadth-First Search', type: 'Pathfinding', stable: false, inPlace: false, desc: 'Explores all neighbor nodes at the current depth before moving to the next depth level. Guarantees the shortest path on unweighted grids.', best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
    dfs: { name: 'Depth-First Search', type: 'Pathfinding', stable: false, inPlace: false, desc: 'Explores as far as possible along each branch before backtracking. Uses less memory than BFS but does not guarantee shortest path.', best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
    dijkstra: { name: "Dijkstra's Algorithm", type: 'Pathfinding', stable: false, inPlace: false, desc: 'Finds the shortest path from a source node to all other nodes in a weighted graph using a priority queue. Optimal for non-negative edge weights.', best: 'O(V + E log V)', avg: 'O(V + E log V)', worst: 'O(V²)', space: 'O(V)' },
};

/**
 * Algorithm info panel — rich card with tags and complexity table.
 */
export default function AlgorithmInfo({ algorithm }) {
    const info = DATA[algorithm];
    if (!info) return null;

    return (
        <div className="panel-card algo-info-card">
            <h3 className="panel-heading">
                <span className="panel-heading-icon">📖</span>
                Algorithm Info
            </h3>

            <div className="algo-header">
                <span className="algo-name">{info.name}</span>
                <div className="algo-tags">
                    <span className="tag tag-type">{info.type}</span>
                    {info.stable && <span className="tag tag-stable">Stable</span>}
                    {info.inPlace && <span className="tag tag-inplace">In-Place</span>}
                </div>
            </div>

            <p className="algo-desc">{info.desc}</p>

            <div className="complexity-grid">
                <div className="cx-item">
                    <span className="cx-label">Best</span>
                    <span className="cx-value">{info.best}</span>
                </div>
                <div className="cx-item">
                    <span className="cx-label">Average</span>
                    <span className="cx-value">{info.avg}</span>
                </div>
                <div className="cx-item">
                    <span className="cx-label">Worst</span>
                    <span className="cx-value cx-worst">{info.worst}</span>
                </div>
                <div className="cx-item">
                    <span className="cx-label">Space</span>
                    <span className="cx-value">{info.space}</span>
                </div>
            </div>
        </div>
    );
}
