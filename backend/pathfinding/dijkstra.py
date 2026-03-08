"""Dijkstra's Algorithm with step-by-step recording for visualization."""

import heapq
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utils.helpers import get_neighbors


def dijkstra(grid, start, end):
    """
    Perform Dijkstra's algorithm on a 2D grid.

    Grid values: 0 = open (weight 1), 1 = wall, 2+ = weighted cell.

    Args:
        grid: 2D list of ints
        start: [row, col]
        end: [row, col]

    Returns:
        { "visited_order": [[r,c], ...], "path": [[r,c], ...], "found": bool }
    """
    rows, cols = len(grid), len(grid[0])
    sr, sc = start
    er, ec = end

    INF = float("inf")
    dist = [[INF] * cols for _ in range(rows)]
    dist[sr][sc] = 0
    parent = {(sr, sc): None}
    visited = set()
    visited_order = []

    heap = [(0, sr, sc)]

    while heap:
        d, r, c = heapq.heappop(heap)

        if (r, c) in visited:
            continue
        visited.add((r, c))
        visited_order.append([r, c])

        if r == er and c == ec:
            break

        for nr, nc in get_neighbors(r, c, rows, cols):
            if (nr, nc) in visited:
                continue
            if grid[nr][nc] == 1:
                continue
            weight = grid[nr][nc] if grid[nr][nc] >= 2 else 1
            new_dist = d + weight
            if new_dist < dist[nr][nc]:
                dist[nr][nc] = new_dist
                parent[(nr, nc)] = (r, c)
                heapq.heappush(heap, (new_dist, nr, nc))

    # Reconstruct path
    path = []
    found = (er, ec) in visited
    if found:
        node = (er, ec)
        while node is not None:
            path.append([node[0], node[1]])
            node = parent[node]
        path.reverse()

    return {
        "visited_order": visited_order,
        "path": path,
        "found": found,
    }
