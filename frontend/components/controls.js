/* ============================================================
   controls.js — Builds the sidebar control panel
   ============================================================ */

const Controls = (() => {
    /**
     * Initialise the control panel inside #controls-panel.
     * @param {object} callbacks  { onGenerate, onPlay, onPause, onStep, onReset, onAlgorithmChange, onSpeedChange, onSizeChange, onClearGrid }
     */
    function init(callbacks) {
        const panel = document.getElementById("controls-panel");
        if (!panel) return;

        panel.innerHTML = `
            <div class="sidebar-card">
                <h3>Algorithm</h3>

                <div class="ctrl-group" id="algo-select-group">
                    <label for="algo-select">Select Algorithm</label>
                    <select id="algo-select">
                        <optgroup label="Sorting" id="sort-options">
                            <option value="bubble">Bubble Sort</option>
                            <option value="merge">Merge Sort</option>
                            <option value="quick">Quick Sort</option>
                        </optgroup>
                        <optgroup label="Pathfinding" id="pathfind-options" disabled>
                            <option value="bfs">BFS</option>
                            <option value="dfs">DFS</option>
                            <option value="dijkstra">Dijkstra</option>
                        </optgroup>
                    </select>
                </div>

                <div class="ctrl-group" id="size-group">
                    <label for="array-size">Array Size</label>
                    <input type="number" id="array-size" value="30" min="5" max="100" />
                </div>

                <div class="ctrl-group">
                    <label for="speed-slider">Speed</label>
                    <input type="range" id="speed-slider" class="speed-slider" min="1" max="100" value="50" />
                    <div class="speed-value" id="speed-label">50 %</div>
                </div>
            </div>

            <div class="sidebar-card">
                <h3>Controls</h3>
                <button class="btn btn-primary btn-full" id="btn-generate">🔀 Generate</button>
                <div class="btn-group" style="margin-top:10px;">
                    <button class="btn btn-primary btn-icon" id="btn-play" title="Play">▶</button>
                    <button class="btn btn-secondary btn-icon" id="btn-pause" title="Pause">⏸</button>
                    <button class="btn btn-secondary btn-icon" id="btn-step" title="Step Forward">⏭</button>
                    <button class="btn btn-secondary btn-icon" id="btn-reset" title="Reset">⟲</button>
                </div>
                <button class="btn btn-secondary btn-full" id="btn-clear-grid" style="margin-top:10px;display:none;">🧹 Clear Grid</button>
            </div>
        `;

        // Wire events
        const $ = (id) => document.getElementById(id);

        $("algo-select").addEventListener("change", (e) => callbacks.onAlgorithmChange(e.target.value));
        $("array-size").addEventListener("change", (e) => callbacks.onSizeChange(parseInt(e.target.value, 10)));
        $("speed-slider").addEventListener("input", (e) => {
            const v = e.target.value;
            $("speed-label").textContent = `${v} %`;
            callbacks.onSpeedChange(parseInt(v, 10));
        });

        $("btn-generate").addEventListener("click", callbacks.onGenerate);
        $("btn-play").addEventListener("click", callbacks.onPlay);
        $("btn-pause").addEventListener("click", callbacks.onPause);
        $("btn-step").addEventListener("click", callbacks.onStep);
        $("btn-reset").addEventListener("click", callbacks.onReset);
        $("btn-clear-grid").addEventListener("click", callbacks.onClearGrid);
    }

    /**
     * Toggle which option group is enabled based on mode.
     * @param {"sort"|"pathfind"} mode
     */
    function setMode(mode) {
        const sortOpts = document.getElementById("sort-options");
        const pathOpts = document.getElementById("pathfind-options");
        const sizeGroup = document.getElementById("size-group");
        const clearBtn = document.getElementById("btn-clear-grid");
        const genBtn = document.getElementById("btn-generate");
        const select = document.getElementById("algo-select");

        if (mode === "sort") {
            sortOpts.disabled = false;
            pathOpts.disabled = true;
            sizeGroup.style.display = "block";
            clearBtn.style.display = "none";
            genBtn.textContent = "🔀 Generate";
            select.value = "bubble";
        } else {
            sortOpts.disabled = true;
            pathOpts.disabled = false;
            sizeGroup.style.display = "none";
            clearBtn.style.display = "block";
            genBtn.textContent = "▶ Visualize";
            select.value = "bfs";
        }
    }

    return { init, setMode };
})();
