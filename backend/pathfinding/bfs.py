"""Breadth-First Search with step-by-step recording for visualization."""

from collections import deque
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utils.helpers import get_neighbors


def bfs(grid, start, end):
    """
    Perform BFS on a 2D grid.

    Args:
        grid: 2D list (0 = open, 1 = wall)
        start: [row, col]
        end: [row, col]

    Returns:
        { "visited_order": [[r,c], ...], "path": [[r,c], ...], "found": bool }
    """
    rows, cols = len(grid), len(grid[0])
    sr, sc = start
    er, ec = end

    visited = set()
    visited.add((sr, sc))
    queue = deque([(sr, sc)])
    parent = {(sr, sc): None}
    visited_order = []

    while queue:
        r, c = queue.popleft()
        visited_order.append([r, c])

        if r == er and c == ec:
            break

        for nr, nc in get_neighbors(r, c, rows, cols):
            if (nr, nc) not in visited and grid[nr][nc] == 0:
                visited.add((nr, nc))
                parent[(nr, nc)] = (r, c)
                queue.append((nr, nc))

    # Reconstruct path
    path = []
    found = (er, ec) in parent
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
