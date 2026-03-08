"""Merge Sort with step-by-step recording for visualization."""


def merge_sort(arr):
    """
    Perform merge sort and record each step.

    Returns a list of step dicts:
        { "array": [...], "comparing": [i, j], "swapped": bool,
          "sorted_indices": [...], "range": [lo, hi] }
    """
    arr = arr[:]
    steps = []

    def _merge_sort(lo, hi):
        if hi - lo <= 1:
            return
        mid = (lo + hi) // 2
        _merge_sort(lo, mid)
        _merge_sort(mid, hi)
        _merge(lo, mid, hi)

    def _merge(lo, mid, hi):
        left = arr[lo:mid]
        right = arr[mid:hi]
        i = j = 0
        k = lo

        while i < len(left) and j < len(right):
            li = lo + i
            ri = mid + j
            steps.append({
                "array": arr[:],
                "comparing": [li, ri],
                "swapped": False,
                "sorted_indices": [],
                "range": [lo, hi - 1],
            })

            if left[i] <= right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1

            steps.append({
                "array": arr[:],
                "comparing": [k],
                "swapped": True,
                "sorted_indices": [],
                "range": [lo, hi - 1],
            })
            k += 1

        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1

    _merge_sort(0, len(arr))

    # Final state
    steps.append({
        "array": arr[:],
        "comparing": [],
        "swapped": False,
        "sorted_indices": list(range(len(arr))),
        "range": [0, len(arr) - 1],
    })

    return steps
