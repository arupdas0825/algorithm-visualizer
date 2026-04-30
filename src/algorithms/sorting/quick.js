export function* quickSort(array) {
  const arr = [...array];
  
  function* qs(low, high) {
    if (low < high) {
      const pi = yield* partition(low, high);
      yield { array: [...arr], type: 'lock', indices: [pi] };
      yield* qs(low, pi - 1);
      yield* qs(pi + 1, high);
    } else if (low === high) {
      yield { array: [...arr], type: 'lock', indices: [low] };
    }
  }
  
  function* partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    // Highlight pivot
    yield { array: [...arr], type: 'pivot', indices: [high] };
    
    for (let j = low; j < high; j++) {
      yield { array: [...arr], type: 'compare', indices: [j, high] };
      
      if (arr[j] < pivot) {
        i++;
        // Swap arr[i] and arr[j]
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        yield { array: [...arr], type: 'swap', indices: [i, j] };
      }
    }
    
    // Swap arr[i+1] and pivot
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    yield { array: [...arr], type: 'swap', indices: [i + 1, high] };
    
    return i + 1;
  }
  
  yield* qs(0, arr.length - 1);
  yield { array: [...arr], type: 'done', indices: Array.from({length: arr.length}, (_, k) => k) };
}
