# ⚡ AlgoViz — Industry-Grade Algorithm Visualizer

[![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.x-green.svg)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive, high-performance **Algorithm Visualizer** built with a **90% Python-driven architecture**. This project leverages a robust Flask backend to power complex algorithmic computations, benchmarking, and data generation, presented through a stunning, premium React interface.

---

## 🚀 Experience the Platform

AlgoViz is more than just a visualizer; it's a comprehensive educational platform designed to make complex algorithms intuitive and engaging.

### 🌟 Key Features (7 Core Sections)
1. **📊 Dashboard**: Real-time system health, recent activity, and global usage statistics.
2. **📉 Sorting Visualizer**: Watch Bubble Sort, Merge Sort, and Quick Sort in action with color-coded snapshots.
3. **🗺️ Graph Visualizer**: Interactive grid for BFS, DFS, and Dijkstra. Draw walls and drag targets dynamically.
4. **🌲 Data Structures**: Explore trees, graphs, and queues with Python-generated JSON structures.
5. **⚖️ Comparison Engine**: Side-by-side performance benchmarking (Time & Memory) powered by Python's `tracemalloc`.
6. **🎓 Learning Center**: Curated educational modules and difficulty-based algorithm tutorials.
7. **📚 API Docs**: Interactive documentation for the project's powerful backend REST API.

---

## 🛠️ Technology Stack & Architecture

This project follows an **industry-standard decoupled architecture**, prioritizing backend logic in Python for performance and scalability.

- **Backend**: Python 3.13+, Flask (Modular Blueprint Architecture).
- **Core Engine**: Pure Python implementations of sorting and pathfinding.
- **Frontend**: React 19, Vite, Vanilla CSS for premium aesthetics.
- **Communication**: Asynchronous Fetch API with a local Vite proxy configuration.

### Project Structure
```text
algorithm-visualizer/
├── backend/            # Python Flask Backend
│   ├── algorithms/     # Logic for Sorts and Pathfinding
│   ├── core/           # Benchmarking Core & Data Generators
│   ├── routes/         # Modular Flask Blueprints (7 Sections)
│   └── app.py          # Application Factory
├── templates/          # HTML Templates
├── src/                # React Frontend Modules
└── frontend/           # Static Assets & CSS
```

---

## ⚙️ Installation & Setup

Follow these steps to get the project running locally.

### 1. Prerequisities
- Python 3.x
- Node.js & npm

### 2. Backend Setup
```bash
# Clone the repository
git clone https://github.com/arupdas0825/algorithm-visualizer.git
cd algorithm-visualizer

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install flask requests
```

### 3. Frontend Setup
```bash
# Install frontend packages
npm install

# Start the development server
npm run dev
```

### 4. Running the App
1. Start the Flask server: `python backend/app.py`
2. Start the Vite server: `npm run dev`
3. Visit `http://localhost:5173` in your browser.

---

## 🎨 Visual Design
The UI is inspired by modern development tools (like Reflect.app), featuring:
- **Glassmorphism**: Translucent panels with blur effects.
- **Dynamic Backgrounds**: Animated cosmic orbs and grid overlays.
- **Micro-animations**: Smooth transitions and hover-state feedback for high-end UX.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an issue.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for Algorithm Enthusiasts.*
