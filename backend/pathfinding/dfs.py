"""Depth-First Search with step-by-step recording for visualization."""

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utils.helpers import get_neighbors


def dfs(grid, start, end):
    """
    Perform DFS on a 2D grid.

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
    parent = {(sr, sc): None}
    visited_order = []
    found = False

    def _dfs(r, c):
        nonlocal found
        if found:
            return
        visited.add((r, c))
        visited_order.append([r, c])

        if r == er and c == ec:
            found = True
            return

        for nr, nc in get_neighbors(r, c, rows, cols):
            if (nr, nc) not in visited and grid[nr][nc] == 0:
                parent[(nr, nc)] = (r, c)
                _dfs(nr, nc)
                if found:
                    return

    _dfs(sr, sc)

    # Reconstruct path
    path = []
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
