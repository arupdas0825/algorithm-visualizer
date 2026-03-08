"""Shared utility functions for the algorithm visualizer."""

import random


def generate_random_array(size=30, min_val=5, max_val=100):
    """Generate a random array of integers."""
    return [random.randint(min_val, max_val) for _ in range(size)]


def generate_grid(rows=20, cols=30):
    """Generate an empty grid (0 = open, 1 = wall)."""
    return [[0 for _ in range(cols)] for _ in range(rows)]


def get_neighbors(row, col, rows, cols, allow_diagonal=False):
    """Get valid neighboring cells for a grid position."""
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    if allow_diagonal:
        directions += [(-1, -1), (-1, 1), (1, -1), (1, 1)]

    neighbors = []
    for dr, dc in directions:
        nr, nc = row + dr, col + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            neighbors.append((nr, nc))
    return neighbors
