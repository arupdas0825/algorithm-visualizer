import { useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Renders an array as animated vertical bars using Framer Motion.
 * @param {{ array: number[], highlights: object }} props
 */
export default function ArrayVisualizer({ array, highlights = {} }) {
    const containerRef = useRef(null);
    const { comparing = [], swapped = false, sortedIndices = [], pivot = -1 } = highlights;
    const maxVal = Math.max(...array, 1);

    return (
        <div className="flex items-end justify-center gap-[2px] w-full h-full p-4 rounded-xl" ref={containerRef}>
            {array.map((val, i) => {
                const isComparing = comparing.includes(i);
                const isSwapped = isComparing && swapped;
                const isSorted = sortedIndices.includes(i);
                const isPivot = pivot === i;

                // Determine colors based on state
                let bgColor = 'bg-primary'; // Default indigo
                if (isSorted) bgColor = 'bg-success'; // Green
                else if (isPivot) bgColor = 'bg-warning'; // Amber
                else if (isSwapped) bgColor = 'bg-error'; // Red
                else if (isComparing) bgColor = 'bg-secondary'; // Purple

                let glow = '';
                if (isSorted) glow = 'shadow-[0_0_12px_hsl(var(--success)/0.6)]';
                else if (isSwapped) glow = 'shadow-[0_0_15px_hsl(var(--error)/0.8)]';
                else if (isComparing) glow = 'shadow-[0_0_12px_hsl(var(--secondary)/0.6)]';

                return (
                    <motion.div
                        key={i} // In a real app we'd use stable IDs for layout animations
                        layout
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`flex-1 rounded-t-sm ${bgColor} ${glow} opacity-90 hover:opacity-100 transition-opacity`}
                        style={{ height: `${(val / maxVal) * 100}%` }}
                    />
                );
            })}
        </div>
    );
}
