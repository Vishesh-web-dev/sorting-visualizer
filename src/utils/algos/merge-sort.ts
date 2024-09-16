import { IRandomArray } from "../../types";
import compare from "./compare";

export default function mergeSort(
  array: IRandomArray[],
  sortOrder: string
): IRandomArray[][] {
  const data: IRandomArray[] = JSON.parse(JSON.stringify(array));
  const sortingStepsData: IRandomArray[][] = [JSON.parse(JSON.stringify(data))];
  function merge(
    left: IRandomArray[],
    right: IRandomArray[],
    fullArray: IRandomArray[],
    start: number
  ): IRandomArray[] {
    let sortedArray: IRandomArray[] = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (compare(right[j].value, left[i].value, sortOrder)) {
        sortedArray.push(left[i]);
        i++;
      } else {
        sortedArray.push(right[j]);
        j++;
      }
    }

    sortedArray = sortedArray.concat(left.slice(i)).concat(right.slice(j));

    // Update the main array with the sorted array and mark positions as changed
    for (let k = 0; k < sortedArray.length; k++) {
      fullArray[start + k] = sortedArray[k];
      fullArray[start + k].isPositionChanged = true;
    }

    sortingStepsData.push(JSON.parse(JSON.stringify(fullArray))); // Capture this step

    for (let k = 0; k < sortedArray.length; k++) {
      fullArray[start + k].isPositionChanged = false; // Reset change markers
    }

    return sortedArray;
  }

  function mergeSortRecursive(
    arr: IRandomArray[],
    start: number,
    end: number
  ): IRandomArray[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSortRecursive(arr.slice(0, mid), start, start + mid);
    const right = mergeSortRecursive(arr.slice(mid), start + mid, end);

    return merge(left, right, data, start);
  }

  mergeSortRecursive(data, 0, data.length);

  // Mark all elements as correctly sorted
  data.forEach((element) => (element.isAtCorrectPosition = true));
  sortingStepsData.push(JSON.parse(JSON.stringify(data)));

  return sortingStepsData;
}
