import { useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * Interactive pathfinding grid using Tailwind.
 * @param {{ grid, start, end, visitedCells, pathCells, onCellClick, onDragStart, onDragOver }} props
 */
export default function Grid({
    grid, start, end,
    visitedCells = new Set(),
    pathCells = new Set(),
    onCellMouseDown,
    onCellMouseEnter,
}) {
    const cols = grid[0]?.length || 0;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <div
                className="grid gap-0 p-2 bg-surface/80 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                style={{ gridTemplateColumns: `repeat(${cols}, 24px)` }}
                onMouseLeave={() => onCellMouseEnter?.(-1, -1)} // Cancel drag if leaving grid
            >
                {grid.map((row, r) =>
                    row.map((cell, c) => {
                        const key = `${r},${c}`;
                        const isStart = r === start[0] && c === start[1];
                        const isEnd = r === end[0] && c === end[1];
                        const isPath = pathCells.has(key);
                        const isVisited = visitedCells.has(key);
                        const isWall = cell === 1;

                        // Base classes
                        let classes = 'w-6 h-6 border-[0.5px] border-white/5 cursor-pointer select-none transition-colors duration-200 ';

                        if (isStart) classes += 'bg-accent shadow-[0_0_15px_hsl(var(--accent)/0.8)] z-10 animate-pulse-slow rounded-md';
                        else if (isEnd) classes += 'bg-error shadow-[0_0_15px_hsl(var(--error)/0.8)] z-10 animate-pulse-slow rounded-md';
                        else if (isPath) classes += 'bg-warning shadow-[0_0_10px_hsl(var(--warning)/0.6)] z-10 rounded-sm scale-90';
                        else if (isVisited) classes += 'bg-primary/60 hover:bg-primary/80';
                        else if (isWall) classes += 'bg-muted/80 scale-95 rounded-sm shadow-inner';
                        else classes += 'bg-transparent hover:bg-foreground/10';

                        return (
                            <div
                                key={key}
                                className={classes}
                                data-row={r}
                                data-col={c}
                                onMouseDown={() => onCellMouseDown?.(r, c)}
                                onMouseEnter={() => onCellMouseEnter?.(r, c)}
                            />
                        );
                    })
                )}
            </div>
            <p className="text-sm text-muted font-medium flex items-center gap-2">
                Click and drag to toggle walls <span className="opacity-50">•</span> Drag <span className="w-3 h-3 bg-accent rounded-sm inline-block shadow-[0_0_8px_rgba(45,212,168,0.5)]" /> or <span className="w-3 h-3 bg-error rounded-sm inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" /> to move endpoints
            </p>
        </div>
    );
}
