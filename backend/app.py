"""Flask backend for the Algorithm Visualizer."""
import sys
import os

from flask import Flask, render_template

# Ensure the backend package is importable
sys.path.insert(0, os.path.dirname(__file__))

def create_app():
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    app = Flask(
        __name__,
        template_folder=os.path.join(BASE_DIR, "templates"),
        static_folder=os.path.join(BASE_DIR, "frontend"),
        static_url_path="/static",
    )
    
    # Import routes
    from routes import dashboard, sorting, pathfinding, data_structures, comparison, learning, docs

    # Register blueprints
    app.register_blueprint(dashboard.bp)
    app.register_blueprint(sorting.bp)
    app.register_blueprint(pathfinding.bp)
    app.register_blueprint(data_structures.bp)
    app.register_blueprint(comparison.bp)
    app.register_blueprint(learning.bp)
    app.register_blueprint(docs.bp)
    
    @app.route("/")
    def index():
        """Serve the main page (old vanilla frontend)."""
        return render_template("index.html")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
