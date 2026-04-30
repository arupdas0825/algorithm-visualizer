import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Activity, Zap } from 'lucide-react';
import { bubbleSort } from '../algorithms/sorting/bubble';
import { quickSort } from '../algorithms/sorting/quick';
import { mergeSort } from '../algorithms/sorting/merge';
import { insertionSort } from '../algorithms/sorting/insertion';
import { selectionSort } from '../algorithms/sorting/selection';
import clsx from 'clsx';

const ALGORITHMS = {
  bubble: bubbleSort,
  quick: quickSort,
  merge: mergeSort,
  insertion: insertionSort,
  selection: selectionSort,
};

export default function ComparisonMode() {
  const [algo1, setAlgo1] = useState('quick');
  const [algo2, setAlgo2] = useState('bubble');
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats1, setStats1] = useState({ swaps: 0, compares: 0 });
  const [stats2, setStats2] = useState({ swaps: 0, compares: 0 });
  
  const arraySize = 30;

  const resetArrays = () => {
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    setArray1([...newArr]);
    setArray2([...newArr]);
    setStats1({ swaps: 0, compares: 0 });
    setStats2({ swaps: 0, compares: 0 });
    setIsPlaying(false);
  };

  useEffect(() => {
    resetArrays();
  }, []);

  const runComparison = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    const gen1 = ALGORITHMS[algo1]([...array1]);
    const gen2 = ALGORITHMS[algo2]([...array2]);

    let done1 = false;
    let done2 = false;

    while (!done1 || !done2) {
      if (!done1) {
        const res1 = gen1.next();
        if (res1.done) {
          done1 = true;
        } else {
          setArray1(res1.value.array);
          if (res1.value.type === 'swap') setStats1(s => ({ ...s, swaps: s.swaps + 1 }));
          if (res1.value.type === 'compare') setStats1(s => ({ ...s, compares: s.compares + 1 }));
        }
      }

      if (!done2) {
        const res2 = gen2.next();
        if (res2.done) {
          done2 = true;
        } else {
          setArray2(res2.value.array);
          if (res2.value.type === 'swap') setStats2(s => ({ ...s, swaps: s.swaps + 1 }));
          if (res2.value.type === 'compare') setStats2(s => ({ ...s, compares: s.compares + 1 }));
        }
      }

      await new Promise(r => setTimeout(r, 20));
    }

    setIsPlaying(false);
  };

  const Visualizer = ({ array, algo, stats, color }) => (
    <div className="flex-1 glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-white/5 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 blur-3xl rounded-full`} />
      <div className="flex justify-between items-center relative z-10">
        <h3 className="text-xl font-bold capitalize">{algo} Sort</h3>
        <div className="flex gap-4 text-xs font-mono">
          <span className="text-muted">COMPARES: <span className="text-white">{stats.compares}</span></span>
          <span className="text-muted">SWAPS: <span className="text-white">{stats.swaps}</span></span>
        </div>
      </div>
      <div className="flex-1 flex items-end justify-center gap-1 min-h-[200px]">
        {array.map((val, i) => (
          <div 
            key={i} 
            className={`w-full rounded-t-sm transition-all duration-100 ${color.replace('from-', 'bg-').split(' ')[0]}`}
            style={{ height: `${val}%` }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full gap-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">Algorithm Battle</h1>
          <p className="text-muted text-lg">Side-by-side performance comparison.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-surface/60 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
          <select value={algo1} onChange={e => setAlgo1(e.target.value)} className="bg-transparent text-white outline-none font-medium px-4 py-2 border-r border-white/10 cursor-pointer">
            {Object.keys(ALGORITHMS).map(a => <option key={a} value={a} className="bg-surface">{a} Sort</option>)}
          </select>
          <div className="px-4 text-primary font-bold">VS</div>
          <select value={algo2} onChange={e => setAlgo2(e.target.value)} className="bg-transparent text-white outline-none font-medium px-4 py-2 border-l border-white/10 cursor-pointer">
            {Object.keys(ALGORITHMS).map(a => <option key={a} value={a} className="bg-surface">{a} Sort</option>)}
          </select>
          
          <div className="flex gap-2 px-4">
            <button onClick={runComparison} disabled={isPlaying} className="px-6 h-10 bg-primary text-white font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50">
              <Play size={18} fill="currentColor" /> Battle
            </button>
            <button onClick={resetArrays} disabled={isPlaying} className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex gap-6 flex-col lg:flex-row">
        <Visualizer array={array1} algo={algo1} stats={stats1} color="from-blue-500 to-indigo-600" />
        <Visualizer array={array2} algo={algo2} stats={stats2} color="from-purple-500 to-pink-600" />
      </div>
    </div>
  );
}
