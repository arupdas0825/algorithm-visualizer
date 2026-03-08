/* ============================================================
   algorithmInfo.js — Displays algorithm details in #info-panel
   ============================================================ */

const AlgorithmInfo = (() => {
    const DATA = {
        bubble: {
            name: "Bubble Sort",
            desc: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Simple but inefficient for large datasets.",
            best: "O(n)",
            avg: "O(n²)",
            worst: "O(n²)",
            space: "O(1)",
        },
        merge: {
            name: "Merge Sort",
            desc: "Divides the array into halves, recursively sorts each half, then merges the sorted halves. Stable and consistently efficient.",
            best: "O(n log n)",
            avg: "O(n log n)",
            worst: "O(n log n)",
            space: "O(n)",
        },
        quick: {
            name: "Quick Sort",
            desc: "Picks a pivot element, partitions the array so that smaller elements come before the pivot and larger elements after, then recursively sorts the partitions.",
            best: "O(n log n)",
            avg: "O(n log n)",
            worst: "O(n²)",
            space: "O(log n)",
        },
        bfs: {
            name: "Breadth-First Search",
            desc: "Explores all neighbor nodes at the current depth before moving to the next depth level. Guarantees the shortest path on unweighted grids.",
            best: "O(V + E)",
            avg: "O(V + E)",
            worst: "O(V + E)",
            space: "O(V)",
        },
        dfs: {
            name: "Depth-First Search",
            desc: "Explores as far as possible along each branch before backtracking. Does not guarantee the shortest path but uses less memory than BFS.",
            best: "O(V + E)",
            avg: "O(V + E)",
            worst: "O(V + E)",
            space: "O(V)",
        },
        dijkstra: {
            name: "Dijkstra's Algorithm",
            desc: "Finds the shortest path from a source node to all other nodes in a weighted graph using a priority queue. Optimal for non-negative edge weights.",
            best: "O(V + E log V)",
            avg: "O(V + E log V)",
            worst: "O(V²)",
            space: "O(V)",
        },
    };

    /**
     * Show algorithm info in the #info-panel.
     * @param {string} key  Algorithm key, e.g. "bubble"
     */
    function show(key) {
        const panel = document.getElementById("info-panel");
        if (!panel) return;

        const info = DATA[key];
        if (!info) {
            panel.innerHTML = "";
            return;
        }

        panel.innerHTML = `
            <div class="sidebar-card">
                <h3>Info</h3>
                <div class="info-title">${info.name}</div>
                <p class="info-desc">${info.desc}</p>
                <table class="complexity-table">
                    <tr><td>Best</td><td>${info.best}</td></tr>
                    <tr><td>Average</td><td>${info.avg}</td></tr>
                    <tr><td>Worst</td><td>${info.worst}</td></tr>
                    <tr><td>Space</td><td>${info.space}</td></tr>
                </table>
            </div>
        `;
    }

    return { show };
})();
