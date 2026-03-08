import '../pages.css';

export default function DocsPage() {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Documentation</h1>
                    <p className="page-subtitle">Technical reference for all algorithms and data structures</p>
                </div>
            </div>

            <div className="docs-layout">
                {/* TOC */}
                <aside className="docs-toc">
                    <h3>Contents</h3>
                    <ul>
                        <li><a href="#getting-started">Getting Started</a></li>
                        <li><a href="#sorting">Sorting Algorithms</a></li>
                        <li><a href="#pathfinding">Pathfinding Algorithms</a></li>
                        <li><a href="#data-structures">Data Structures</a></li>
                        <li><a href="#api">API Reference</a></li>
                    </ul>
                </aside>

                {/* Content */}
                <div className="docs-content">
                    <section className="docs-section" id="getting-started">
                        <h2>Getting Started</h2>
                        <p>Algorithm Visualizer is an interactive learning tool for understanding complex algorithms through step-by-step animation.</p>
                        <div className="docs-code">
                            <div className="code-header">Terminal</div>
                            <pre><code>{`# Clone & run
git clone https://github.com/your-repo/algorithm-visualizer.git
cd algorithm-visualizer
npm install
npm run dev`}</code></pre>
                        </div>
                    </section>

                    <section className="docs-section" id="sorting">
                        <h2>Sorting Algorithms</h2>

                        <div className="docs-algo-card">
                            <h3>Bubble Sort</h3>
                            <p>Compares adjacent elements and swaps if they are in the wrong order. Repeats until no swaps are needed.</p>
                            <div className="docs-code">
                                <div className="code-header">JavaScript</div>
                                <pre><code>{`function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`}</code></pre>
                            </div>
                        </div>

                        <div className="docs-algo-card">
                            <h3>Merge Sort</h3>
                            <p>Divides array into halves, recursively sorts each half, then merges sorted halves.</p>
                            <div className="docs-code">
                                <div className="code-header">JavaScript</div>
                                <pre><code>{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`}</code></pre>
                            </div>
                        </div>

                        <div className="docs-algo-card">
                            <h3>Quick Sort</h3>
                            <p>Selects a pivot, partitions array around it, then recursively sorts partitions.</p>
                            <div className="docs-code">
                                <div className="code-header">JavaScript</div>
                                <pre><code>{`function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const pivot = partition(arr, lo, hi);
    quickSort(arr, lo, pivot - 1);
    quickSort(arr, pivot + 1, hi);
  }
  return arr;
}`}</code></pre>
                            </div>
                        </div>
                    </section>

                    <section className="docs-section" id="pathfinding">
                        <h2>Pathfinding Algorithms</h2>

                        <div className="docs-algo-card">
                            <h3>Breadth-First Search (BFS)</h3>
                            <p>Explores all neighbors at current depth before moving deeper. Guarantees shortest path on unweighted grids.</p>
                            <div className="docs-complexity-row">
                                <span><strong>Time:</strong> O(V + E)</span>
                                <span><strong>Space:</strong> O(V)</span>
                                <span><strong>Shortest Path:</strong> ✓ Yes</span>
                            </div>
                        </div>

                        <div className="docs-algo-card">
                            <h3>Depth-First Search (DFS)</h3>
                            <p>Explores as deep as possible along each branch before backtracking. Does not guarantee shortest path.</p>
                            <div className="docs-complexity-row">
                                <span><strong>Time:</strong> O(V + E)</span>
                                <span><strong>Space:</strong> O(V)</span>
                                <span><strong>Shortest Path:</strong> ✗ No</span>
                            </div>
                        </div>

                        <div className="docs-algo-card">
                            <h3>Dijkstra's Algorithm</h3>
                            <p>Uses a priority queue to find shortest paths from source to all nodes. Optimal for non-negative edge weights.</p>
                            <div className="docs-complexity-row">
                                <span><strong>Time:</strong> O(V + E log V)</span>
                                <span><strong>Space:</strong> O(V)</span>
                                <span><strong>Shortest Path:</strong> ✓ Yes (weighted)</span>
                            </div>
                        </div>
                    </section>

                    <section className="docs-section" id="data-structures">
                        <h2>Data Structures</h2>
                        <div className="docs-ds-grid">
                            {[
                                { name: 'Stack', ops: 'push, pop, peek', time: 'O(1)' },
                                { name: 'Queue', ops: 'enqueue, dequeue, front', time: 'O(1)' },
                                { name: 'Linked List', ops: 'insert, delete, search', time: 'O(1) / O(n)' },
                                { name: 'Binary Tree', ops: 'insert, search, traverse', time: 'O(log n)' },
                                { name: 'Hash Table', ops: 'put, get, remove', time: 'O(1) avg' },
                                { name: 'Heap', ops: 'insert, extractMin', time: 'O(log n)' },
                            ].map((ds) => (
                                <div className="docs-ds-item" key={ds.name}>
                                    <h4>{ds.name}</h4>
                                    <p className="docs-ds-ops">{ds.ops}</p>
                                    <span className="docs-ds-time">{ds.time}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="docs-section" id="api">
                        <h2>API Reference</h2>
                        <div className="docs-code">
                            <div className="code-header">Sorting Functions</div>
                            <pre><code>{`import { bubbleSort, mergeSort, quickSort } from './algorithms/sorting';

// Each function returns an array of steps:
// { array: number[], comparing: number[], swapped: boolean,
//   sortedIndices: number[], pivot?: number }

const steps = bubbleSort([5, 3, 8, 1, 2]);
console.log(steps.length); // number of animation frames`}</code></pre>
                        </div>
                        <div className="docs-code" style={{ marginTop: 16 }}>
                            <div className="code-header">Pathfinding Functions</div>
                            <pre><code>{`import { bfs, dfs, dijkstra } from './algorithms/pathfinding';

// Each function returns:
// { visitedOrder: [r,c][], path: [r,c][], found: boolean }

const result = bfs(grid, [0,0], [19,29]);
console.log(result.found, result.path.length);`}</code></pre>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
