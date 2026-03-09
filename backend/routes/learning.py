from flask import Blueprint, jsonify

bp = Blueprint('learning', __name__, url_prefix='/api/learning')

@bp.route('/materials', methods=['GET'])
def get_materials():
    return jsonify({
        "modules": [
            {
                "id": "intro_sorting",
                "title": "Introduction to Sorting",
                "content": "Sorting algorithms arrange data in a specific order...",
                "difficulty": "Beginner"
            },
            {
                "id": "advanced_pathfinding",
                "title": "Advanced Pathfinding",
                "content": "Dijkstra and A* expand on simple BFS...",
                "difficulty": "Advanced"
            }
        ]
    })
