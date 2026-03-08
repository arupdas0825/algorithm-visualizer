"""Flask backend for the Algorithm Visualizer."""

import sys
import os

# Ensure the backend package is importable
sys.path.insert(0, os.path.dirname(__file__))

from flask import Flask, render_template, request, jsonify

from algorithms.bubble_sort import bubble_sort
from algorithms.merge_sort import merge_sort
from algorithms.quick_sort import quick_sort
from pathfinding.bfs import bfs
from pathfinding.dfs import dfs
from pathfinding.dijkstra import dijkstra
from utils.helpers import generate_random_array, generate_grid

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "frontend"),
    static_url_path="/static",
)

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    """Serve the main page."""
    return render_template("index.html")


@app.route("/api/random-array", methods=["GET"])
def random_array():
    """Return a random array for the visualizer."""
    size = request.args.get("size", 30, type=int)
    size = max(5, min(size, 100))
    return jsonify({"array": generate_random_array(size)})


@app.route("/api/sort", methods=["POST"])
def sort():
    """
    Run a sorting algorithm and return step-by-step snapshots.
    Body: { "algorithm": "bubble"|"merge"|"quick", "array": [...] }
    """
    data = request.get_json(force=True)
    algorithm = data.get("algorithm", "bubble")
    arr = data.get("array", generate_random_array())

    algorithms = {
        "bubble": bubble_sort,
        "merge": merge_sort,
        "quick": quick_sort,
    }

    fn = algorithms.get(algorithm)
    if fn is None:
        return jsonify({"error": f"Unknown algorithm: {algorithm}"}), 400

    steps = fn(arr)
    return jsonify({"steps": steps})


@app.route("/api/pathfind", methods=["POST"])
def pathfind():
    """
    Run a pathfinding algorithm and return visited order + path.
    Body: { "algorithm": "bfs"|"dfs"|"dijkstra",
            "grid": [[...], ...],
            "start": [r, c],
            "end": [r, c] }
    """
    data = request.get_json(force=True)
    algorithm = data.get("algorithm", "bfs")
    grid = data.get("grid", generate_grid())
    start = data.get("start", [0, 0])
    end = data.get("end", [len(grid) - 1, len(grid[0]) - 1])

    algorithms = {
        "bfs": bfs,
        "dfs": dfs,
        "dijkstra": dijkstra,
    }

    fn = algorithms.get(algorithm)
    if fn is None:
        return jsonify({"error": f"Unknown algorithm: {algorithm}"}), 400

    result = fn(grid, start, end)
    return jsonify(result)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
