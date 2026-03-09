from flask import Blueprint, jsonify
from core.data_generator import generate_binary_tree, generate_graph

bp = Blueprint('data_structures', __name__, url_prefix='/api/data-structures')

@bp.route('/tree', methods=['GET'])
def get_tree():
    return jsonify({"tree": generate_binary_tree()})

@bp.route('/graph', methods=['GET'])
def get_graph():
    return jsonify({"graph": generate_graph()})

@bp.route('/queue', methods=['GET'])
def get_queue():
    return jsonify({"queue": [10, 20, 30, 40, 50]})
