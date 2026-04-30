import { motion } from 'framer-motion';
import { useSortingVisualizer } from '../hooks/useSortingVisualizer';
import { Play, Pause, RotateCcw, FastForward, Settings } from 'lucide-react';
import ShortcutManager from '../components/common/ShortcutManager';
import clsx from 'clsx';

export default function SortingVisualizer() {
  const {
    array, size, speed, algorithm, isPlaying,
    setSize, setSpeed, setAlgorithm,
    generateArray, play, pause, step,
    activeIndices, lockedIndices, pivotIndex, type
  } = useSortingVisualizer();

  const maxVal = Math.max(...array, 1);

  return (
    <div className="flex flex-col h-full gap-6">
      <ShortcutManager onPlayPause={isPlaying ? pause : play} onReset={generateArray} />
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">Sorting Visualizer</h1>
          <p className="text-muted text-lg">Watch and understand how sorting algorithms work.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-surface/60 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isPlaying}
            className="bg-transparent text-white outline-none font-medium px-4 py-2 border-r border-white/10 cursor-pointer disabled:opacity-50"
          >
            <option value="quick" className="bg-surface">Quick Sort</option>
            <option value="merge" className="bg-surface">Merge Sort</option>
            <option value="heap" className="bg-surface">Heap Sort</option>
            <option value="insertion" className="bg-surface">Insertion Sort</option>
            <option value="selection" className="bg-surface">Selection Sort</option>
            <option value="bubble" className="bg-surface">Bubble Sort</option>
          </select>
          
          <div className="flex items-center gap-2 px-4">
            <button 
              onClick={isPlaying ? pause : play}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            <button 
              onClick={step}
              disabled={isPlaying}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-50"
              title="Step Forward"
            >
              <FastForward size={18} />
            </button>
            <button 
              onClick={generateArray}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-error hover:text-red-400"
              title="Reset Array"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-6 items-center bg-surface/30 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-sm font-medium text-muted w-20">Size ({size})</span>
          <input 
            type="range" min="10" max="200" 
            value={size} onChange={(e) => setSize(Number(e.target.value))}
            disabled={isPlaying}
            className="flex-1 accent-primary"
          />
        </div>
        <div className="flex items-center gap-4 flex-1">
          <span className="text-sm font-medium text-muted w-20">Speed</span>
          <input 
            type="range" min="1" max="100" 
            value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1 accent-secondary"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[400px]">
        {/* Visualizer Area */}
        <div className="flex-1 glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-mesh-dark opacity-20 pointer-events-none" />
          
          <div className="relative z-10 w-full h-full flex items-end justify-center gap-[2px] md:gap-1">
            {array.map((value, index) => {
              let bgColor = "bg-primary/50";
              if (lockedIndices.has(index)) bgColor = "bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]";
              else if (index === pivotIndex) bgColor = "bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]";
              else if (activeIndices.includes(index)) {
                bgColor = type === 'swap' ? "bg-error shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-secondary shadow-[0_0_10px_rgba(168,85,247,0.5)]";
              }

              return (
                <motion.div
                  key={index}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={clsx("rounded-t-md relative flex items-start justify-center", bgColor)}
                  style={{
                    height: `${(value / maxVal) * 100}%`,
                    width: `${100 / size}%`,
                    minWidth: '2px'
                  }}
                >
                  {size <= 30 && (
                    <span className="absolute -top-6 text-[10px] font-mono text-muted">{value}</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Tutor Panel */}
        <div className="w-full lg:w-80 glass-panel rounded-2xl flex flex-col overflow-hidden border border-primary/20 flex-shrink-0">
          <div className="bg-primary/10 border-b border-primary/20 p-4 flex items-center gap-2">
            <Settings size={18} className="text-primary animate-spin-slow" />
            <h3 className="font-bold text-sm text-primary uppercase tracking-wider">AI Live Tutor</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 blur-3xl rounded-full pointer-events-none" />
             
             {type === '' && <p className="text-muted text-sm relative z-10">Waiting to start... press play to begin the algorithm visualization.</p>}
             {type === 'compare' && (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10">
                 <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-3"><Settings size={24}/></div>
                 <h4 className="font-bold text-lg mb-2">Comparing Elements</h4>
                 <p className="text-sm text-muted">The AI is evaluating if the element at index <span className="text-white font-mono">{activeIndices[0]}</span> is strictly greater/less than the element at <span className="text-white font-mono">{activeIndices[1]}</span> to determine structural order.</p>
               </motion.div>
             )}
             {type === 'swap' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                 <div className="w-12 h-12 rounded-full bg-error/20 text-error flex items-center justify-center mx-auto mb-3"><RotateCcw size={24}/></div>
                 <h4 className="font-bold text-lg mb-2">Swapping Values</h4>
                 <p className="text-sm text-muted">An inversion was detected. Swapping <span className="text-white font-mono">{activeIndices[0]}</span> and <span className="text-white font-mono">{activeIndices[1]}</span> to satisfy the monotonic constraint.</p>
               </motion.div>
             )}
             {type === 'pivot' && (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10">
                 <div className="w-12 h-12 rounded-full bg-warning/20 text-warning flex items-center justify-center mx-auto mb-3"><Play size={24}/></div>
                 <h4 className="font-bold text-lg mb-2">Pivot Selected</h4>
                 <p className="text-sm text-muted">A pivot point was chosen. The algorithm will now partition the array relative to this value.</p>
               </motion.div>
             )}
             {type === 'lock' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                 <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-3"><Play size={24}/></div>
                 <h4 className="font-bold text-lg mb-2">Element Sorted</h4>
                 <p className="text-sm text-muted">These indices are now mathematically guaranteed to be in their final sorted positions.</p>
               </motion.div>
             )}
             {type === 'done' && (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10">
                 <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center mx-auto mb-3 text-white"><Settings size={24}/></div>
                 <h4 className="font-bold text-lg text-success mb-2">Sorting Complete</h4>
                 <p className="text-sm text-muted">The array has reached a strictly monotonic increasing sequence. Time complexity achieved.</p>
               </motion.div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
