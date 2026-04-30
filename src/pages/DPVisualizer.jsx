import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

export default function DPVisualizer() {
  const [dpType, setDpType] = useState('knapsack');
  const [capacity, setCapacity] = useState(5);
  const [fibN, setFibN] = useState(6);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Dummy data for Knapsack
  const items = [
    { w: 2, v: 3 },
    { w: 3, v: 4 },
    { w: 4, v: 5 },
    { w: 5, v: 8 }
  ];

  const generateKnapsackTable = () => {
    const table = Array(items.length + 1).fill(0).map(() => Array(capacity + 1).fill(0));
    for (let i = 1; i <= items.length; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (items[i-1].w <= w) {
          table[i][w] = Math.max(items[i-1].v + table[i-1][w-items[i-1].w], table[i-1][w]);
        } else {
          table[i][w] = table[i-1][w];
        }
      }
    }
    return table;
  };

  const fib = (n) => {
    const res = [0, 1];
    for (let i = 2; i <= n; i++) res[i] = res[i - 1] + res[i - 2];
    return res;
  };

  const knapsackTable = generateKnapsackTable();
  const fibSequence = fib(fibN);

  return (
    <div className="flex flex-col h-full gap-6 overflow-y-auto pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">Dynamic Programming</h1>
          <p className="text-muted text-lg">Master the art of optimization and memoization.</p>
        </div>
        <div className="flex items-center gap-4 bg-surface/60 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
          <select 
            value={dpType} 
            onChange={(e) => setDpType(e.target.value)}
            className="bg-transparent text-white outline-none font-medium px-4 py-2 border-none cursor-pointer"
          >
            <option value="knapsack" className="bg-surface">0/1 Knapsack</option>
            <option value="fibonacci" className="bg-surface">Fibonacci (Tabulation)</option>
          </select>
        </div>
      </header>

      <div className="flex gap-6 items-start flex-col lg:flex-row">
        {/* Settings/Inputs */}
        <div className="glass-panel p-6 rounded-2xl w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
          <h3 className="font-bold text-lg border-b border-white/10 pb-2">Configuration</h3>
          
          {dpType === 'knapsack' ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted font-medium">Knapsack Capacity ({capacity})</label>
                <input 
                  type="range" min="3" max="8" 
                  value={capacity} onChange={(e) => setCapacity(Number(e.target.value))}
                  className="accent-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted font-medium mb-1">Available Items</label>
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/10">
                    <span className="text-xs font-mono text-secondary">Item {idx+1}</span>
                    <div className="text-xs font-bold space-x-2">
                      <span className="text-blue-400">W: {item.w}</span>
                      <span className="text-green-400">V: {item.v}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted font-medium">Target N ({fibN})</label>
              <input 
                type="range" min="2" max="12" 
                value={fibN} onChange={(e) => setFibN(Number(e.target.value))}
                className="accent-secondary"
              />
            </div>
          )}
        </div>

        {/* DP Visualization Area */}
        <div className="flex-1 glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col min-h-[450px]">
          <div className="absolute inset-0 bg-mesh-dark opacity-20 pointer-events-none" />
          
          {dpType === 'knapsack' ? (
            <div className="relative z-10 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-4">Knapsack Tabulation Matrix</h3>
              <div className="flex-1 flex items-center justify-center overflow-auto">
                <div className="flex flex-col gap-1 p-4 bg-background/50 rounded-xl border border-white/5 shadow-2xl">
                  <div className="flex gap-1">
                    <div className="w-10 h-10 flex items-center justify-center text-[10px] font-bold text-muted bg-surface/50 rounded">W/i</div>
                    {Array.from({length: capacity + 1}).map((_, w) => (
                      <div key={w} className="w-10 h-10 flex items-center justify-center text-xs font-bold text-primary bg-surface/80 rounded">{w}</div>
                    ))}
                  </div>
                  {knapsackTable.map((row, i) => (
                    <div key={i} className="flex gap-1">
                      <div className="w-10 h-10 flex items-center justify-center text-xs font-bold text-secondary bg-surface/80 rounded">{i}</div>
                      {row.map((val, w) => (
                        <motion.div 
                          key={w}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (i * capacity + w) * 0.02 }}
                          className={clsx(
                            "w-10 h-10 flex items-center justify-center text-sm font-bold rounded border transition-all",
                            i === items.length && w === capacity ? "bg-success border-success text-white" : "bg-surface border-white/10 text-white"
                          )}
                        >
                          {val}
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-8">Fibonacci Sequence Construction</h3>
              <div className="flex-1 flex items-center justify-center gap-4 flex-wrap">
                <AnimatePresence>
                  {fibSequence.map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="text-[10px] font-mono text-muted">F({i})</div>
                      <div className="w-14 h-14 bg-surface border-2 border-secondary/50 rounded-xl flex items-center justify-center text-xl font-black text-white shadow-lg">
                        {val}
                      </div>
                      {i < fibSequence.length - 1 && i > 0 && (
                        <div className="text-xs text-secondary/50 font-bold">
                           {fibSequence[i-1]} + {fibSequence[i]}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
