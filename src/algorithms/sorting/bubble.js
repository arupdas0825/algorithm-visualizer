export function* bubbleSort(array) {
  const arr = [...array];
  const n = arr.length;
  let swapped;
  
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Yield comparison state
      yield { array: [...arr], type: 'compare', indices: [j, j + 1] };
      
      if (arr[j] > arr[j + 1]) {
        // Swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        
        // Yield swap state
        yield { array: [...arr], type: 'swap', indices: [j, j + 1] };
      }
    }
    // Yield locked element state (n - i - 1 is now in correct position)
    yield { array: [...arr], type: 'lock', indices: [n - i - 1] };
    
    if (!swapped) {
      // Array is sorted, lock remaining
      const remaining = Array.from({length: n - i}, (_, k) => k);
      yield { array: [...arr], type: 'lock', indices: remaining };
      break;
    }
  }
  
  // Final yield to ensure everything is locked/green
  yield { array: [...arr], type: 'done', indices: Array.from({length: n}, (_, k) => k) };
}
