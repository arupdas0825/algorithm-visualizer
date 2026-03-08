import { useEffect, useRef } from 'react';

/**
 * Renders an array as animated vertical bars.
 * @param {{ array: number[], highlights: object }} props
 */
export default function ArrayVisualizer({ array, highlights = {} }) {
    const containerRef = useRef(null);
    const { comparing = [], swapped = false, sortedIndices = [], pivot = -1 } = highlights;
    const maxVal = Math.max(...array, 1);

    return (
        <div className="array-container" ref={containerRef}>
            {array.map((val, i) => {
                let cls = 'bar';
                if (sortedIndices.includes(i)) cls += ' sorted';
                else if (pivot === i) cls += ' pivot';
                else if (comparing.includes(i)) cls += swapped ? ' swapped' : ' comparing';

                return (
                    <div
                        key={i}
                        className={cls}
                        style={{ height: `${(val / maxVal) * 100}%` }}
                    />
                );
            })}
        </div>
    );
}
