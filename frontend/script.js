/* ============================================================
   script.js — Main application logic for Algorithm Visualizer
   ============================================================ */

(() => {
    "use strict";

    // ── State ───────────────────────────────────────────────
    const state = {
        mode: "sort",               // "sort" | "pathfind"
        algorithm: "bubble",
        arraySize: 30,
        speed: 50,                  // 1-100
        currentArray: [],
        steps: [],
        stepIndex: 0,
        playing: false,
        timerId: null,

        // Pathfinding
        gridRows: 20,
        gridCols: 30,
        grid: [],
        start: [2, 2],
        end: [17, 27],
        visitedOrder: [],
        path: [],
        pfStepIndex: 0,
        dragging: null,             // "start" | "end" | "wall" | null
    };

    // ── Helpers ─────────────────────────────────────────────
    const $ = (id) => document.getElementById(id);
    const setStatus = (txt) => { $("status-text").textContent = txt; };
    const setCounter = (cur, total) => { $("step-counter").textContent = `Step ${cur} / ${total}`; };

    function speedToMs(speed) {
        // 1 → 500 ms, 100 → 5 ms
        return Math.max(5, 500 - (speed - 1) * (495 / 99));
    }

    // ── Sorting ─────────────────────────────────────────────
    async function generateArray() {
        stopPlayback();
        state.steps = [];
        state.stepIndex = 0;
        try {
            const res = await fetch(`/api/random-array?size=${state.arraySize}`);
            const data = await res.json();
            state.currentArray = data.array;
            ArrayVisualizer.render(state.currentArray);
            setStatus("Array generated — press Play or Step");
            setCounter(0, 0);
        } catch (e) {
            setStatus("Error fetching array");
        }
    }

    async function runSort() {
        stopPlayback();
        setStatus("Computing steps…");
        try {
            const res = await fetch("/api/sort", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ algorithm: state.algorithm, array: state.currentArray }),
            });
            const data = await res.json();
            state.steps = data.steps;
            state.stepIndex = 0;
            setCounter(0, state.steps.length);
            setStatus("Ready — press Play");
        } catch (e) {
            setStatus("Error running sort");
        }
    }

    function renderSortStep(idx) {
        const step = state.steps[idx];
        if (!step) return;
        ArrayVisualizer.render(step.array, {
            comparing: step.comparing,
            swapped: step.swapped,
            sorted_indices: step.sorted_indices,
            pivot: step.pivot ?? -1,
        });
        setCounter(idx + 1, state.steps.length);
    }

    // ── Pathfinding ─────────────────────────────────────────
    function createGrid() {
        state.grid = Array.from({ length: state.gridRows }, () =>
            Array(state.gridCols).fill(0)
        );
        state.visitedOrder = [];
        state.path = [];
        state.pfStepIndex = 0;
        renderGrid();
        setStatus("Click cells to add walls, then press Visualize");
        setCounter(0, 0);
    }

    function renderGrid() {
        const container = $("grid-container");
        container.innerHTML = "";
        container.style.gridTemplateColumns = `repeat(${state.gridCols}, 28px)`;

        for (let r = 0; r < state.gridRows; r++) {
            for (let c = 0; c < state.gridCols; c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = r;
                cell.dataset.col = c;

                if (r === state.start[0] && c === state.start[1]) cell.classList.add("start");
                else if (r === state.end[0] && c === state.end[1]) cell.classList.add("end");
                else if (state.grid[r][c] === 1) cell.classList.add("wall");

                container.appendChild(cell);
            }
        }
    }

    function getCellEl(r, c) {
        return $("grid-container").querySelector(`[data-row="${r}"][data-col="${c}"]`);
    }

    function setupGridEvents() {
        const container = $("grid-container");

        container.addEventListener("mousedown", (e) => {
            const cell = e.target.closest(".cell");
            if (!cell) return;
            const r = +cell.dataset.row, c = +cell.dataset.col;

            if (r === state.start[0] && c === state.start[1]) {
                state.dragging = "start";
            } else if (r === state.end[0] && c === state.end[1]) {
                state.dragging = "end";
            } else {
                state.dragging = "wall";
                toggleWall(r, c);
            }
        });

        container.addEventListener("mouseover", (e) => {
            if (!state.dragging) return;
            const cell = e.target.closest(".cell");
            if (!cell) return;
            const r = +cell.dataset.row, c = +cell.dataset.col;

            if (state.dragging === "wall") {
                toggleWall(r, c);
            } else if (state.dragging === "start") {
                if (state.grid[r][c] !== 1 && !(r === state.end[0] && c === state.end[1])) {
                    state.start = [r, c];
                    clearGridVisuals();
                    renderGrid();
                }
            } else if (state.dragging === "end") {
                if (state.grid[r][c] !== 1 && !(r === state.start[0] && c === state.start[1])) {
                    state.end = [r, c];
                    clearGridVisuals();
                    renderGrid();
                }
            }
        });

        document.addEventListener("mouseup", () => { state.dragging = null; });
    }

    function toggleWall(r, c) {
        if ((r === state.start[0] && c === state.start[1]) || (r === state.end[0] && c === state.end[1])) return;
        state.grid[r][c] = state.grid[r][c] === 1 ? 0 : 1;
        const el = getCellEl(r, c);
        if (el) el.classList.toggle("wall");
    }

    function clearGridVisuals() {
        const cells = $("grid-container").querySelectorAll(".cell");
        cells.forEach((c) => { c.classList.remove("visited", "path"); });
    }

    async function runPathfinding() {
        stopPlayback();
        clearGridVisuals();
        renderGrid();
        setStatus("Computing path…");

        try {
            const res = await fetch("/api/pathfind", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    algorithm: state.algorithm,
                    grid: state.grid,
                    start: state.start,
                    end: state.end,
                }),
            });
            const data = await res.json();
            state.visitedOrder = data.visited_order;
            state.path = data.path;
            state.pfStepIndex = 0;
            const total = state.visitedOrder.length + state.path.length;
            setCounter(0, total);
            setStatus(data.found ? "Path found — press Play" : "No path found — press Play to see exploration");
        } catch (e) {
            setStatus("Error running pathfinding");
        }
    }

    // ── Playback Engine ─────────────────────────────────────
    function startPlayback() {
        if (state.playing) return;

        // If sort mode and no steps, trigger sort first
        if (state.mode === "sort" && state.steps.length === 0) {
            runSort().then(() => startPlayback());
            return;
        }
        if (state.mode === "pathfind" && state.visitedOrder.length === 0) {
            runPathfinding().then(() => startPlayback());
            return;
        }

        state.playing = true;
        setStatus("Playing…");
        tick();
    }

    function tick() {
        if (!state.playing) return;

        if (state.mode === "sort") {
            if (state.stepIndex >= state.steps.length) {
                stopPlayback();
                setStatus("✔ Sorted!");
                return;
            }
            renderSortStep(state.stepIndex);
            state.stepIndex++;
        } else {
            const totalVisited = state.visitedOrder.length;
            const totalPath = state.path.length;
            const total = totalVisited + totalPath;

            if (state.pfStepIndex >= total) {
                stopPlayback();
                setStatus("✔ Done!");
                return;
            }

            if (state.pfStepIndex < totalVisited) {
                const [r, c] = state.visitedOrder[state.pfStepIndex];
                const el = getCellEl(r, c);
                if (el && !el.classList.contains("start") && !el.classList.contains("end")) {
                    el.classList.add("visited");
                }
            } else {
                const pi = state.pfStepIndex - totalVisited;
                const [r, c] = state.path[pi];
                const el = getCellEl(r, c);
                if (el && !el.classList.contains("start") && !el.classList.contains("end")) {
                    el.classList.add("path");
                }
            }

            state.pfStepIndex++;
            setCounter(state.pfStepIndex, total);
        }

        state.timerId = setTimeout(tick, speedToMs(state.speed));
    }

    function stopPlayback() {
        state.playing = false;
        clearTimeout(state.timerId);
        state.timerId = null;
    }

    function stepForward() {
        if (state.playing) stopPlayback();

        if (state.mode === "sort") {
            if (state.steps.length === 0) { runSort(); return; }
            if (state.stepIndex < state.steps.length) {
                renderSortStep(state.stepIndex);
                state.stepIndex++;
            }
        } else {
            const total = state.visitedOrder.length + state.path.length;
            if (total === 0) { runPathfinding(); return; }
            if (state.pfStepIndex < total) {
                // Reuse the same logic as tick for one step
                const totalVisited = state.visitedOrder.length;
                if (state.pfStepIndex < totalVisited) {
                    const [r, c] = state.visitedOrder[state.pfStepIndex];
                    const el = getCellEl(r, c);
                    if (el && !el.classList.contains("start") && !el.classList.contains("end")) {
                        el.classList.add("visited");
                    }
                } else {
                    const pi = state.pfStepIndex - totalVisited;
                    const [r, c] = state.path[pi];
                    const el = getCellEl(r, c);
                    if (el && !el.classList.contains("start") && !el.classList.contains("end")) {
                        el.classList.add("path");
                    }
                }
                state.pfStepIndex++;
                setCounter(state.pfStepIndex, total);
            }
        }
    }

    function resetPlayback() {
        stopPlayback();
        if (state.mode === "sort") {
            state.stepIndex = 0;
            if (state.currentArray.length) ArrayVisualizer.render(state.currentArray);
            setCounter(0, state.steps.length);
            setStatus("Reset — press Play");
        } else {
            state.pfStepIndex = 0;
            clearGridVisuals();
            renderGrid();
            setCounter(0, state.visitedOrder.length + state.path.length);
            setStatus("Reset — press Play");
        }
    }

    // ── Mode Switching ──────────────────────────────────────
    function setMode(mode) {
        stopPlayback();
        state.mode = mode;

        document.querySelectorAll(".mode-tabs .tab").forEach((t) => {
            t.classList.toggle("active", t.dataset.mode === mode);
        });

        $("sort-view").classList.toggle("active", mode === "sort");
        $("pathfind-view").classList.toggle("active", mode === "pathfind");

        Controls.setMode(mode);

        if (mode === "sort") {
            state.algorithm = "bubble";
            AlgorithmInfo.show("bubble");
            if (!state.currentArray.length) generateArray();
        } else {
            state.algorithm = "bfs";
            AlgorithmInfo.show("bfs");
            if (!state.grid.length || state.grid.length === 0) createGrid();
        }
    }

    // ── Initialisation ──────────────────────────────────────
    function init() {
        Controls.init({
            onGenerate: () => {
                if (state.mode === "sort") generateArray();
                else runPathfinding();
            },
            onPlay: startPlayback,
            onPause: stopPlayback,
            onStep: stepForward,
            onReset: resetPlayback,
            onAlgorithmChange: (algo) => {
                state.algorithm = algo;
                AlgorithmInfo.show(algo);
                stopPlayback();
                if (state.mode === "sort") {
                    state.steps = [];
                    state.stepIndex = 0;
                    setCounter(0, 0);
                } else {
                    state.visitedOrder = [];
                    state.path = [];
                    state.pfStepIndex = 0;
                    clearGridVisuals();
                    renderGrid();
                    setCounter(0, 0);
                }
            },
            onSpeedChange: (v) => { state.speed = v; },
            onSizeChange: (v) => { state.arraySize = Math.max(5, Math.min(100, v)); },
            onClearGrid: () => { createGrid(); },
        });

        // Mode tabs
        document.querySelectorAll(".mode-tabs .tab").forEach((tab) => {
            tab.addEventListener("click", () => setMode(tab.dataset.mode));
        });

        AlgorithmInfo.show("bubble");
        generateArray();
        createGrid();            // pre-create grid so switch is instant
        setupGridEvents();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
