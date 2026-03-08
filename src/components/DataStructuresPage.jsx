import { useState } from 'react';
import '../pages.css';

const STRUCTURES = [
    { key: 'stack', icon: '📚', name: 'Stack', desc: 'LIFO: Last In, First Out. Push and pop operations.', color: '#6c63ff', operations: ['push()', 'pop()', 'peek()', 'isEmpty()'], complexity: 'O(1) push/pop' },
    { key: 'queue', icon: '🚶', name: 'Queue', desc: 'FIFO: First In, First Out. Enqueue and dequeue.', color: '#2dd4a8', operations: ['enqueue()', 'dequeue()', 'front()', 'isEmpty()'], complexity: 'O(1) enqueue/dequeue' },
    { key: 'linkedlist', icon: '🔗', name: 'Linked List', desc: 'Sequential nodes with pointers. Singly or doubly linked.', color: '#fbbf24', operations: ['insert()', 'delete()', 'search()', 'traverse()'], complexity: 'O(1) insert, O(n) search' },
    { key: 'tree', icon: '🌳', name: 'Binary Tree', desc: 'Hierarchical structure with at most two children per node.', color: '#f472b6', operations: ['insert()', 'delete()', 'inorder()', 'search()'], complexity: 'O(log n) balanced' },
    { key: 'hashtable', icon: '🗂️', name: 'Hash Table', desc: 'Key-value pairs with hash function for O(1) average lookup.', color: '#818cf8', operations: ['put()', 'get()', 'remove()', 'containsKey()'], complexity: 'O(1) avg lookup' },
    { key: 'heap', icon: '⛰️', name: 'Heap', desc: 'Complete binary tree satisfying the heap property. Min or Max heap.', color: '#fb923c', operations: ['insert()', 'extractMin()', 'heapify()', 'peek()'], complexity: 'O(log n) insert/extract' },
];

export default function DataStructuresPage() {
    const [selected, setSelected] = useState(null);
    const active = STRUCTURES.find(s => s.key === selected);

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Data Structures</h1>
                    <p className="page-subtitle">Explore fundamental data structures and their operations</p>
                </div>
            </div>

            <div className="ds-layout">
                <div className="ds-grid">
                    {STRUCTURES.map((ds) => (
                        <div
                            key={ds.key}
                            className={`ds-card ${selected === ds.key ? 'ds-active' : ''}`}
                            onClick={() => setSelected(ds.key)}
                            style={{ '--ds-color': ds.color }}
                        >
                            <span className="ds-icon" style={{ background: ds.color + '18' }}>{ds.icon}</span>
                            <h3>{ds.name}</h3>
                            <p>{ds.desc}</p>
                            <span className="ds-complexity">{ds.complexity}</span>
                        </div>
                    ))}
                </div>

                {active && (
                    <div className="ds-detail" style={{ '--ds-color': active.color }}>
                        <div className="ds-detail-header">
                            <span className="ds-detail-icon" style={{ background: active.color + '18' }}>{active.icon}</span>
                            <div>
                                <h2>{active.name}</h2>
                                <p>{active.desc}</p>
                            </div>
                        </div>

                        <div className="ds-section">
                            <h3>Operations</h3>
                            <div className="ds-ops">
                                {active.operations.map((op) => (
                                    <span className="ds-op-badge" key={op} style={{ borderColor: active.color + '40', color: active.color }}>{op}</span>
                                ))}
                            </div>
                        </div>

                        <div className="ds-section">
                            <h3>Visual Representation</h3>
                            <div className="ds-visual">
                                {active.key === 'stack' && (
                                    <div className="visual-stack">
                                        {['D', 'C', 'B', 'A'].map((item, i) => (
                                            <div className="stack-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>{item}</div>
                                        ))}
                                        <span className="visual-label">← Top</span>
                                    </div>
                                )}
                                {active.key === 'queue' && (
                                    <div className="visual-queue">
                                        {['A', 'B', 'C', 'D'].map((item, i) => (
                                            <div className="queue-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>{item}</div>
                                        ))}
                                        <div className="queue-labels"><span>Front →</span><span>← Rear</span></div>
                                    </div>
                                )}
                                {active.key === 'linkedlist' && (
                                    <div className="visual-ll">
                                        {['1', '2', '3', '4'].map((item, i) => (
                                            <div className="ll-group" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                                                <div className="ll-node">{item}</div>
                                                {i < 3 && <span className="ll-arrow">→</span>}
                                            </div>
                                        ))}
                                        <span className="ll-null">null</span>
                                    </div>
                                )}
                                {active.key === 'tree' && (
                                    <div className="visual-tree">
                                        <div className="tree-row"><div className="tree-node root">8</div></div>
                                        <div className="tree-row"><div className="tree-node">4</div><div className="tree-node">12</div></div>
                                        <div className="tree-row"><div className="tree-node">2</div><div className="tree-node">6</div><div className="tree-node">10</div><div className="tree-node">14</div></div>
                                    </div>
                                )}
                                {active.key === 'hashtable' && (
                                    <div className="visual-ht">
                                        {[{ k: 'name', v: '"Alice"' }, { k: 'age', v: '25' }, { k: 'city', v: '"NYC"' }].map((e, i) => (
                                            <div className="ht-row" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                                                <span className="ht-key">{e.k}</span><span className="ht-arrow">→</span><span className="ht-val">{e.v}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {active.key === 'heap' && (
                                    <div className="visual-tree">
                                        <div className="tree-row"><div className="tree-node root">1</div></div>
                                        <div className="tree-row"><div className="tree-node">3</div><div className="tree-node">5</div></div>
                                        <div className="tree-row"><div className="tree-node">7</div><div className="tree-node">9</div><div className="tree-node">8</div><div className="tree-node">6</div></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="ds-section">
                            <h3>Complexity</h3>
                            <span className="ds-complexity-detail" style={{ background: active.color + '15', color: active.color }}>{active.complexity}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
