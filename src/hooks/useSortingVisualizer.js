import { useState, useRef, useEffect, useCallback } from 'react';
import { bubbleSort } from '../algorithms/sorting/bubble';
import { quickSort } from '../algorithms/sorting/quick';
import { selectionSort } from '../algorithms/sorting/selection';
import { insertionSort } from '../algorithms/sorting/insertion';
import { mergeSort } from '../algorithms/sorting/merge';
import { heapSort } from '../algorithms/sorting/heap';
import { soundEngine } from '../utils/SoundEngine';

const ALGORITHMS = {
  bubble: bubbleSort,
  quick: quickSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  heap: heapSort,
};

export function useSortingVisualizer() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState('quick');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [activeIndices, setActiveIndices] = useState([]);
  const [lockedIndices, setLockedIndices] = useState(new Set());
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [type, setType] = useState(''); // 'compare', 'swap', 'lock', 'done'
  
  const generatorRef = useRef(null);
  const timeoutRef = useRef(null);

  const generateArray = useCallback(() => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArr);
    setActiveIndices([]);
    setLockedIndices(new Set());
    setPivotIndex(-1);
    setType('');
    setIsPlaying(false);
    generatorRef.current = null;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [size]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const step = useCallback(() => {
    if (!generatorRef.current) {
      generatorRef.current = ALGORITHMS[algorithm](array);
    }
    
    soundEngine.init();

    const result = generatorRef.current.next();
    if (result.done) {
      setIsPlaying(false);
      setType('done');
      setLockedIndices(new Set(Array.from({length: array.length}, (_, i) => i)));
      setActiveIndices([]);
      return false;
    }

    const state = result.value;
    setArray(state.array);
    setType(state.type);
    
    if (state.type === 'compare' || state.type === 'swap') {
      setActiveIndices(state.indices);
      setPivotIndex(-1);
      if (state.indices.length > 0) {
        soundEngine.playVal(state.array[state.indices[0]], 100);
      }
    } else if (state.type === 'pivot') {
      setPivotIndex(state.indices[0]);
      setActiveIndices([]);
    } else if (state.type === 'lock') {
      setLockedIndices(prev => {
        const next = new Set(prev);
        state.indices.forEach(idx => next.add(idx));
        return next;
      });
      setActiveIndices([]);
      setPivotIndex(-1);
    } else if (state.type === 'done') {
      setLockedIndices(new Set(state.indices));
      setActiveIndices([]);
      setPivotIndex(-1);
    }
    
    return true;
  }, [algorithm, array]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const delay = 101 - speed; // speed 1-100, delay 100ms to 1ms
      timeoutRef.current = setTimeout(() => {
        const hasNext = step();
        if (!hasNext) setIsPlaying(false);
      }, delay);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, array, step, speed]);

  return {
    array, size, speed, algorithm, isPlaying,
    setSize, setSpeed, setAlgorithm,
    generateArray, play, pause, step,
    activeIndices, lockedIndices, pivotIndex, type
  };
}
