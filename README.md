<div align="center">
  <img src="https://grainy-gradients.vercel.app/noise.svg" width="100%" height="200px" style="object-fit: cover; opacity: 0.2; position: absolute; z-index: -1" />
  
  <br />
  
  <h1>🚀 ALGOMATE</h1>
  <p><b>A Premium, Cinematic Algorithm Visualizer & Learning Platform</b></p>
  
  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" /></a>
  </p>

  <p>
    Watch code come to life. Algomate is a stunningly designed educational platform that bridges the gap between theoretical data structures and visual intuition using cinematic animations, glassmorphism UI, and highly optimized JavaScript generators.
  </p>
</div>

<br />

## ✨ Features

- **🎬 Cinematic Animations**: Powered by Framer Motion's physics-based engine, sorting arrays and graph traversals feel magnetic and alive.
- **⚡ Zero Memory Bloat**: Algorithms are implemented using JS `function*` (Generators), ensuring `O(1)` memory overhead even for `O(N²)` complexity visualizations.
- **🌌 Premium UI/UX**: Neural-network inspired backgrounds, cyberpunk glassmorphism, and Apple-level polish.
- **🧠 Comprehensive Categories**:
  - **Sorting**: Quick, Merge, Bubble, Selection, Insertion.
  - **Pathfinding**: Dijkstra, BFS, DFS with interactive maze drawing.
  - **Data Structures**: Interactive Stacks and Queues.
  - **Dynamic Programming**: Knapsack visualization and Tabulation tables.
  - **Trees**: BST / AVL structural representations.
- **📱 Fully Responsive**: Flawless experience across Mobile, Tablet, and Ultrawide displays.

---

## 🛠️ Architecture Overview

The previous legacy Flask backend was completely ripped out in favor of a modern, lightning-fast **React SPA architecture**.

```text
src/
├── algorithms/     # Generator-based algorithm engines (zero memory overhead)
├── components/     # Reusable Framer Motion UI components
├── pages/          # App Routes (Sorting, Pathfinding, Trees, DP)
├── hooks/          # Complex visualizer logic abstractors (useSortingVisualizer)
└── styles/         # Tailwind CSS & global animations
```

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arupdas0825/algorithm-visualizer.git
   cd algorithm-visualizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🗺️ Roadmap & Future Plans

- [x] Refactor architecture from Flask/Vanilla to React/Vite.
- [x] Implement Generator-based Animation Engine.
- [x] Build futuristic Landing Page and Dashboard.
- [x] Complete Pathfinding Grid & Node interactability.
- [ ] **AI Tutor Integration**: Allow LLM-driven chat to explain specific algorithm steps.
- [ ] **Multiplayer Race Mode**: Compete against friends to implement the fastest sorting algorithm.
- [ ] **Theme Switcher**: AMOLED, Cyberpunk, and Neon specific color palettes.

---

## 🤝 Contributing

We welcome contributions! To get started:
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

<div align="center">
  <p>Built with ❤️ by passionate engineers.</p>
</div>
