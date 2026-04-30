export function* insertionSort(array) {
  const arr = [...array];
  const n = arr.length;
  
  yield { array: [...arr], type: 'lock', indices: [0] };
  
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    yield { array: [...arr], type: 'pivot', indices: [i] };
    
    while (j >= 0 && arr[j] > key) {
      yield { array: [...arr], type: 'compare', indices: [j, j + 1] };
      
      arr[j + 1] = arr[j];
      yield { array: [...arr], type: 'swap', indices: [j, j + 1] };
      
      j = j - 1;
    }
    arr[j + 1] = key;
    
    // Everything up to i is currently sorted
    yield { array: [...arr], type: 'lock', indices: Array.from({length: i + 1}, (_, k) => k) };
  }
  
  yield { array: [...arr], type: 'done', indices: Array.from({length: n}, (_, k) => k) };
}
