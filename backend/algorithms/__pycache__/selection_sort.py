"""Selection Sort with step-by-step recording for visualization."""

def selection_sort(arr):
    """
    Perform selection sort and record each comparison/swap step.

    Returns a list of step dicts:
        { "array": [...], "comparing": [i, j], "swapped": bool, "sorted_indices": [...] }
    """

    arr = arr[:]
    steps = []
    n = len(arr)
    sorted_indices = []

    for i in range(n - 1):

        min_index = i

        for j in range(i + 1, n):

            # Record comparison
            steps.append({
                "array": arr[:],
                "comparing": [min_index, j],
                "swapped": False,
                "sorted_indices": sorted_indices[:],
            })

            if arr[j] < arr[min_index]:
                min_index = j

        # Swap if needed
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]

            # Record swap
            steps.append({
                "array": arr[:],
                "comparing": [i, min_index],
                "swapped": True,
                "sorted_indices": sorted_indices[:],
            })

        # Mark element as sorted
        sorted_indices.append(i)

    # Final state
    sorted_indices = list(range(n))
    steps.append({
        "array": arr[:],
        "comparing": [],
        "swapped": False,
        "sorted_indices": sorted_indices,
    })

    return steps
