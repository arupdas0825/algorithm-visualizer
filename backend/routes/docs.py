from flask import Blueprint, jsonify

bp = Blueprint('docs', __name__, url_prefix='/api/docs')

@bp.route('/api-reference', methods=['GET'])
def get_api_ref():
    return jsonify({
        "endpoints": [
            {"path": "/api/dashboard/stats", "method": "GET", "desc": "Returns system metrics"},
            {"path": "/api/sorting/run", "method": "POST", "desc": "Executes a sort and returns steps"},
            {"path": "/api/pathfinding/run", "method": "POST", "desc": "Executes pathfinding"},
            {"path": "/api/data-structures/tree", "method": "GET", "desc": "Returns a random binary tree json"}
        ]
    })
