import { Settings2, PlayCircle, Pause, SkipForward, RotateCcw, Zap, Shuffle, Trash2 } from 'lucide-react';

/**
 * Sidebar controls: algorithm picker, speed slider, playback buttons.
 * Industry dashboard style with clean card layout using Tailwind.
 */
export default function Controls({
    mode, algorithm, arraySize, speed,
    onAlgorithmChange, onSizeChange, onSpeedChange,
    onGenerate, onPlay, onPause, onStep, onReset, onClearGrid,
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="glass-panel p-5 rounded-2xl flex flex-col gap-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-muted uppercase tracking-wider">
                    <Settings2 size={16} className="text-primary" />
                    Configuration
                </h3>

                <div className="flex flex-col gap-2">
                    <label htmlFor="algo-select" className="text-xs font-semibold text-muted">Algorithm</label>
                    <select
                        id="algo-select"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                        value={algorithm}
                        onChange={(e) => onAlgorithmChange(e.target.value)}
                    >
                        {mode === 'sort' ? (
                            <>
                                <option className="bg-surface" value="bubble">Bubble Sort</option>
                                <option className="bg-surface" value="merge">Merge Sort</option>
                                <option className="bg-surface" value="quick">Quick Sort</option>
                            </>
                        ) : (
                            <>
                                <option className="bg-surface" value="bfs">Breadth-First Search</option>
                                <option className="bg-surface" value="dfs">Depth-First Search</option>
                                <option className="bg-surface" value="dijkstra">Dijkstra's Algorithm</option>
                            </>
                        )}
                    </select>
                </div>

                {mode === 'sort' && (
                    <div className="flex flex-col gap-2">
                        <label htmlFor="array-size" className="text-xs font-semibold text-muted">Array Size</label>
                        <input
                            type="number" id="array-size"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                            value={arraySize} min={5} max={100}
                            onChange={(e) => onSizeChange(Math.max(5, Math.min(100, +e.target.value)))}
                        />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <label htmlFor="speed-slider" className="flex items-center justify-between text-xs font-semibold text-muted">
                        Speed
                        <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-md">{speed}%</span>
                    </label>
                    <input
                        type="range" id="speed-slider"
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        min={1} max={100} value={speed}
                        onChange={(e) => onSpeedChange(+e.target.value)}
                    />
                </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-muted uppercase tracking-wider mb-1">
                    <PlayCircle size={16} className="text-success" />
                    Playback
                </h3>
                
                <button 
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all active:scale-95" 
                    onClick={onGenerate}
                >
                    {mode === 'sort' ? <Shuffle size={16} /> : <Zap size={16} />}
                    {mode === 'sort' ? 'Generate Array' : 'Run Algorithm'}
                </button>
                
                <div className="flex items-center justify-between gap-2 mt-2">
                    <button className="flex-1 py-3 bg-white/5 hover:bg-success/20 hover:text-success border border-white/5 hover:border-success/30 rounded-xl flex items-center justify-center transition-colors group" onClick={onPlay} title="Play">
                        <PlayCircle size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="flex-1 py-3 bg-white/5 hover:bg-warning/20 hover:text-warning border border-white/5 hover:border-warning/30 rounded-xl flex items-center justify-center transition-colors group" onClick={onPause} title="Pause">
                        <Pause size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="flex-1 py-3 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/5 hover:border-primary/30 rounded-xl flex items-center justify-center transition-colors group" onClick={onStep} title="Step">
                        <SkipForward size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="flex-1 py-3 bg-white/5 hover:bg-error/20 hover:text-error border border-white/5 hover:border-error/30 rounded-xl flex items-center justify-center transition-colors group" onClick={onReset} title="Reset">
                        <RotateCcw size={20} className="group-hover:-rotate-90 transition-transform duration-300" />
                    </button>
                </div>
                
                {mode === 'pathfind' && (
                    <button 
                        className="w-full mt-2 py-3 border border-error/30 bg-error/10 hover:bg-error/20 text-error rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors" 
                        onClick={onClearGrid}
                    >
                        <Trash2 size={16} />
                        Clear Grid
                    </button>
                )}
            </div>
        </div>
    );
}
