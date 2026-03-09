/* Bubble Sort — returns step-by-step snapshots */
export function bubbleSort(arr) {
    arr = [...arr];
    const steps = [];
    const n = arr.length;
    const sortedIndices = new Set();

    for (let i = 0; i < n - 1; i++) {
        let swappedThisPass = false;
        for (let j = 0; j < n - 1 - i; j++) {
            steps.push({ array: [...arr], comparing: [j, j + 1], swapped: false, sortedIndices: [...sortedIndices] });
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swappedThisPass = true;
                steps.push({ array: [...arr], comparing: [j, j + 1], swapped: true, sortedIndices: [...sortedIndices] });
            }
        }
        sortedIndices.add(n - 1 - i);
        if (!swappedThisPass) { for (let k = 0; k < n - 1 - i; k++) sortedIndices.add(k); break; }
    }
    steps.push({ array: [...arr], comparing: [], swapped: false, sortedIndices: [...Array(n).keys()] });
    return steps;
}

/* Merge Sort */
export function mergeSort(arr) {
    arr = [...arr];
    const steps = [];

    function ms(lo, hi) {
        if (hi - lo <= 1) return;
        const mid = (lo + hi) >> 1;
        ms(lo, mid); ms(mid, hi);
        merge(lo, mid, hi);
    }

    function merge(lo, mid, hi) {
        const left = arr.slice(lo, mid), right = arr.slice(mid, hi);
        let i = 0, j = 0, k = lo;
        while (i < left.length && j < right.length) {
            steps.push({ array: [...arr], comparing: [lo + i, mid + j], swapped: false, sortedIndices: [], range: [lo, hi - 1] });
            if (left[i] <= right[j]) arr[k] = left[i++]; else arr[k] = right[j++];
            steps.push({ array: [...arr], comparing: [k], swapped: true, sortedIndices: [], range: [lo, hi - 1] });
            k++;
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }

    ms(0, arr.length);
    steps.push({ array: [...arr], comparing: [], swapped: false, sortedIndices: [...Array(arr.length).keys()], range: [0, arr.length - 1] });
    return steps;
}

/* Quick Sort (Lomuto) */
export function quickSort(arr) {
    arr = [...arr];
    const steps = [];
    const sortedIndices = new Set();

    function qs(lo, hi) {
        if (lo < hi) {
            const pi = partition(lo, hi);
            sortedIndices.add(pi);
            qs(lo, pi - 1); qs(pi + 1, hi);
        } else if (lo === hi) sortedIndices.add(lo);
    }

    function partition(lo, hi) {
        const pivot = arr[hi];
        let i = lo - 1;
        steps.push({ array: [...arr], comparing: [hi], swapped: false, sortedIndices: [...sortedIndices], pivot: hi });
        for (let j = lo; j < hi; j++) {
            steps.push({ array: [...arr], comparing: [j, hi], swapped: false, sortedIndices: [...sortedIndices], pivot: hi });
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({ array: [...arr], comparing: [i, j], swapped: true, sortedIndices: [...sortedIndices], pivot: hi });
            }
        }
        [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
        steps.push({ array: [...arr], comparing: [i + 1, hi], swapped: true, sortedIndices: [...sortedIndices], pivot: i + 1 });
        return i + 1;
    }

    qs(0, arr.length - 1);
    steps.push({ array: [...arr], comparing: [], swapped: false, sortedIndices: [...Array(arr.length).keys()], pivot: -1 });
    return steps;
}
/*selection sort*/
function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // swap
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }

    return arr;
}

let numbers = [64, 25, 12, 22, 11];
console.log(selectionSort(numbers));
