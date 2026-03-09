from flask import Blueprint, request, jsonify
from core.data_generator import generate_grid
from pathfinding.bfs import bfs
from pathfinding.dfs import dfs
from pathfinding.dijkstra import dijkstra

bp = Blueprint('pathfinding', __name__, url_prefix='/api/pathfinding')

ALGORITHMS = {
    "bfs": bfs,
    "dfs": dfs,
    "dijkstra": dijkstra,
}

@bp.route('/run', methods=['POST'])
def run_pathfind():
    data = request.get_json(force=True)
    algorithm = data.get("algorithm", "bfs")
    grid = data.get("grid", generate_grid())
    start = data.get("start", [0, 0])
    end = data.get("end", [len(grid) - 1, len(grid[0]) - 1])

    fn = ALGORITHMS.get(algorithm)
    if fn is None:
        return jsonify({"error": f"Unknown algorithm: {algorithm}"}), 400

    result = fn(grid, start, end)
    return jsonify(result)
