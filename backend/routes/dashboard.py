from flask import Blueprint, jsonify

bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@bp.route('/stats', methods=['GET'])
def get_stats():
    # Return mock industry stats from the backend
    return jsonify({
        "algorithms_run": 1420,
        "active_users": 15,
        "top_algorithm": "Quick Sort",
        "system_health": "99.9% Uptime",
        "recent_activity": [
            {"user": "System", "action": "Server started", "time": "Just now"},
            {"user": "Demo", "action": "Ran Dijkstra's", "time": "2 mins ago"},
            {"user": "Demo", "action": "Compared Sorts", "time": "5 mins ago"}
        ]
    })
