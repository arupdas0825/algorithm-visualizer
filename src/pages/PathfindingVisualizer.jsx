import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, MousePointer2, Eraser, Navigation, Cpu, Target, Zap } from 'lucide-react';
import ShortcutManager from '../components/common/ShortcutManager';
import clsx from 'clsx';
import { bfs, dfs, dijkstra, astar, getNodesInShortestPathOrder } from '../algorithms/pathfinding/index';

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 30;

const createNode = (col, row) => ({
  col,
  row,
  isStart: row === START_NODE_ROW && col === START_NODE_COL,
  isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
  distance: Infinity,
  isVisited: false,
  isWall: false,
  isPath: false,
  previousNode: null,
});

const getInitialGrid = (rows = 20, cols = 40) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('wall'); // 'wall', 'start', 'end'
  const [startNodeInfo, setStartNodeInfo] = useState({row: START_NODE_ROW, col: START_NODE_COL});
  const [finishNodeInfo, setFinishNodeInfo] = useState({row: FINISH_NODE_ROW, col: FINISH_NODE_COL});

  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  const handleMouseDown = (row, col) => {
    if (isPlaying) return;
    setMouseIsPressed(true);
    
    if (mode === 'wall') {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    } else if (mode === 'start') {
      const newGrid = getNewGridWithStartToggled(grid, row, col);
      setGrid(newGrid);
      setStartNodeInfo({row, col});
    } else if (mode === 'end') {
      const newGrid = getNewGridWithFinishToggled(grid, row, col);
      setGrid(newGrid);
      setFinishNodeInfo({row, col});
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isPlaying) return;
    if (mode === 'wall') {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    } else if (mode === 'start') {
      const newGrid = getNewGridWithStartToggled(grid, row, col);
      setGrid(newGrid);
      setStartNodeInfo({row, col});
    } else if (mode === 'end') {
      const newGrid = getNewGridWithFinishToggled(grid, row, col);
      setGrid(newGrid);
      setFinishNodeInfo({row, col});
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const resetGrid = () => {
    if (isPlaying) return;
    const newGrid = getInitialGrid();
    
    // Maintain custom start/end points if they were moved
    newGrid[START_NODE_ROW][START_NODE_COL].isStart = false;
    newGrid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = false;
    
    newGrid[startNodeInfo.row][startNodeInfo.col].isStart = true;
    newGrid[finishNodeInfo.row][finishNodeInfo.col].isFinish = true;
    
    setGrid(newGrid);
  };

  const visualizeAlgorithm = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    // Reset visited/path state without clearing walls
    const newGrid = grid.map(row => row.map(node => ({
      ...node, isVisited: false, isPath: false, distance: Infinity, previousNode: null
    })));
    setGrid(newGrid);

    const startNode = newGrid[startNodeInfo.row][startNodeInfo.col];
    const finishNode = newGrid[finishNodeInfo.row][finishNodeInfo.col];

    let generator;
    if (algorithm === 'dijkstra') generator = dijkstra(newGrid, startNode, finishNode);
    else if (algorithm === 'bfs') generator = bfs(newGrid, startNode, finishNode);
    else if (algorithm === 'dfs') generator = dfs(newGrid, startNode, finishNode);
    else if (algorithm === 'astar') generator = astar(newGrid, startNode, finishNode);

    const animate = async () => {
      while (true) {
        const { value, done } = generator.next();
        if (done) break;
        
        if (value.type === 'visit') {
          setGrid(prev => {
            const nextGrid = [...prev];
            nextGrid[value.node.row] = [...nextGrid[value.node.row]];
            nextGrid[value.node.row][value.node.col] = { ...value.node, isVisited: true };
            return nextGrid;
          });
          await new Promise(r => setTimeout(r, 10)); // Animation speed
        }
      }

      // Shortest Path
      const pathGenerator = getNodesInShortestPathOrder(finishNode);
      while (true) {
        const { value, done } = pathGenerator.next();
        if (done) break;
        
        if (value && value.type === 'path') {
          setGrid(prev => {
            const nextGrid = [...prev];
            nextGrid[value.node.row] = [...nextGrid[value.node.row]];
            nextGrid[value.node.row][value.node.col] = { ...value.node, isPath: true };
            return nextGrid;
          });
          await new Promise(r => setTimeout(r, 20)); // Path speed
        }
      }
      setIsPlaying(false);
    };

    animate();
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <ShortcutManager onPlayPause={visualizeAlgorithm} onReset={resetGrid} />
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">Pathfinding Visualizer</h1>
          <p className="text-muted text-lg">Draw walls and watch algorithms find the shortest path.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-surface/60 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isPlaying}
            className="bg-transparent text-white outline-none font-medium px-4 py-2 border-r border-white/10 cursor-pointer disabled:opacity-50"
          >
            <option value="dijkstra" className="bg-surface">Dijkstra's</option>
            <option value="astar" className="bg-surface">A* Search</option>
            <option value="bfs" className="bg-surface">Breadth-First Search</option>
            <option value="dfs" className="bg-surface">Depth-First Search</option>
          </select>
          
          <div className="flex items-center gap-2 px-4">
            <button 
              onClick={() => setMode('wall')}
              className={clsx("w-10 h-10 flex items-center justify-center rounded-xl transition-all", mode === 'wall' ? 'bg-primary/30 text-primary' : 'bg-white/5 hover:bg-white/10 text-white')}
              title="Draw Walls"
            >
              < Eraser size={18} />
            </button>
            <button 
              onClick={() => setMode('start')}
              className={clsx("w-10 h-10 flex items-center justify-center rounded-xl transition-all", mode === 'start' ? 'bg-success/30 text-success' : 'bg-white/5 hover:bg-white/10 text-white')}
              title="Move Start Node"
            >
              < Navigation size={18} />
            </button>
            <button 
              onClick={() => {
                const newGrid = grid.map(row => row.map(node => ({
                  ...node, isWall: Math.random() < 0.3 && !node.isStart && !node.isFinish
                })));
                setGrid(newGrid);
              }}
              disabled={isPlaying}
              className="px-4 h-10 flex items-center gap-2 font-bold justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-50"
              title="Random Maze"
            >
              <Cpu size={18} /> Maze
            </button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <button 
              onClick={visualizeAlgorithm}
              disabled={isPlaying}
              className="px-6 h-10 flex items-center gap-2 font-bold justify-center rounded-xl bg-primary text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all disabled:opacity-50"
            >
              <Play size={18} fill="currentColor" /> Visualize
            </button>
            <button 
              onClick={resetGrid}
              disabled={isPlaying}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-error hover:text-red-400 disabled:opacity-50"
              title="Clear Board"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-2xl p-6 relative overflow-hidden flex items-center justify-center" onMouseLeave={handleMouseUp}>
        <div className="absolute inset-0 bg-mesh-dark opacity-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col border border-white/10 shadow-2xl rounded-lg overflow-hidden bg-background">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="flex">
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall, isVisited, isPath } = node;
                  
                  let extraClass = '';
                  if (isFinish) extraClass = 'bg-error shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20 rounded-sm scale-110';
                  else if (isStart) extraClass = 'bg-success shadow-[0_0_15px_rgba(34,197,94,0.8)] z-20 rounded-sm scale-110';
                  else if (isPath) extraClass = 'bg-secondary/90 shadow-[0_0_10px_rgba(168,85,247,0.6)] z-10 scale-105 rounded-sm animate-pulse-slow';
                  else if (isWall) extraClass = 'bg-surface border-transparent scale-95 rounded-sm';
                  else if (isVisited) extraClass = 'bg-primary/20 border-primary/10';

                  return (
                    <div
                      key={`${row}-${col}`}
                      id={`node-${row}-${col}`}
                      className={clsx(
                        'w-5 h-5 lg:w-6 lg:h-6 border-r border-b border-white/5 transition-colors duration-200',
                        extraClass
                      )}
                      onMouseDown={() => handleMouseDown(row, col)}
                      onMouseEnter={() => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Utility functions for grid manipulations
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart || node.isFinish) return newGrid;
  newGrid[row] = [...newGrid[row]];
  newGrid[row][col] = {
    ...node,
    isWall: !node.isWall,
  };
  return newGrid;
};

const getNewGridWithStartToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isFinish) return newGrid;
  
  // Find old start and clear it
  for(let r=0; r<grid.length; r++) {
    for(let c=0; c<grid[0].length; c++) {
      if(newGrid[r][c].isStart) {
        newGrid[r] = [...newGrid[r]];
        newGrid[r][c] = { ...newGrid[r][c], isStart: false };
      }
    }
  }
  
  newGrid[row] = [...newGrid[row]];
  newGrid[row][col] = { ...node, isStart: true, isWall: false };
  return newGrid;
};

const getNewGridWithFinishToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart) return newGrid;
  
  // Find old finish and clear it
  for(let r=0; r<grid.length; r++) {
    for(let c=0; c<grid[0].length; c++) {
      if(newGrid[r][c].isFinish) {
        newGrid[r] = [...newGrid[r]];
        newGrid[r][c] = { ...newGrid[r][c], isFinish: false };
      }
    }
  }
  
  newGrid[row] = [...newGrid[row]];
  newGrid[row][col] = { ...node, isFinish: true, isWall: false };
  return newGrid;
};
