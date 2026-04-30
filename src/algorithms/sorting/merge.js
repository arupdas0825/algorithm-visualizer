export function* mergeSort(array) {
  const arr = [...array];
  
  function* ms(low, high) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      yield* ms(low, mid);
      yield* ms(mid + 1, high);
      yield* merge(low, mid, high);
    }
  }
  
  function* merge(low, mid, high) {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);
    
    let i = 0, j = 0, k = low;
    
    while (i < left.length && j < right.length) {
      yield { array: [...arr], type: 'compare', indices: [low + i, mid + 1 + j] };
      
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      yield { array: [...arr], type: 'swap', indices: [k] };
      k++;
    }
    
    while (i < left.length) {
      arr[k] = left[i];
      yield { array: [...arr], type: 'swap', indices: [k] };
      i++;
      k++;
    }
    
    while (j < right.length) {
      arr[k] = right[j];
      yield { array: [...arr], type: 'swap', indices: [k] };
      j++;
      k++;
    }
    
    // Everything in this range is now sorted
    yield { array: [...arr], type: 'lock', indices: Array.from({length: high - low + 1}, (_, x) => low + x) };
  }
  
  yield* ms(0, arr.length - 1);
  yield { array: [...arr], type: 'done', indices: Array.from({length: arr.length}, (_, k) => k) };
}
