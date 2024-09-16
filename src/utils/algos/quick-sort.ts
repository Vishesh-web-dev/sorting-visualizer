import { IRandomArray } from "../../types";
import compare from "./compare";

export default function quickSort(
  data: IRandomArray[],
  sortOrder: string
): IRandomArray[][] {
  let sortingStepsData: IRandomArray[][] = [];

  function partition(arr: IRandomArray[], low: number, high: number): number {
    let pivot = arr[high]; // Pivot element
    let i = low - 1; // Index of the smaller element

    for (let j = low; j < high; j++) {
      arr[j].isPositionChanged = true;
      arr[high].isPositionChanged = true; // Mark pivot element as changed

      if (compare(arr[j].value, pivot.value, sortOrder)) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      sortingStepsData.push(JSON.parse(JSON.stringify(arr)));
      arr[j].isPositionChanged = false;
      arr[high].isPositionChanged = false;
    }

    // Swap pivot element with element at i + 1
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    sortingStepsData.push(JSON.parse(JSON.stringify(arr)));

    return i + 1;
  }

  function quickSortRecursive(
    arr: IRandomArray[],
    low: number,
    high: number
  ): void {
    if (low < high) {
      let pi = partition(arr, low, high);

      arr[pi].isAtCorrectPosition = true; // Mark pivot as correct
      sortingStepsData.push(JSON.parse(JSON.stringify(arr)));

      quickSortRecursive(arr, low, pi - 1);
      quickSortRecursive(arr, pi + 1, high);
    }
  }

  quickSortRecursive(data, 0, data.length - 1);

  // Mark all elements as correct once fully sorted
  data.forEach((element: any) => (element.isAtCorrectPosition = true));
  sortingStepsData.push(JSON.parse(JSON.stringify(data)));

  return sortingStepsData;
}
