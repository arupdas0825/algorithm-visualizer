import { Info } from 'lucide-react';

const DATA = {
    bubble: { name: 'Bubble Sort', type: 'Sorting', stable: true, inPlace: true, desc: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. One of the simplest sorting algorithms but inefficient for large datasets.', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    merge: { name: 'Merge Sort', type: 'Sorting', stable: true, inPlace: false, desc: 'Divides the array into halves, recursively sorts each half, then merges the sorted halves. Consistently efficient and stable.', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    quick: { name: 'Quick Sort', type: 'Sorting', stable: false, inPlace: true, desc: 'Picks a pivot element, partitions the array so smaller elements come before it and larger elements after, then recursively sorts the partitions.', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    bfs: { name: 'Breadth-First Search', type: 'Pathfinding', stable: false, inPlace: false, desc: 'Explores all neighbor nodes at the current depth before moving to the next depth level. Guarantees the shortest path on unweighted grids.', best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
    dfs: { name: 'Depth-First Search', type: 'Pathfinding', stable: false, inPlace: false, desc: 'Explores as far as possible along each branch before backtracking. Uses less memory than BFS but does not guarantee shortest path.', best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
    dijkstra: { name: "Dijkstra's Algorithm", type: 'Pathfinding', stable: false, inPlace: false, desc: 'Finds the shortest path from a source node to all other nodes in a weighted graph using a priority queue. Optimal for non-negative edge weights.', best: 'O(V + E log V)', avg: 'O(V + E log V)', worst: 'O(V²)', space: 'O(V)' },
};

/**
 * Algorithm info panel — rich card with tags and complexity table using Tailwind.
 */
export default function AlgorithmInfo({ algorithm }) {
    const info = DATA[algorithm];
    if (!info) return null;

    return (
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 mt-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-muted uppercase tracking-wider">
                <Info size={16} className="text-secondary" />
                Algorithm Info
            </h3>

            <div className="flex flex-col gap-2">
                <span className="text-xl font-bold">{info.name}</span>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-xs font-semibold border border-primary/30">{info.type}</span>
                    {info.stable && <span className="px-2 py-0.5 rounded-md bg-success/20 text-success text-xs font-semibold border border-success/30">Stable</span>}
                    {info.inPlace && <span className="px-2 py-0.5 rounded-md bg-warning/20 text-warning text-xs font-semibold border border-warning/30">In-Place</span>}
                </div>
            </div>

            <p className="text-sm text-muted leading-relaxed">{info.desc}</p>

            <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-muted font-semibold uppercase">Best Case</span>
                    <span className="text-sm font-mono text-success font-bold">{info.best}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-muted font-semibold uppercase">Average</span>
                    <span className="text-sm font-mono font-bold">{info.avg}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-muted font-semibold uppercase">Worst Case</span>
                    <span className="text-sm font-mono text-error font-bold">{info.worst}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-muted font-semibold uppercase">Space</span>
                    <span className="text-sm font-mono text-warning font-bold">{info.space}</span>
                </div>
            </div>
        </div>
    );
}
