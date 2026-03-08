/* Pathfinding algorithms — BFS, DFS, Dijkstra on a 2D grid */

function getNeighbors(r, c, rows, cols) {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    return dirs.map(([dr, dc]) => [r + dr, c + dc]).filter(([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols);
}

/* BFS */
export function bfs(grid, start, end) {
    const [rows, cols] = [grid.length, grid[0].length];
    const visited = new Set([`${start[0]},${start[1]}`]);
    const queue = [start];
    const parent = new Map(); parent.set(`${start[0]},${start[1]}`, null);
    const visitedOrder = [];

    while (queue.length) {
        const [r, c] = queue.shift();
        visitedOrder.push([r, c]);
        if (r === end[0] && c === end[1]) break;
        for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
            const key = `${nr},${nc}`;
            if (!visited.has(key) && grid[nr][nc] === 0) {
                visited.add(key); parent.set(key, [r, c]); queue.push([nr, nc]);
            }
        }
    }
    return buildResult(parent, end, visitedOrder);
}

/* DFS */
export function dfs(grid, start, end) {
    const [rows, cols] = [grid.length, grid[0].length];
    const visited = new Set(); const parent = new Map();
    parent.set(`${start[0]},${start[1]}`, null);
    const visitedOrder = [];
    let found = false;

    function go(r, c) {
        if (found) return;
        visited.add(`${r},${c}`); visitedOrder.push([r, c]);
        if (r === end[0] && c === end[1]) { found = true; return; }
        for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
            const key = `${nr},${nc}`;
            if (!visited.has(key) && grid[nr][nc] === 0) { parent.set(key, [r, c]); go(nr, nc); if (found) return; }
        }
    }
    go(start[0], start[1]);
    return buildResult(parent, end, visitedOrder, found);
}

/* Dijkstra */
export function dijkstra(grid, start, end) {
    const [rows, cols] = [grid.length, grid[0].length];
    const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    dist[start[0]][start[1]] = 0;
    const parent = new Map(); parent.set(`${start[0]},${start[1]}`, null);
    const visited = new Set(); const visitedOrder = [];
    // simple priority queue via sorted insert (good enough for grid sizes)
    const heap = [[0, ...start]];

    while (heap.length) {
        heap.sort((a, b) => a[0] - b[0]);
        const [d, r, c] = heap.shift();
        const key = `${r},${c}`;
        if (visited.has(key)) continue;
        visited.add(key); visitedOrder.push([r, c]);
        if (r === end[0] && c === end[1]) break;
        for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
            const nk = `${nr},${nc}`;
            if (visited.has(nk) || grid[nr][nc] === 1) continue;
            const w = grid[nr][nc] >= 2 ? grid[nr][nc] : 1;
            const nd = d + w;
            if (nd < dist[nr][nc]) { dist[nr][nc] = nd; parent.set(nk, [r, c]); heap.push([nd, nr, nc]); }
        }
    }
    return buildResult(parent, end, visitedOrder);
}

function buildResult(parent, end, visitedOrder, forcedFound) {
    const endKey = `${end[0]},${end[1]}`;
    const found = forcedFound !== undefined ? forcedFound : parent.has(endKey);
    const path = [];
    if (found) {
        let node = end;
        while (node) { path.push(node); node = parent.get(`${node[0]},${node[1]}`); }
        path.reverse();
    }
    return { visitedOrder, path, found };
}
