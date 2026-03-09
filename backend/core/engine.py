import time
import sys
import tracemalloc

def benchmark_sort(sort_fn, arr):
    """
    Run a sorting function, measuring execution time, step count, and peak memory.
    """
    # Deep copy to ensure fairness
    test_arr = arr.copy()
    
    tracemalloc.start()
    t0 = time.perf_counter()
    steps = sort_fn(test_arr)
    t1 = time.perf_counter()
    _, peak_mem = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    
    execution_time_ms = (t1 - t0) * 1000
    
    return {
        "steps": len(steps),
        "execution_time_ms": execution_time_ms,
        "memory_peak_bytes": peak_mem
    }

def benchmark_pathfinding(pf_fn, grid, start, end):
    """
    Run a pathfinding function, measuring execution time, visited nodes, and path length.
    """
    tracemalloc.start()
    t0 = time.perf_counter()
    result = pf_fn(grid, start, end)
    t1 = time.perf_counter()
    _, peak_mem = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    
    execution_time_ms = (t1 - t0) * 1000
    
    return {
        "visited_nodes": len(result.get("visitedOrder", [])),
        "path_length": len(result.get("path", [])),
        "execution_time_ms": execution_time_ms,
        "memory_peak_bytes": peak_mem,
        "found": result.get("found", False)
    }
