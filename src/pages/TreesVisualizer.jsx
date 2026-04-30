import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export default function TreesVisualizer() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [traversingNode, setTraversingNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const immutableInsert = (node, val) => {
    if (!node) return new Node(val);
    const newNode = { ...node };
    if (val < node.val) newNode.left = immutableInsert(node.left, val);
    else if (val > node.val) newNode.right = immutableInsert(node.right, val);
    else return node; // No duplicates
    return newNode;
  };

  const handleInsert = () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    setRoot(prev => immutableInsert(prev, val));
    setInputValue('');
  };

  const handleReset = () => {
    setRoot(null);
    setTraversingNode(null);
  };

  const traverse = async (node, order) => {
    if (!node) return;
    
    if (order === 'pre') {
      setTraversingNode(node.val);
      await new Promise(r => setTimeout(r, 600));
      await traverse(node.left, order);
      await traverse(node.right, order);
    } else if (order === 'in') {
      await traverse(node.left, order);
      setTraversingNode(node.val);
      await new Promise(r => setTimeout(r, 600));
      await traverse(node.right, order);
    } else if (order === 'post') {
      await traverse(node.left, order);
      await traverse(node.right, order);
      setTraversingNode(node.val);
      await new Promise(r => setTimeout(r, 600));
    }
  };

  const handleTraverse = async (order) => {
    if (isPlaying || !root) return;
    setIsPlaying(true);
    await traverse(root, order);
    setTraversingNode(null);
    setIsPlaying(false);
  };

  const TreeNodeComponent = ({ node, level = 0, x = 50, dx = 20 }) => {
    if (!node) return null;
    
    const isTraversing = traversingNode === node.val;
    const yPos = level * 70 + 60;

    return (
      <div className="contents">
        {node.left && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <motion.line 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              x1={`${x}%`} y1={`${yPos}px`} 
              x2={`${x - dx}%`} y2={`${yPos + 70}px`} 
              stroke="rgba(255,255,255,0.2)" strokeWidth="2" 
            />
          </svg>
        )}
        {node.right && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <motion.line 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              x1={`${x}%`} y1={`${yPos}px`} 
              x2={`${x + dx}%`} y2={`${yPos + 70}px`} 
              stroke="rgba(255,255,255,0.2)" strokeWidth="2" 
            />
          </svg>
        )}
        
        <motion.div 
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: isTraversing ? 1.2 : 1,
            backgroundColor: isTraversing ? 'rgba(99, 102, 241, 0.8)' : 'rgba(30, 41, 59, 0.8)',
            borderColor: isTraversing ? 'rgb(168, 85, 247)' : 'rgba(99, 102, 241, 0.4)'
          }}
          className={clsx(
            "absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 text-white flex items-center justify-center font-bold shadow-xl z-10 transition-colors",
          )}
          style={{ left: `${x}%`, top: `${yPos}px` }}
        >
          {node.val}
        </motion.div>
        
        <TreeNodeComponent node={node.left} level={level + 1} x={x - dx} dx={dx / 1.8} />
        <TreeNodeComponent node={node.right} level={level + 1} x={x + dx} dx={dx / 1.8} />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">Binary Search Tree</h1>
          <p className="text-muted text-lg">Interactive BST with real-time insertion and traversals.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-surface/60 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 px-4">
            <input 
              type="number" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white outline-none focus:border-primary/50"
              onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
            />
            <button 
              onClick={handleInsert}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/80 transition-all"
            >
              <Plus size={18} />
            </button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <button onClick={() => handleTraverse('in')} disabled={isPlaying || !root} className="px-3 h-10 font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs disabled:opacity-50">In-Order</button>
            <button onClick={() => handleTraverse('pre')} disabled={isPlaying || !root} className="px-3 h-10 font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs disabled:opacity-50">Pre-Order</button>
            <button onClick={() => handleTraverse('post')} disabled={isPlaying || !root} className="px-3 h-10 font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs disabled:opacity-50">Post-Order</button>
            <button 
              onClick={handleReset}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-error/10 text-error hover:bg-error/20 transition-all"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-3xl p-6 relative overflow-hidden flex justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative w-full h-full min-h-[500px]">
          {root ? (
            <TreeNodeComponent node={root} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                <Plus size={32} className="opacity-20" />
              </div>
              <p>Insert a value to start building the tree</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
