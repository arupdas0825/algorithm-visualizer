import { useState, useRef, useCallback, useEffect } from 'react';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import ArrayVisualizer from './components/ArrayVisualizer';
import Grid from './components/Grid';
import Controls from './components/Controls';
import AlgorithmInfo from './components/AlgorithmInfo';
import StatsPanel from './components/StatsPanel';
import Legend from './components/Legend';
import DataStructuresPage from './components/DataStructuresPage';
import ComparisonPage from './components/ComparisonPage';
import LearningPage from './components/LearningPage';
import DocsPage from './components/DocsPage';
// Algorithms are now computed on the Flask Python backend
import './App.css';

const GRID_ROWS = 20, GRID_COLS = 30;

function generateRandomArray(size = 30) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}
function generateEmptyGrid() {
  return Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(0));
}
function speedToMs(speed) { return Math.max(5, 500 - (speed - 1) * (495 / 99)); }

// Handlers map directly to Python backend API endpoints

export default function App() {
  /* ── Navigation ─────────────────────────────── */
  const [page, setPage] = useState('home'); // 'home' | 'dashboard' | 'sorting' | 'graph' | 'datastructs' | 'comparison' | 'learning' | 'docs'

  const navigate = useCallback((p) => {
    if (p === 'home') { setPage('home'); return; }
    setPage(p);
  }, []);

  /* ── Sorting & Pathfinding State ────────────── */
  const [vizMode, setVizMode] = useState('sort'); // 'sort' | 'pathfind'
  const [algorithm, setAlgorithm] = useState('bubble');
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [arr, setArr] = useState(() => generateRandomArray(30));
  const [highlights, setHighlights] = useState({});
  const [statusText, setStatusText] = useState('Ready');
  const [stepLabel, setStepLabel] = useState('Step 0 / 0');
  const [stats, setStats] = useState({ arraySize: 30, comparisons: 0, swaps: 0, time: '0.00', gridSize: `${GRID_ROWS}×${GRID_COLS}`, nodesVisited: 0, pathLength: 0 });

  const stepsRef = useRef([]); const indexRef = useRef(0); const playingRef = useRef(false);
  const timerRef = useRef(null); const compRef = useRef(0); const swapRef = useRef(0);
  const t0Ref = useRef(0); const speedRef = useRef(50); const modeRef = useRef('sort');

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { modeRef.current = vizMode; }, [vizMode]);

  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [start, setStart] = useState([2, 2]);
  const [end, setEnd] = useState([GRID_ROWS - 3, GRID_COLS - 3]);
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [pathCells, setPathCells] = useState(new Set());
  const pfDataRef = useRef({ visitedOrder: [], path: [], found: false });
  const pfIndexRef = useRef(0); const draggingRef = useRef(null);

  const stopPlayback = useCallback(() => { playingRef.current = false; clearTimeout(timerRef.current); }, []);

  const renderSortStep = useCallback((idx) => {
    const step = stepsRef.current[idx]; if (!step) return;
    setArr(step.array);
    setHighlights({ comparing: step.comparing, swapped: step.swapped, sortedIndices: step.sortedIndices, pivot: step.pivot ?? -1 });
    if (step.comparing?.length > 0) compRef.current++;
    if (step.swapped) swapRef.current++;
    const elapsed = ((performance.now() - t0Ref.current) / 1000).toFixed(2);
    setStats(s => ({ ...s, comparisons: compRef.current, swaps: swapRef.current, time: elapsed }));
    setStepLabel(`Step ${idx + 1} / ${stepsRef.current.length}`);
  }, []);

  const tick = useCallback(() => {
    if (!playingRef.current) return;
    if (modeRef.current === 'sort') {
      if (indexRef.current >= stepsRef.current.length) { playingRef.current = false; const elapsed = ((performance.now() - t0Ref.current) / 1000).toFixed(2); setStats(s => ({ ...s, time: elapsed })); setStatusText('✔ Sorted!'); return; }
      renderSortStep(indexRef.current); indexRef.current++;
    } else {
      const { visitedOrder, path } = pfDataRef.current; const total = visitedOrder.length + path.length;
      if (pfIndexRef.current >= total) { playingRef.current = false; setStatusText('✔ Done!'); return; }
      if (pfIndexRef.current < visitedOrder.length) { const [r, c] = visitedOrder[pfIndexRef.current]; setVisitedCells(prev => new Set(prev).add(`${r},${c}`)); }
      else { const pi = pfIndexRef.current - visitedOrder.length; const [r, c] = path[pi]; setPathCells(prev => new Set(prev).add(`${r},${c}`)); }
      pfIndexRef.current++; setStepLabel(`Step ${pfIndexRef.current} / ${total}`);
    }
    timerRef.current = setTimeout(tick, speedToMs(speedRef.current));
  }, [renderSortStep]);

  const computeAndPlay = useCallback(async (sourceArr) => {
    t0Ref.current = performance.now(); compRef.current = 0; swapRef.current = 0;
    try {
      setStatusText('Computing on Python Backend...');
      const res = await fetch('/api/sorting/run', { method: 'POST', body: JSON.stringify({ algorithm, array: sourceArr }) });
      const data = await res.json();
      stepsRef.current = data.steps; indexRef.current = 0;
      setStepLabel(`Step 0 / ${stepsRef.current.length}`);
      playingRef.current = true; setStatusText('Playing…'); tick();
    } catch (err) {
      console.error(err);
      setStatusText('Error computing. Is Flask running?');
    }
  }, [algorithm, tick]);

  const handleGenerate = useCallback(() => {
    stopPlayback();
    if (vizMode === 'sort') { const newArr = generateRandomArray(arraySize); setArr(newArr); setHighlights({}); stepsRef.current = []; indexRef.current = 0; compRef.current = 0; swapRef.current = 0; setStats(s => ({ ...s, arraySize, comparisons: 0, swaps: 0, time: '0.00' })); setStatusText('Array generated — press Play'); setStepLabel('Step 0 / 0'); }
    else { runPathfinding(); }
  }, [vizMode, arraySize, stopPlayback]);

  const runPathfinding = useCallback(async () => {
    stopPlayback(); setVisitedCells(new Set()); setPathCells(new Set());
    t0Ref.current = performance.now();
    try {
      setStatusText('Computing on Python Backend...');
      const res = await fetch('/api/pathfinding/run', { method: 'POST', body: JSON.stringify({ algorithm, grid, start, end }) });
      const result = await res.json();
      pfDataRef.current = result; pfIndexRef.current = 0;
      const elapsed = ((performance.now() - t0Ref.current)).toFixed(2); const total = result.visitedOrder.length + result.path.length;
      setStats(s => ({ ...s, gridSize: `${GRID_ROWS}×${GRID_COLS}`, nodesVisited: result.visitedOrder.length, pathLength: result.path.length, time: elapsed }));
      setStepLabel(`Step 0 / ${total}`); setStatusText(result.found ? 'Path found — press Play' : 'No path — press Play to see exploration');
    } catch (err) {
      console.error(err);
      setStatusText('Error computing. Is Flask running?');
    }
  }, [algorithm, grid, start, end, stopPlayback]);

  const handlePlay = useCallback(async () => {
    if (playingRef.current) return;
    if (vizMode === 'sort') { if (stepsRef.current.length === 0) { await computeAndPlay(arr); return; } playingRef.current = true; setStatusText('Playing…'); tick(); }
    else { if (pfDataRef.current.visitedOrder.length === 0) { await runPathfinding(); } playingRef.current = true; setStatusText('Playing…'); setTimeout(tick, 50); }
  }, [vizMode, arr, computeAndPlay, tick, runPathfinding]);

  const handlePause = useCallback(() => { stopPlayback(); setStatusText('Paused'); }, [stopPlayback]);

  const handleStep = useCallback(async () => {
    stopPlayback();
    if (vizMode === 'sort') {
      if (stepsRef.current.length === 0) {
        try {
          setStatusText('Computing on Python Backend...');
          const res = await fetch('/api/sorting/run', { method: 'POST', body: JSON.stringify({ algorithm, array: arr }) });
          const data = await res.json();
          t0Ref.current = performance.now(); compRef.current = 0; swapRef.current = 0; stepsRef.current = data.steps; indexRef.current = 0; setStepLabel(`Step 0 / ${stepsRef.current.length}`);
          if (indexRef.current < stepsRef.current.length) { renderSortStep(indexRef.current); indexRef.current++; }
        } catch (err) { setStatusText('Error computing. Is Flask running?'); }
      } else {
        if (indexRef.current < stepsRef.current.length) { renderSortStep(indexRef.current); indexRef.current++; }
      }
    } else {
      if (pfDataRef.current.visitedOrder.length === 0) { await runPathfinding(); return; }
      const { visitedOrder, path } = pfDataRef.current; const total = visitedOrder.length + path.length;
      if (pfIndexRef.current < total) { if (pfIndexRef.current < visitedOrder.length) { const [r, c] = visitedOrder[pfIndexRef.current]; setVisitedCells(prev => new Set(prev).add(`${r},${c}`)); } else { const pi = pfIndexRef.current - visitedOrder.length; const [r, c] = path[pi]; setPathCells(prev => new Set(prev).add(`${r},${c}`)); } pfIndexRef.current++; setStepLabel(`Step ${pfIndexRef.current} / ${total}`); }
    }
  }, [vizMode, algorithm, arr, stopPlayback, renderSortStep, runPathfinding]);

  const handleReset = useCallback(() => {
    stopPlayback();
    if (vizMode === 'sort') { indexRef.current = 0; compRef.current = 0; swapRef.current = 0; setHighlights({}); setStats(s => ({ ...s, comparisons: 0, swaps: 0, time: '0.00' })); setStepLabel(`Step 0 / ${stepsRef.current.length}`); setStatusText('Reset'); }
    else { pfIndexRef.current = 0; setVisitedCells(new Set()); setPathCells(new Set()); setStepLabel(`Step 0 / ${pfDataRef.current.visitedOrder.length + pfDataRef.current.path.length}`); setStatusText('Reset'); }
  }, [vizMode, stopPlayback]);

  const handleAlgorithmChange = useCallback((algo) => {
    stopPlayback(); setAlgorithm(algo);
    if (vizMode === 'sort') { stepsRef.current = []; indexRef.current = 0; compRef.current = 0; swapRef.current = 0; setStats(s => ({ ...s, comparisons: 0, swaps: 0, time: '0.00' })); setStepLabel('Step 0 / 0'); }
    else { pfDataRef.current = { visitedOrder: [], path: [], found: false }; pfIndexRef.current = 0; setVisitedCells(new Set()); setPathCells(new Set()); setStats(s => ({ ...s, nodesVisited: 0, pathLength: 0, time: '0.00' })); setStepLabel('Step 0 / 0'); }
  }, [vizMode, stopPlayback]);

  const handleClearGrid = useCallback(() => {
    stopPlayback(); setGrid(generateEmptyGrid()); setVisitedCells(new Set()); setPathCells(new Set());
    pfDataRef.current = { visitedOrder: [], path: [], found: false }; pfIndexRef.current = 0;
    setStats(s => ({ ...s, nodesVisited: 0, pathLength: 0, time: '0.00' })); setStepLabel('Step 0 / 0'); setStatusText('Grid cleared');
  }, [stopPlayback]);

  /* ── Grid interaction ───────────────────────── */
  const handleCellMouseDown = useCallback((r, c) => {
    if (r === start[0] && c === start[1]) { draggingRef.current = 'start'; return; }
    if (r === end[0] && c === end[1]) { draggingRef.current = 'end'; return; }
    draggingRef.current = 'wall'; setGrid(prev => { const g = prev.map(row => [...row]); g[r][c] = g[r][c] === 1 ? 0 : 1; return g; });
  }, [start, end]);

  const handleCellMouseEnter = useCallback((r, c) => {
    if (!draggingRef.current) return;
    if (draggingRef.current === 'wall') { setGrid(prev => { const g = prev.map(row => [...row]); g[r][c] = g[r][c] === 1 ? 0 : 1; return g; }); }
    else if (draggingRef.current === 'start') { if (grid[r][c] !== 1 && !(r === end[0] && c === end[1])) setStart([r, c]); }
    else if (draggingRef.current === 'end') { if (grid[r][c] !== 1 && !(r === start[0] && c === start[1])) setEnd([r, c]); }
  }, [grid, start, end]);

  useEffect(() => { const up = () => { draggingRef.current = null; }; window.addEventListener('mouseup', up); return () => window.removeEventListener('mouseup', up); }, []);

  // When switching into sorting or graph page, set vizMode
  useEffect(() => {
    if (page === 'sorting') { setVizMode('sort'); setAlgorithm('bubble'); setStatusText('Ready'); setStats(s => ({ ...s, comparisons: 0, swaps: 0, time: '0.00' })); }
    if (page === 'graph') { setVizMode('pathfind'); setAlgorithm('bfs'); setStatusText('Click cells to add walls, then press Run Algorithm'); setStats(s => ({ ...s, nodesVisited: 0, pathLength: 0, time: '0.00' })); }
  }, [page]);

  /* ── Home page ──────────────────────────────── */
  if (page === 'home') {
    return <HomePage onLaunch={() => setPage('dashboard')} />;
  }

  /* ── Visualizer page (sorting or graph) ─────── */
  const renderVisualizer = () => (
    <>
      <header className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-title">{vizMode === 'sort' ? 'Sorting Visualizer' : 'Graph Visualizer'}</h1>
          <span className="dash-subtitle">{vizMode === 'sort' ? 'Sorting Algorithms' : 'Pathfinding Algorithms'}</span>
        </div>
        <div className="dash-header-right">
          <div className="search-box"><span className="search-icon">🔍</span><input type="text" placeholder="Search algorithms..." readOnly /></div>
          <button className="header-icon-btn" title="Notifications">🔔</button>
          <div className="avatar">AV</div>
        </div>
      </header>

      <StatsPanel mode={vizMode} stats={stats} />

      <div className="dash-body">
        <div className="viz-area">
          <div className="viz-card">
            <div className="viz-card-header">
              <h2>{vizMode === 'sort' ? '📊 Sorting Visualization' : '🗺️ Pathfinding Grid'}</h2>
              <span className="viz-status">{statusText}</span>
            </div>
            <div className={`viz-card-body ${vizMode === 'pathfind' ? 'viz-body-center' : ''}`}>
              {vizMode === 'sort' ? (
                <ArrayVisualizer array={arr} highlights={highlights} />
              ) : (
                <Grid grid={grid} start={start} end={end} visitedCells={visitedCells} pathCells={pathCells} onCellMouseDown={handleCellMouseDown} onCellMouseEnter={handleCellMouseEnter} />
              )}
            </div>
            <div className="viz-card-footer"><span>{stepLabel}</span></div>
          </div>
          {vizMode === 'pathfind' && <Legend />}
        </div>
        <div className="right-panel">
          <Controls mode={vizMode} algorithm={algorithm} arraySize={arraySize} speed={speed} onAlgorithmChange={handleAlgorithmChange} onSizeChange={setArraySize} onSpeedChange={setSpeed} onGenerate={handleGenerate} onPlay={handlePlay} onPause={handlePause} onStep={handleStep} onReset={handleReset} onClearGrid={handleClearGrid} />
          <AlgorithmInfo algorithm={algorithm} />
        </div>
      </div>
    </>
  );

  /* ── Main Layout ────────────────────────────── */
  return (
    <div className="app-shell">
      <Sidebar activePage={page} onNavigate={navigate} />
      <div className="app-content">
        {page === 'dashboard' && <DashboardPage onNavigate={navigate} />}
        {page === 'sorting' && renderVisualizer()}
        {page === 'graph' && renderVisualizer()}
        {page === 'datastructs' && <DataStructuresPage />}
        {page === 'comparison' && <ComparisonPage />}
        {page === 'learning' && <LearningPage />}
        {page === 'docs' && <DocsPage />}
      </div>
    </div>
  );
}