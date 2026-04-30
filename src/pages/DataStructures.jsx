import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ListPlus, ListMinus, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function DataStructures() {
  const [dsType, setDsType] = useState('stack');
  const [items, setItems] = useState([10, 24, 31]);
  const [inputValue, setInputValue] = useState('');

  const handlePush = () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    if (dsType === 'stack') setItems(prev => [...prev, val]);
    else setItems(prev => [...prev, val]); // Queue also pushes to end
    setInputValue('');
  };

  const handlePop = () => {
    if (items.length === 0) return;
    if (dsType === 'stack') {
      setItems(prev => prev.slice(0, -1)); // Pop from end
    } else {
      setItems(prev => prev.slice(1)); // Dequeue from front
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">Data Structures</h1>
          <p className="text-muted text-lg">Interactive deep-dive into basic abstract data types.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-surface/60 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
          <select 
            value={dsType} 
            onChange={(e) => { setDsType(e.target.value); setItems([]); }}
            className="bg-transparent text-white outline-none font-medium px-4 py-2 border-r border-white/10 cursor-pointer"
          >
            <option value="stack" className="bg-surface">Stack (LIFO)</option>
            <option value="queue" className="bg-surface">Queue (FIFO)</option>
            <option value="linkedlist" className="bg-surface">Linked List</option>
            <option value="hash" className="bg-surface">Hash Table</option>
            <option value="heap" className="bg-surface">Binary Heap</option>
          </select>
          
          <div className="flex items-center gap-2 px-4">
            <input 
              type="number" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white outline-none focus:border-primary/50"
              onKeyDown={(e) => e.key === 'Enter' && handlePush()}
            />
            <button 
              onClick={handlePush}
              className="px-4 py-2 flex items-center justify-center rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-all text-sm font-bold"
            >
              <ListPlus size={16} className="mr-1"/> {dsType === 'stack' ? 'Push' : 'Enqueue'}
            </button>
            <button 
              onClick={handlePop}
              className="px-4 py-2 flex items-center justify-center rounded-lg bg-error/20 text-error hover:bg-error/30 transition-all text-sm font-bold"
            >
              <ListMinus size={16} className="mr-1"/> {dsType === 'stack' ? 'Pop' : 'Dequeue'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-2xl p-8 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-mesh-dark opacity-20 pointer-events-none" />
        
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-12">
          {dsType === 'stack' && (
            <div className="flex flex-col-reverse items-center justify-end w-64 h-96 border-b-4 border-x-4 border-white/20 rounded-b-xl p-4 gap-2 bg-black/20">
              <AnimatePresence>
                {items.map((item, idx) => (
                  <motion.div
                    key={`${idx}-${item}`}
                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.8 }}
                    className={clsx(
                      "w-full h-12 flex items-center justify-center font-bold text-lg rounded-lg shadow-lg border border-white/10",
                      idx === items.length - 1 ? "bg-primary text-white" : "bg-surface text-muted"
                    )}
                  >
                    {item}
                    {idx === items.length - 1 && <span className="absolute -right-16 text-sm text-primary font-mono bg-primary/10 px-2 py-1 rounded">TOP</span>}
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <span className="text-muted text-sm my-auto">Stack is Empty</span>}
            </div>
          )}

          {dsType === 'queue' && (
            <div className="flex items-center justify-start w-full max-w-4xl h-48 border-y-4 border-white/20 p-4 gap-4 bg-black/20 overflow-x-auto">
              <AnimatePresence>
                {items.map((item, idx) => (
                  <motion.div
                    key={`${idx}-${item}`}
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    className={clsx(
                      "w-20 h-20 flex-shrink-0 flex flex-col items-center justify-center font-bold text-xl rounded-lg shadow-lg border border-white/10 relative",
                      idx === 0 ? "bg-secondary text-white" : idx === items.length - 1 ? "bg-primary text-white" : "bg-surface text-muted"
                    )}
                  >
                    {item}
                    {idx === 0 && <span className="absolute -bottom-8 text-xs text-secondary font-mono bg-secondary/10 px-2 py-1 rounded">FRONT</span>}
                    {idx === items.length - 1 && items.length > 1 && <span className="absolute -bottom-8 text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">REAR</span>}
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <span className="text-muted w-full text-center text-sm">Queue is Empty</span>}
            </div>
          )}

          {dsType === 'linkedlist' && (
            <div className="flex items-center justify-center w-full h-48 p-4 gap-2 overflow-x-auto">
              <AnimatePresence>
                {items.map((item, idx) => (
                  <div key={`${idx}-${item}`} className="flex items-center gap-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-24 h-16 flex rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.2)] border border-primary/30 overflow-hidden"
                    >
                      <div className="flex-1 bg-surface flex items-center justify-center font-bold text-white text-lg">{item}</div>
                      <div className="w-8 bg-primary/20 border-l border-primary/30 flex items-center justify-center text-primary text-xs">next</div>
                    </motion.div>
                    {idx < items.length - 1 && (
                      <motion.div initial={{ width: 0 }} animate={{ width: 40 }} className="flex items-center overflow-hidden">
                        <ArrowRight className="text-primary animate-pulse" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <span className="text-muted text-sm">List is Empty</span>}
            </div>
          )}

          {dsType === 'hash' && (
            <div className="flex flex-col gap-2 w-full max-w-lg h-96 overflow-y-auto pr-4">
              {Array.from({length: 8}).map((_, bucketIdx) => (
                <div key={bucketIdx} className="flex gap-4 w-full">
                  <div className="w-12 h-12 flex-shrink-0 bg-surface border border-white/10 rounded-lg flex items-center justify-center font-mono text-muted">{bucketIdx}</div>
                  <div className="flex-1 flex gap-2 overflow-x-auto">
                    {items.filter(item => item % 8 === bucketIdx).map((item, idx) => (
                       <motion.div key={idx} initial={{scale:0}} animate={{scale:1}} className="w-12 h-12 bg-secondary/20 border border-secondary/50 text-secondary font-bold flex items-center justify-center rounded-lg shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                         {item}
                       </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {dsType === 'heap' && (
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex gap-2 p-4 bg-surface/50 rounded-xl border border-white/5 overflow-x-auto max-w-full">
                {items.map((item, idx) => (
                  <motion.div key={idx} layout className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-muted">{idx}</span>
                    <div className="w-10 h-10 bg-primary/20 border border-primary/50 flex items-center justify-center rounded font-bold text-white">
                      {item}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="relative w-full h-64 overflow-hidden">
                {items.map((item, i) => {
                   const level = Math.floor(Math.log2(i + 1));
                   const posInLevel = i - (Math.pow(2, level) - 1);
                   const numInLevel = Math.pow(2, level);
                   const x = (posInLevel + 0.5) * (100 / numInLevel);
                   const y = level * 60 + 20;

                   return (
                     <motion.div
                       key={i}
                       layout
                       className="absolute w-10 h-10 -ml-5 bg-surface border-2 border-primary/50 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg z-10"
                       style={{ left: `${x}%`, top: `${y}px` }}
                     >
                       {item}
                     </motion.div>
                   )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
