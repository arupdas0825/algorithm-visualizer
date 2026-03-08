/* ============================================================
   arrayVisualizer.js — Renders sorting bars into #array-container
   ============================================================ */

const ArrayVisualizer = (() => {
    const container = () => document.getElementById("array-container");

    /**
     * Render an array as vertical bars.
     * @param {number[]} arr
     * @param {object}   highlights  { comparing: [], swapped: bool, sorted_indices: [], pivot: number }
     */
    function render(arr, highlights = {}) {
        const el = container();
        if (!el) return;

        const maxVal = Math.max(...arr, 1);
        const {
            comparing = [],
            swapped = false,
            sorted_indices = [],
            pivot = -1,
        } = highlights;

        // Reuse existing bars if count matches for smoother animation
        let bars = el.querySelectorAll(".bar");
        if (bars.length !== arr.length) {
            el.innerHTML = "";
            arr.forEach(() => {
                const bar = document.createElement("div");
                bar.classList.add("bar");
                el.appendChild(bar);
            });
            bars = el.querySelectorAll(".bar");
        }

        bars.forEach((bar, i) => {
            const pct = (arr[i] / maxVal) * 100;
            bar.style.height = `${pct}%`;

            // Reset classes
            bar.className = "bar";

            if (sorted_indices.includes(i)) {
                bar.classList.add("sorted");
            } else if (pivot === i) {
                bar.classList.add("pivot");
            } else if (comparing.includes(i)) {
                bar.classList.add(swapped ? "swapped" : "comparing");
            }
        });
    }

    /** Clear the container. */
    function clear() {
        const el = container();
        if (el) el.innerHTML = "";
    }

    return { render, clear };
})();
