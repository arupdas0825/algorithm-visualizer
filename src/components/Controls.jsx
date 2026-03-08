/**
 * Sidebar controls: algorithm picker, speed slider, playback buttons.
 * Industry dashboard style with clean card layout.
 */
export default function Controls({
    mode, algorithm, arraySize, speed,
    onAlgorithmChange, onSizeChange, onSpeedChange,
    onGenerate, onPlay, onPause, onStep, onReset, onClearGrid,
}) {
    return (
        <div className="controls-panel">
            <div className="panel-card">
                <h3 className="panel-heading">
                    <span className="panel-heading-icon">⚙️</span>
                    Configuration
                </h3>

                <div className="ctrl-group">
                    <label htmlFor="algo-select">Algorithm</label>
                    <select
                        id="algo-select"
                        value={algorithm}
                        onChange={(e) => onAlgorithmChange(e.target.value)}
                    >
                        {mode === 'sort' ? (
                            <>
                                <option value="bubble">Bubble Sort</option>
                                <option value="merge">Merge Sort</option>
                                <option value="quick">Quick Sort</option>
                            </>
                        ) : (
                            <>
                                <option value="bfs">BFS</option>
                                <option value="dfs">DFS</option>
                                <option value="dijkstra">Dijkstra</option>
                            </>
                        )}
                    </select>
                </div>

                {mode === 'sort' && (
                    <div className="ctrl-group">
                        <label htmlFor="array-size">Array Size</label>
                        <input
                            type="number" id="array-size"
                            value={arraySize} min={5} max={100}
                            onChange={(e) => onSizeChange(Math.max(5, Math.min(100, +e.target.value)))}
                        />
                    </div>
                )}

                <div className="ctrl-group">
                    <label htmlFor="speed-slider">
                        Speed
                        <span className="speed-badge">{speed}%</span>
                    </label>
                    <input
                        type="range" id="speed-slider" className="speed-slider"
                        min={1} max={100} value={speed}
                        onChange={(e) => onSpeedChange(+e.target.value)}
                    />
                </div>
            </div>

            <div className="panel-card">
                <h3 className="panel-heading">
                    <span className="panel-heading-icon">▶️</span>
                    Playback
                </h3>
                <button className="btn btn-primary btn-full" onClick={onGenerate}>
                    {mode === 'sort' ? '🔀  Generate Array' : '⚡  Run Algorithm'}
                </button>
                <div className="playback-row">
                    <button className="pbtn play" onClick={onPlay} title="Play">▶</button>
                    <button className="pbtn" onClick={onPause} title="Pause">⏸</button>
                    <button className="pbtn" onClick={onStep} title="Step">⏭</button>
                    <button className="pbtn" onClick={onReset} title="Reset">↺</button>
                </div>
                {mode === 'pathfind' && (
                    <button className="btn btn-ghost btn-full" onClick={onClearGrid}>
                        🧹  Clear Grid
                    </button>
                )}
            </div>
        </div>
    );
}
