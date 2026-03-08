"""Bubble Sort with step-by-step recording for visualization."""


def bubble_sort(arr):
    """
    Perform bubble sort and record each comparison/swap step.

    Returns a list of step dicts:
        { "array": [...], "comparing": [i, j], "swapped": bool, "sorted_indices": [...] }
    """
    arr = arr[:]
    steps = []
    n = len(arr)
    sorted_indices = []

    for i in range(n - 1):
        swapped_this_pass = False
        for j in range(n - 1 - i):
            # Record comparison
            steps.append({
                "array": arr[:],
                "comparing": [j, j + 1],
                "swapped": False,
                "sorted_indices": sorted_indices[:],
            })

            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped_this_pass = True
                # Record swap
                steps.append({
                    "array": arr[:],
                    "comparing": [j, j + 1],
                    "swapped": True,
                    "sorted_indices": sorted_indices[:],
                })

        sorted_indices.append(n - 1 - i)

        if not swapped_this_pass:
            # Already sorted — mark remaining
            for k in range(n - 1 - i):
                if k not in sorted_indices:
                    sorted_indices.append(k)
            break

    # Final state
    sorted_indices = list(range(n))
    steps.append({
        "array": arr[:],
        "comparing": [],
        "swapped": False,
        "sorted_indices": sorted_indices,
    })

    return steps
