from flask import Blueprint, request, jsonify
from core.data_generator import generate_random_array
from algorithms.bubble_sort import bubble_sort
from algorithms.merge_sort import merge_sort
from algorithms.quick_sort import quick_sort
from algorithms.quick_sort import selection_sort

bp = Blueprint('sorting', __name__, url_prefix='/api/sorting')

ALGORITHMS = {
    "bubble": bubble_sort,
    "merge": merge_sort,
    "quick": quick_sort,
    "selection": selection_sort,
}

@bp.route('/random-array', methods=['GET'])
def random_array():
    size = request.args.get("size", 30, type=int)
    size = max(5, min(size, 100))
    return jsonify({"array": generate_random_array(size)})

@bp.route('/run', methods=['POST'])
def run_sort():
    data = request.get_json(force=True)
    algorithm = data.get("algorithm", "bubble")
    arr = data.get("array", generate_random_array())

    fn = ALGORITHMS.get(algorithm)
    if fn is None:
        return jsonify({"error": f"Unknown algorithm: {algorithm}"}), 400

    steps = fn(arr)
    return jsonify({"steps": steps})
