import { IRandomArray } from "../../types";
import compare from "./compare";

const checkSorted = (
  data: IRandomArray[],
  sortOrder: string,
  checkStrict: boolean = false
): boolean => {
  for (let idx = 0; idx < data.length - 1; idx++) {
    if (!compare(data[idx].value, data[idx + 1].value, sortOrder, checkStrict)) {
      return false;
    }
  }
  return true;
};
export default checkSorted;
