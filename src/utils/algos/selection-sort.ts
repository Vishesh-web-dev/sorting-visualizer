import { IRandomArray } from "../../types";
import compare from "./compare";

export default function selectionSort(
  data: IRandomArray[],
  sortOrder: string
): IRandomArray[][] {
  let sortingStepsData: IRandomArray[][] = [];
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      data[i].isPositionChanged = true;
      data[j].isPositionChanged = true;
      if (compare(data[i].value, data[j].value, sortOrder)) {
        [data[i], data[j]] = [data[j], data[i]];
      }
      sortingStepsData.push(JSON.parse(JSON.stringify(data)));
      data[i].isPositionChanged = false;
      data[j].isPositionChanged = false;
    }
    data[i].isAtCorrectPosition = true;
    sortingStepsData.push(JSON.parse(JSON.stringify(data)));
  }
  data[data.length - 1].isAtCorrectPosition = true;
  sortingStepsData.push(JSON.parse(JSON.stringify(data)));
  return sortingStepsData;
}
