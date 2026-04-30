export function* selectionSort(array) {
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Highlight the current position to be filled
    yield { array: [...arr], type: 'pivot', indices: [i] };
    
    for (let j = i + 1; j < n; j++) {
      yield { array: [...arr], type: 'compare', indices: [minIndex, j] };
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
      yield { array: [...arr], type: 'swap', indices: [i, minIndex] };
    }
    
    // Lock the element that is now in its correct sorted position
    yield { array: [...arr], type: 'lock', indices: [i] };
  }
  
  yield { array: [...arr], type: 'done', indices: Array.from({length: n}, (_, k) => k) };
}
