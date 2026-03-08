"""Quick Sort with step-by-step recording for visualization."""


def quick_sort(arr):
    """
    Perform quick sort (Lomuto partition) and record each step.

    Returns a list of step dicts:
        { "array": [...], "comparing": [i, j], "swapped": bool,
          "sorted_indices": [...], "pivot": int }
    """
    arr = arr[:]
    steps = []
    sorted_indices = []

    def _quick_sort(lo, hi):
        if lo < hi:
            pi = _partition(lo, hi)
            sorted_indices.append(pi)
            _quick_sort(lo, pi - 1)
            _quick_sort(pi + 1, hi)
        elif lo == hi:
            sorted_indices.append(lo)

    def _partition(lo, hi):
        pivot = arr[hi]
        i = lo - 1

        # Show pivot selection
        steps.append({
            "array": arr[:],
            "comparing": [hi],
            "swapped": False,
            "sorted_indices": sorted_indices[:],
            "pivot": hi,
        })

        for j in range(lo, hi):
            steps.append({
                "array": arr[:],
                "comparing": [j, hi],
                "swapped": False,
                "sorted_indices": sorted_indices[:],
                "pivot": hi,
            })

            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                steps.append({
                    "array": arr[:],
                    "comparing": [i, j],
                    "swapped": True,
                    "sorted_indices": sorted_indices[:],
                    "pivot": hi,
                })

        arr[i + 1], arr[hi] = arr[hi], arr[i + 1]
        steps.append({
            "array": arr[:],
            "comparing": [i + 1, hi],
            "swapped": True,
            "sorted_indices": sorted_indices[:],
            "pivot": i + 1,
        })

        return i + 1

    _quick_sort(0, len(arr) - 1)

    # Final state
    steps.append({
        "array": arr[:],
        "comparing": [],
        "swapped": False,
        "sorted_indices": list(range(len(arr))),
        "pivot": -1,
    })

    return steps
