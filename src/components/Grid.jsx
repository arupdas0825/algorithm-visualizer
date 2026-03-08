import { useCallback } from 'react';

/**
 * Interactive pathfinding grid.
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
        <div className="grid-wrapper">
            <div
                className="grid-container"
                style={{ gridTemplateColumns: `repeat(${cols}, 28px)` }}
            >
                {grid.map((row, r) =>
                    row.map((cell, c) => {
                        const key = `${r},${c}`;
                        let cls = 'cell';
                        if (r === start[0] && c === start[1]) cls += ' start';
                        else if (r === end[0] && c === end[1]) cls += ' end';
                        else if (pathCells.has(key)) cls += ' path';
                        else if (visitedCells.has(key)) cls += ' visited';
                        else if (cell === 1) cls += ' wall';

                        return (
                            <div
                                key={key}
                                className={cls}
                                data-row={r}
                                data-col={c}
                                onMouseDown={() => onCellMouseDown?.(r, c)}
                                onMouseEnter={() => onCellMouseEnter?.(r, c)}
                            />
                        );
                    })
                )}
            </div>
            <p className="grid-hint">
                Click to toggle walls &bull; Drag <span className="start-marker">S</span> or <span className="end-marker">E</span> to move
            </p>
        </div>
    );
}
