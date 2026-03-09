from flask import Blueprint, request, jsonify
from core.engine import benchmark_sort, benchmark_pathfinding
from algorithms.bubble_sort import bubble_sort
from algorithms.merge_sort import merge_sort
from algorithms.quick_sort import quick_sort
from algorithms.selection_sort import selection_sort
from pathfinding.bfs import bfs
from pathfinding.dfs import dfs
from pathfinding.dijkstra import dijkstra
from core.data_generator import generate_random_array, generate_grid

bp = Blueprint('comparison', __name__, url_prefix='/api/comparison')

@bp.route('/sort', methods=['POST'])
def compare_sorts():
    data = request.get_json(force=True)
    sizes = data.get("sizes", [10, 50, 100, 500])
    
    results = {}
    for size in sizes:
        arr = generate_random_array(size)
        results[str(size)] = {
            "bubble": benchmark_sort(bubble_sort, arr),
            "merge": benchmark_sort(merge_sort, arr),
            "quick": benchmark_sort(quick_sort, arr),
            "selection": benchmark_sort(selection_sort, arr),
        }
        
    return jsonify({"results": results})

@bp.route('/pathfind', methods=['POST'])
def compare_pathfinding():
    data = request.get_json(force=True)
    grid_sizes = data.get("sizes", [(10, 10), (20, 20), (30, 30)])
    
    results = {}
    for r, c in grid_sizes:
        grid = generate_grid(rows=r, cols=c)
        start = [0, 0]
        end = [r-1, c-1]
        
        results[f"{r}x{c}"] = {
            "bfs": benchmark_pathfinding(bfs, grid, start, end),
            "dfs": benchmark_pathfinding(dfs, grid, start, end),
            "dijkstra": benchmark_pathfinding(dijkstra, grid, start, end),
        }
        
    return jsonify({"results": results})
