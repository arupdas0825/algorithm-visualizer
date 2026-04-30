export function* heapSort(array) {
  const arr = [...array];
  const n = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    yield { array: [...arr], indices: [0, i], type: 'swap' };

    // call max heapify on the reduced heap
    yield* heapify(arr, i, 0);
    yield { array: [...arr], indices: [i], type: 'lock' };
  }
  yield { array: [...arr], indices: [0], type: 'lock' };
}

function* heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  yield { array: [...arr], indices: [i], type: 'compare' };

  if (l < n) {
    yield { array: [...arr], indices: [i, l], type: 'compare' };
    if (arr[l] > arr[largest]) largest = l;
  }

  if (r < n) {
    yield { array: [...arr], indices: [largest, r], type: 'compare' };
    if (arr[r] > arr[largest]) largest = r;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    yield { array: [...arr], indices: [i, largest], type: 'swap' };
    yield* heapify(arr, n, largest);
  }
}
