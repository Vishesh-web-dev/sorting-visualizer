import { IRandomArray } from "../../types";
import compare from "./compare";

export default function bubbleSort(
  array: IRandomArray[],
  sortOrder: string
): IRandomArray[][] {
  const data: IRandomArray[] = JSON.parse(JSON.stringify(array));
  const sortingStepsData: IRandomArray[][] = [JSON.parse(JSON.stringify(data))];
  let arrayLength = data.length;
  let pass = 0;

  while (pass < arrayLength - 1) {
    let index = 0;

    while (index < arrayLength - pass - 1) {
      data[index].isPositionChanged = true;
      data[index + 1].isPositionChanged = true;

      if (compare(data[index].value, data[index + 1].value, sortOrder)) {
        [data[index], data[index + 1]] = [data[index + 1], data[index]];
      }

      sortingStepsData.push(JSON.parse(JSON.stringify(data)));

      data[index].isPositionChanged = false;
      data[index + 1].isPositionChanged = false;
      index++;
    }

    data[arrayLength - pass - 1].isAtCorrectPosition = true;
    sortingStepsData.push(JSON.parse(JSON.stringify(data)));
    pass++;
  }

  data[0].isAtCorrectPosition = true;
  sortingStepsData.push(JSON.parse(JSON.stringify(data)));

  return sortingStepsData;
}
