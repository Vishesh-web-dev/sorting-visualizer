import { IRandomArray } from "../../types";
import compare from "./compare";

export default function insertionSort(
  data: IRandomArray[],
  sortOrder: string
): IRandomArray[][] {
  let sortingStepsData: IRandomArray[][] = [];
  let arrayLength = data.length;
  let currentIndex = 1; // Start from the second element

  while (currentIndex < arrayLength) {
    let currentElement = { ...data[currentIndex] }; // Clone current element
    let compareIndex = currentIndex - 1;

    // Mark current element being sorted
    data[currentIndex].isPositionChanged = true;

    while (
      compareIndex >= 0 &&
      compare(data[compareIndex].value, currentElement.value, sortOrder)
    ) {
      data[compareIndex + 1] = { ...data[compareIndex] }; // Shift element
      data[compareIndex + 1].isPositionChanged = true;
      data[compareIndex].isPositionChanged = true;

      sortingStepsData.push(JSON.parse(JSON.stringify(data))); // Capture step

      data[compareIndex].isPositionChanged = false;
      compareIndex--;
    }

    // Place the current element in its correct position
    data[compareIndex + 1] = currentElement;
    data[compareIndex + 1].isPositionChanged = true;
    sortingStepsData.push(JSON.parse(JSON.stringify(data))); // Capture step
    data[compareIndex + 1].isPositionChanged = false;

    // Mark the current element as sorted
    data[currentIndex].isAtCorrectPosition = true;
    sortingStepsData.push(JSON.parse(JSON.stringify(data)));

    currentIndex++;
  }

  // Mark the final sorted array
  data.forEach((element) => (element.isAtCorrectPosition = true));
  sortingStepsData.push(JSON.parse(JSON.stringify(data)));

  return sortingStepsData;
}
