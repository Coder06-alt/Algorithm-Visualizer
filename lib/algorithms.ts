export type AlgorithmStep = {
  array: number[];
  compared?: number[];
  swapped?: number[];
  sorted?: number[];
  highlight?: number[];
};

export type Algorithm = {
  name: string;
  category: 'sorting' | 'searching';
  complexity: {
    best: string;
    average: string;
    worst: string;
  };
};

/**
 * Bubble Sort - Repeatedly steps through the list, compares adjacent elements and swaps if needed
 * Time Complexity: O(n²) in all cases
 */
export function* bubbleSort(array: number[]): Generator<AlgorithmStep> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: arr,
        compared: [j, j + 1],
        sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
      };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield {
          array: arr,
          swapped: [j, j + 1],
          sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
        };
      }
    }
  }

  yield {
    array: arr,
    sorted: Array.from({ length: n }, (_, i) => i),
  };
}

/**
 * Selection Sort - Divides array into sorted and unsorted, finds minimum from unsorted and moves to sorted
 * Time Complexity: O(n²) in all cases
 */
export function* selectionSort(array: number[]): Generator<AlgorithmStep> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      yield {
        array: arr,
        compared: [minIdx, j],
        sorted: Array.from({ length: i }, (_, idx) => idx),
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield {
        array: arr,
        swapped: [i, minIdx],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      };
    } else {
      yield {
        array: arr,
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      };
    }
  }

  yield {
    array: arr,
    sorted: Array.from({ length: n }, (_, i) => i),
  };
}

/**
 * Insertion Sort - Builds sorted array one item at a time by inserting elements into correct position
 * Time Complexity: O(n) best, O(n²) average/worst
 */
export function* insertionSort(array: number[]): Generator<AlgorithmStep> {
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    yield {
      array: arr,
      highlight: [i],
      sorted: Array.from({ length: i }, (_, idx) => idx),
    };

    while (j >= 0 && arr[j] > key) {
      yield {
        array: arr,
        compared: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => idx),
      };

      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;

    yield {
      array: arr,
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
    };
  }

  yield {
    array: arr,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  };
}

/**
 * Merge Sort - Divide and conquer algorithm that divides array, sorts, and merges
 * Time Complexity: O(n log n) in all cases
 */
export function* mergeSort(array: number[]): Generator<AlgorithmStep> {
  const arr = [...array];

  function* mergeSortHelper(
    start: number,
    end: number,
    sortedIndices: number[]
  ): Generator<AlgorithmStep> {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    yield* mergeSortHelper(start, mid, sortedIndices);
    yield* mergeSortHelper(mid + 1, end, sortedIndices);

    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      yield {
        array: arr,
        compared: [start + i, mid + 1 + j],
        sorted: sortedIndices,
      };

      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }

      yield {
        array: arr,
        sorted: sortedIndices,
      };
    }

    while (i < left.length) {
      arr[k++] = left[i++];
      yield {
        array: arr,
        sorted: sortedIndices,
      };
    }

    while (j < right.length) {
      arr[k++] = right[j++];
      yield {
        array: arr,
        sorted: sortedIndices,
      };
    }
  }

  yield* mergeSortHelper(0, arr.length - 1, []);
  yield {
    array: arr,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  };
}

/**
 * Quick Sort - Divide and conquer using partitioning around a pivot
 * Time Complexity: O(n log n) average, O(n²) worst
 */
export function* quickSort(array: number[]): Generator<AlgorithmStep> {
  const arr = [...array];

  function* quickSortHelper(
    low: number,
    high: number,
    sortedIndices: number[]
  ): Generator<AlgorithmStep> {
    if (low < high) {
      let pi = yield* partition(low, high, sortedIndices);
      yield* quickSortHelper(low, pi - 1, sortedIndices);
      yield* quickSortHelper(pi + 1, high, sortedIndices);
    } else if (low === high) {
      yield {
        array: arr,
        sorted: [...sortedIndices, low],
      };
    }
  }

  function* partition(
    low: number,
    high: number,
    sortedIndices: number[]
  ): Generator<AlgorithmStep, number> {
    const pivot = arr[high];
    let i = low - 1;

    yield {
      array: arr,
      highlight: [high],
      sorted: sortedIndices,
    };

    for (let j = low; j < high; j++) {
      yield {
        array: arr,
        compared: [j, high],
        sorted: sortedIndices,
      };

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield {
          array: arr,
          swapped: [i, j],
          sorted: sortedIndices,
        };
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield {
      array: arr,
      swapped: [i + 1, high],
      sorted: sortedIndices,
    };

    return i + 1;
  }

  yield* quickSortHelper(0, arr.length - 1, []);
  yield {
    array: arr,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  };
}

/**
 * Linear Search - Searches for element by checking each element sequentially
 * Time Complexity: O(n) in all cases
 */
export function* linearSearch(
  array: number[],
  target: number
): Generator<AlgorithmStep> {
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    yield {
      array: arr,
      highlight: [i],
    };

    if (arr[i] === target) {
      yield {
        array: arr,
        highlight: [i],
        sorted: [i],
      };
      return;
    }
  }

  yield {
    array: arr,
  };
}

/**
 * Binary Search - Searches for element in sorted array by dividing search space in half
 * Time Complexity: O(log n) in all cases
 */
export function* binarySearch(
  array: number[],
  target: number
): Generator<AlgorithmStep> {
  const arr = [...array].sort((a, b) => a - b);
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    yield {
      array: arr,
      highlight: [mid],
      sorted: Array.from({ length: left }, (_, i) => i).concat(
        Array.from({ length: arr.length - right - 1 }, (_, i) => right + 1 + i)
      ),
    };

    if (arr[mid] === target) {
      yield {
        array: arr,
        highlight: [mid],
        sorted: Array.from({ length: arr.length }, (_, i) => i),
      };
      return;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  yield {
    array: arr,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  };
}

export const ALGORITHMS: Record<
  string,
  { name: string; category: 'sorting' | 'searching'; complexity: any }
> = {
  bubbleSort: {
    name: 'Bubble Sort',
    category: 'sorting',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  },
  selectionSort: {
    name: 'Selection Sort',
    category: 'sorting',
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
  },
  insertionSort: {
    name: 'Insertion Sort',
    category: 'sorting',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  },
  mergeSort: {
    name: 'Merge Sort',
    category: 'sorting',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  },
  quickSort: {
    name: 'Quick Sort',
    category: 'sorting',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
  },
  linearSearch: {
    name: 'Linear Search',
    category: 'searching',
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
  },
  binarySearch: {
    name: 'Binary Search',
    category: 'searching',
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
  },
};
